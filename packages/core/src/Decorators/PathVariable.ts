import { NovaConstant } from "../Constants/NovaConstants"

export function PathVariable(name: string): ParameterDecorator {
    return function (target: any, propertyKey: any, parameterIndex: number){
        const existingParam = Reflect.getMetadata(NovaConstant.ControllerParameter, target, propertyKey) || [];
        existingParam.push({name, index: Number(parameterIndex) });
        Reflect.defineMetadata(NovaConstant.ControllerParameter, existingParam, target, propertyKey);
    }
}