import { ApplicationContext } from "@nova-ts/context";
import { RequestFilter } from "../abstract";
import { NovaConstant } from "../Constants/NovaConstants";
import { FilterMetaData } from "../Types";
import { matchUriPatterns } from "../Utils/MatchPattern";

/**
 * @class NovaFilterExecutor
 * @description
 * Responsible for executing all registered filters in sequence before invoking
 * the target controller method. This provides a clean and centralized way to apply
 * middleware logic such as authentication, logging, or transformation to incoming requests.
 * 
 * Each filter must extend the `RequestFilter` abstract class and implement the `applyFilter()` method.
 * 
 * If a filter sends a response or halts the chain, subsequent filters and the controller
 * will not be executed.
 */
export class NovaFilterExecutor {

    /**
   * Executes the filter chain and then invokes the provided controller function.
   * 
   * Filters are executed sequentially. If any filter does not call `chain()` or terminates
   * the response (e.g., `res.send()`), the controller will not be invoked.
   * 
   * This method ensures that the controller logic runs **only after** all filters
   * have passed control through `chain()`.
   * 
   * @param {any} req - The Nova request object.
   * @param {any} res - The Nova response object.
   * @param {() => Promise<any>} controllerInvoker - A function that executes the controller method.
   * @returns {Promise<any>} The result of the controller method if invoked, or `undefined` if short-circuited by a filter.
   */
    public async execute(req: any, res: any, controllerInvoker: () => Promise<any>): Promise<any> {
    const filters: RequestFilter[] = ApplicationContext.getAll<RequestFilter>(NovaConstant.NovaFilter);

    const matchingFilters = filters
      .filter(filter => {
        const meta: FilterMetaData = Reflect.getMetadata(NovaConstant.NovaFilterMeta, filter.constructor);
        return matchUriPatterns(req.path, meta.URIS);
      })
      .sort((a, b) => {
        const aMeta = Reflect.getMetadata(NovaConstant.NovaFilterMeta, a.constructor);
        const bMeta = Reflect.getMetadata(NovaConstant.NovaFilterMeta, b.constructor);
        return aMeta.order - bMeta.order;
      });

    let currentchain = -1;

    const chain = async (index: number): Promise<any> => {
      if (index <= currentchain) throw new Error('chain() called multiple times in filter chain');
      currentchain = index;

      if (index >= matchingFilters.length) {
        const result = await controllerInvoker();
        res.body = result;
        return;
      }

      const filter = matchingFilters[index];
      return await filter.applyFilter(req, res, () => chain(index + 1));
    };

    return await chain(0);
  }
}