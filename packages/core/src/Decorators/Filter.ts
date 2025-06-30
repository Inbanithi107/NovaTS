import { ApplicationContext } from "@nova-ts/context";
import { NovaConstant } from "../Constants/NovaConstants";
import { FilterMetaData } from "../Types";

/**
 * @function Filter
 * @description
 * Decorator used to mark a class as a filter in the Nova framework.
 * Filters are special middleware components that execute before controller methods
 * and can modify the request or response, enforce security, log details, or perform any custom logic.
 * 
 * The decorated class must extend the abstract `RequestFilter` class and implement the `handle()` method.
 * 
 * When the application starts, all classes marked with `@Filter()` are automatically registered
 * in the application context under the key `"Nova:Filter"` and will be executed in the order they are registered.
 * 
 * Example:
 * ```ts
 * @Filter({order: 1}, {include: ["/api/**"]})
 * export class LoggingFilter extends RequestFilter {
 *   async applyFilter(req: NovaRequest, res: NovaResponse, chain: ()=>Promise<void>): Promise<void> | void {
 *     console.log(`[${req.method}] ${req.url}`);
 *     next();
 *   }
 * }
 * ```
 * 
 * @returns {ClassDecorator} A class decorator function.
 */
export function Filter(meta: { order: number }, URI: { [key: string]: string[] }): ClassDecorator {
    return function(target: any){
        const uris = Object.values(URI).flat();
        const data = {
            order: meta.order,
            URIS: uris
        } as FilterMetaData;
        Reflect.defineMetadata(NovaConstant.NovaFilterMeta, data, target);
        ApplicationContext.bind(NovaConstant.NovaFilter).to(target);
    }
}