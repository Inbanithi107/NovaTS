import { NovaConstant } from "../Constants/NovaConstants";
import { ParamSourceType } from "../Types/ParamSourceType";

/**
 * Factory function to create custom parameter decorators that bind metadata
 * for request data injection (e.g., @RequestParam, @Body, @RequestHeader).
 *
 * This metadata is later used by the `NovaControllerResolver` to inject
 * the correct values into controller method parameters at runtime.
 *
 * @param { (req: Request) => any} extractorFactory - A factory that takes a parameter name and returns a function that extracts the value from the request.
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbaithi107
 */
export function createParameterDecorator(resolver: (req: any,res: any,next: any)=> any): ParameterDecorator{
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existing = Reflect.getMetadata(NovaConstant.ControllerParameter, target, propertyKey) || [];
        existing.push({
            index: Number(parameterIndex),
            resolver
        });
        Reflect.defineMetadata(NovaConstant.ControllerParameter, existing, target, propertyKey);
    }
}