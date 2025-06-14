import { createParameterDecorator } from "../Factory";

 /**
 * Decorator to bind a method parameter to the body of the HTTP request.
 *
 * This is commonly used in POST or PUT handlers where data is sent in the request body.
 *
 * Example usage:
 * ```ts
 * @PostMapping('/create')
 * createUser(@Body() userData: CreateUserDto) {
 *   // userData will contain the parsed request body
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbaithi107
 */
export function RequestBody(): ParameterDecorator {
    return createParameterDecorator((req,res,next)=>{
        const body = req.body;
        return body;
    })
}