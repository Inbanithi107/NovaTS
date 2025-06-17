import { injectable } from "inversify";
import { ApplicationContext } from "../Container/ApplicationContext";

export const scope = {
    SINGLETON: "singleton",
    TRANSIENT: "transient"

}

export type lifecycle = {
    scope: "singleton" | "transient"
}

/**
 * Decorator to bind class to the ApplicaionContext
 */
export function Component(): ClassDecorator;



/**
 * 
 * @param lifecycle The lifecycle of the component
 */
export function Component(lifecycleScope: lifecycle): ClassDecorator;



/**
 * 
 * @param key The key used to bind the Class to the ApplicationContext
 * @returns The wrapper around the inversify "injectable with binding to the context"
 * @author Inbanithi
 * @description The class Decorated is binded to the ApplicationContext
 * @type Class Decorator
 */
export function Component(key: any): ClassDecorator;



/**
 * 
 * @param lifecycle The lifecycle of the component
 * @param key The key used to bind the Class to the ApplicationContext
 */
export function Component(lifecycleScope: lifecycle, key: any): ClassDecorator;





export function Component(lifecycleScope?: lifecycle, key?: any): ClassDecorator {
    return function (target: any){
        const isInjectable = Reflect.getMetadata("design:paramtypes", target);
        if(isInjectable){
            injectable()(target);
        }
        let lifecycle: lifecycle = { scope: 'singleton' };
        let InjectionKey: any = target.name;

        if (lifecycleScope && typeof lifecycleScope === 'object' && (lifecycleScope.scope === 'singleton' || lifecycleScope.scope === 'transient')) {
            lifecycle = lifecycleScope;
            if (key !== undefined) {
                InjectionKey = key;
            }
        } else {
            InjectionKey = lifecycleScope ?? target.name;
        }
        const bindingScope = lifecycle?.scope || 'singleton';
        if(typeof InjectionKey === 'string'){
            if(bindingScope=='transient'){
            ApplicationContext.bind(InjectionKey).to(target).inTransientScope();
            return;
            }else{
                ApplicationContext.bind(InjectionKey).to(target);
            }
            return;
        }
        ApplicationContext.bind(InjectionKey).toSelf();
    }
}