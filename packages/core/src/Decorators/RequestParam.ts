import { createParameterDecorator } from "../Factory";

/**
 * Decorator to bind a method parameter to a query parameter from the HTTP request.
 *
 * Useful for extracting values from the URL like `/search?term=abc&page=2`.
 *
 * Example usage:
 * ```ts
 * @GetMapping('/search')
 * search(
 *   @RequestParam('term') term: string,
 *   @RequestParam('page') page: number
 * ) {
 *   // term = req.query.term
 *   // page = req.query.page
 * }
 * ```
 *
 * @param {string} name - The name of the query parameter to extract.
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbanithi107
 */
export function RequestParam(key: string): ParameterDecorator{
    return createParameterDecorator((req,res,next)=>{
        const param = req.query[key];
        return param;
    })
}