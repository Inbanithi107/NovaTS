import { createParameterDecorator } from "../Factory";

/**
 * Decorator to inject the raw Express Request object into a method parameter.
 *
 * This can be used to access the full request, including headers, query params,
 * body, cookies, etc., when needed.
 *
 * Example usage:
 * ```ts
 * @PostMapping('/log')
 * logRequest(@Request() req: Request) {
 *   console.log(req.headers['user-agent']);
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbaithi107
 */
export function Requset(): ParameterDecorator{
    return createParameterDecorator((req,res,next)=>{
        return req;
    })
}