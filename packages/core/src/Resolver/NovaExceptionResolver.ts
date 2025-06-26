import { NovaRequest, NovaResponse } from "../Abstract";
import { ExceptionRegistry } from "../Exception/ExceptionRegistry";

/**
 * Central resolver responsible for handling exceptions thrown during request processing.
 * 
 * This class looks up the appropriate exception handler registered via `@ExceptionHandler`
 * and invokes it with the given error, request, and response.
 */
export class NovaExceptionResolver {

    /**
   * Resolves the given error by invoking a matching exception handler if registered.
   * 
   * If no handler is registered for the specific exception type, it sends a generic
   * 500 response with the error message.
   *
   * @param err - The error that was thrown during request handling.
   * @param request - The current Nova request object.
   * @param response - The current Nova response object.
   */
    public static resolve(err: any, request: NovaRequest, response: NovaResponse){
        const handler = ExceptionRegistry.get(err.constructor);
        if(handler){
            return handler.method.call(handler.constructor, err,request,response)
        }
         response.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }

}