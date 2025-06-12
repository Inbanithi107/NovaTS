import { injectable } from "inversify";
import { ApplicationContext } from "../Container/ApplicationContext";

/**
 * 
 * @param key The key used to bind the Class to the ApplicationContext
 * @returns The wrapper around the inversify "injectable with binding to the context"
 * @author Inbanithi
 * @description The class Decorated is binded to the ApplicationContext
 * @type Class Decorator
 */
export function Component(key?: any): ClassDecorator {
    return function (target: any){
        const isInjectable = Reflect.getMetadata("design:paramtypes", target);
        if(isInjectable){
            injectable()(target);
        }
        const InjectionKey = key || target.name
        ApplicationContext.bind(InjectionKey).toSelf();
    }
}