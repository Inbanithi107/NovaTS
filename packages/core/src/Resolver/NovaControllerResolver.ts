import { NovaConstant } from "../Constants/NovaConstants";

/**
 * Responsible for resolving controller method parameters at runtime based on
 * metadata set by parameter decorators (e.g., @RequestParam, @Body, @RequestHeader).
 *
 * This class reads the metadata registered via `createParameterDecorator()` and,
 * during an incoming request, extracts the correct values from the `Request` object
 * and injects them into the controller method call.
 *rollerInstance.methodName(...args);
 *
 * @author Inbaithi107
 */
export class NovaControllerResolver {

    /**
   * Resolves the method parameters by extracting metadata and values from the request.
   *
   * @param controllerClass - The controller class (or its prototype).
   * @param  route - The name of the method to resolve parameters for.
   * @param  request - The current Express request object.
   * @param  response - The current Express response object.
   * @param  next - The current Express next object.
   * @returns The resolved list of arguments to pass to the method.
   */
    public resolveArgument(instance: any,route: any,Request: any, Response: any, next: any): any[]{
        const paramMetaData = Reflect.getMetadata(NovaConstant.ControllerParameter, instance, route.handlerName) || [];
        
        const args: any[] = [];

        for(const param of paramMetaData){
            args[param.index] = param.resolver(Request, Response, next);
        }

        return args;
    }

}