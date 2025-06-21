import { NovaRequest } from "./NovaRequest";
import { NovaResponse } from "./NovaResponse";

/**
 * @abstract
 * @class RequestFilter
 * @description
 * Abstract class that serves as a base for creating filters in the Nova framework.
 * Filters allow you to intercept and modify incoming requests or outgoing responses.
 * Extend this class to implement custom filter logic (e.g., authentication, logging, transformation).
 * 
 * Filters are automatically registered using the `@Filter()` decorator and executed
 * in the order they are registered during the request lifecycle.
 * 
 * Example:
 * ```ts
 * @Filter({order: 1}, {include: ["/**"]})
 * class AuthFilter extends RequestFilter {
 *   async applyFilter(req: NovaRequest, res: NovaResponse, chain: ()=>Promise<void>): Promise<void> | void {
 *     if (!req.headers.authorization) {
 *       res.status(401).send("Unauthorized");
 *       return;
 *     }
 *     await chain();
 *   }
 * }
 * ```
 */
export abstract class RequestFilter {

    public abstract applyFilter(requst: NovaRequest, response: NovaResponse, chain: ()=>Promise<void>): Promise<void> | void;
}