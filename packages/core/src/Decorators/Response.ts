import { createParameterDecorator } from "../Factory";

/**
 * @function Response
 * @description
 * Parameter decorator used in Nova controllers to inject the custom `NovaResponse` object
 * into controller method parameters. This `NovaResponse` is typically an extended or enhanced
 * version of Express's `Response`, allowing framework-level features such as filters,
 * unified response formatting, or other Nova-specific capabilities.
 * 
 * This decorator enables developers to access and manipulate the response directly within
 * controller methods.
 * 
 * Example:
 * ```ts
 * @GetMapping("/greet")
 * greet(@Response() res: NovaResponse) {
 *   res.send({ message: "Hello from Nova!" });
 * }
 * ```
 * 
 * Internally, this decorator registers the parameter index and metadata so that
 * `NovaControllerResolver` can inject the correct response instance
 * when invoking the controller method.
 * 
 * @returns {ParameterDecorator} A parameter decorator function.
 */
export function Response(): ParameterDecorator {
    return createParameterDecorator((req,res,next)=>{
        return res;
    })
}