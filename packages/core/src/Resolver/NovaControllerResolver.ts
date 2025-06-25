import { NovaConstant } from "../Constants/NovaConstants";
import { coerceArgs } from "../Utils/NovaMessageConverter";

/**
 * Responsible for resolving controller method parameters at runtime based on
 * metadata set by parameter decorators (e.g., @RequestParam, @Body, @RequestHeader).
 *
 * This class reads the metadata registered via `createParameterDecorator()` and,
 * during an incoming request, extracts the correct values from the `Request` object
 * and injects them into the controller method call.
 * controllerInstance.methodName(...args);
 *
 * @author Inbaithi107
 */
export class NovaControllerResolver {

    args!: any[];

    setArgs(args: any[]){
        this.args = args;
    }

    /**
   * Resolves the method parameters by extracting metadata and values from the request.
   *
   * @param controllerClass - The controller class (or its prototype).
   * @param  route - The name of the method to resolve parameters for.
   * @param  request - The current Nova request object.
   * @param  response - The current Nova response object.
   * @param  next - The current Express next object.
   * @returns The resolved list of arguments to pass to the method.
   */
    public resolveArgument(instance: any,route: any,Request: any, Response: any, next: any): any[]{
        const paramMetaData = Reflect.getMetadata(NovaConstant.ControllerParameter, instance, route.handlerName) || [];
        const paramtypes = Reflect.getMetadata("design:paramtypes", instance,route.handlerName) || [];
        
        const args: any[] = [];

        for(const param of paramMetaData){
            args[param.index] = param.resolver(Request, Response, next, paramtypes[param.index]);
        }
        this.setArgs(args);
        const resolvedargs = coerceArgs(args,paramtypes);
        return resolvedargs;
    }

}