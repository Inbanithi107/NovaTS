import { NovaControllerResolver } from "./NovaControllerResolver";

/**
 * @class NovaControllerInvoker
 * @description
 * Responsible for invoking a controller method with properly resolved arguments.
 * It leverages the `NovaControllerResolver` to resolve method parameters annotated
 * with decorators like `@Request()`, `@Response()`, `@RequestParam()`, etc.
 * 
 * This class is typically used inside the `HttpFactory` during route binding, ensuring
 * that the controller method receives fully prepared inputs and errors are handled gracefully.
 */
export class NovaControllerInvoker {
    constructor(
    private instance: any,
    private route: any,
    private handler: Function,
    private resolver: NovaControllerResolver
  ) {}

   /**
   * Invokes the target controller method, resolving its arguments dynamically.
   * 
   * This method handles:
   * - Parameter injection via decorators (e.g., `@Request`, `@RequestBody`, etc.)
   * - Async controller method support
   * - Error propagation using `next()`
   * 
   * If the controller method returns a result and the response hasn't been sent yet,
   * the result is automatically sent using `res.send(result)`.
   *
   * @param {any} req - The Express request object.
   * @param {any} res - The Express response object.
   * @param {any} next - The Express next function for error propagation.
   * @returns {Promise<any>} A promise that resolves once the controller method is invoked.
   */
  public async invoke(req: any, res: any, next: any): Promise<any> {
    const args = this.resolver.resolveArgument(this.instance, this.route, req, res, next);
    return await this.handler(...args);
  }
}