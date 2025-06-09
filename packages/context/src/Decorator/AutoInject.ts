import { inject } from "inversify";

export function AutoInject(key: any): ParameterDecorator {
    return function(target: any, propertyKey: any, parameterIndex: number){

        inject(key)(target,propertyKey,parameterIndex);
       
    }
}