import { ExceptionRegistry } from "../Exception/ExceptionRegistry"

/**
 * Method decorator that registers the decorated method as a handler for a specific exception type.
 *
 * When an exception of the specified type is thrown during request processing,
 * the associated method will be invoked with the exception and request/response context.
 *
 * Example usage:
 * ```ts
 * @ExceptionHandler(MyCustomError)
 * handleCustomError(err: MyCustomError, req: Request, res: Response) {
 *   res.status(400).json({ message: err.message });
 * }
 * ```
 *
 * @param exceptionType - The class (constructor function) of the exception to handle.
 * @returns A method decorator function.
 */
export function ExceptionHandler(type: any): MethodDecorator{
    return function(target,propertyKey,discriptor: PropertyDescriptor){
        ExceptionRegistry.set(type, {constructor: target.constructor, method: discriptor.value});
    }
}