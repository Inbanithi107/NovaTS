import { createParameterDecorator } from "../Factory"

/**
 * Decorator to bind a method parameter to a path variable from the request URL.
 *
 * Example usage:
 * ```ts
 * @GetMapping('/user/{id}')
 * getUser(@PathVariable('id') userId: string) {
 *   // userId will be bound to req.params.id
 * }
 * ```
 *
 * @param {string} name - The name of the path variable to extract from the request URL.
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbaithi107
 */
export function PathVariable(name: string): ParameterDecorator {
    return createParameterDecorator((Request: any, Response: any, next: any) => {
        const parameter = Request.params[name];
        return parameter;
    })
}
