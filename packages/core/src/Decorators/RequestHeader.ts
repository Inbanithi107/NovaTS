import { createParameterDecorator } from "../Factory";

/**
 * Decorator to bind a method parameter to a specific HTTP header in the request.
 *
 * Use this to extract values like `Authorization`, `User-Agent`, etc.
 *
 * Example usage:
 * ```ts
 * @GetMapping('/secure')
 * secureEndpoint(@RequestHeader('authorization') authHeader: string) {
 *   // authHeader contains the value of req.headers['authorization']
 * }
 * ```
 *
 * @param {string} name - The name of the header to retrieve (case-insensitive).
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbanithi107
 */
export function RequestHeader(key: string): ParameterDecorator {
    return createParameterDecorator((req,res,next)=>{
        const header = req.header(key);
        return header;
    })
}