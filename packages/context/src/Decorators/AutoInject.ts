import { inject } from "inversify";

/**
 * 
 * @param key The Key used to bind bean to the ApplicationContext
 * @returns The key with inversify injection
 * @description It is used to inject bean from the ApplicationContext
 * @author Inbanithi
 * @type Parameter Decorator
 */
export function AutoInject(key: any): ParameterDecorator {
    return function(target: any, propertyKey: any, parameterIndex: number){

        inject(key)(target,propertyKey,parameterIndex);
       
    }
}