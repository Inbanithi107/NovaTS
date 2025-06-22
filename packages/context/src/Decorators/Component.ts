import { injectable } from "inversify";
import { ApplicationContext } from "../Container/ApplicationContext";
import { createHookedProxy } from "../Abstract";

export const scope = {
    SINGLETON: "singleton",
    TRANSIENT: "transient"

}

export type lifecycle = {
    scope: "singleton" | "transient"
}

export type Componentoptions = {
    lifecycleScope?: lifecycle,
    key?: any,
    proxy?: boolean 
}

/**
 * Decorator to bind class to the ApplicaionContext
 */
export function Component(): ClassDecorator;



export function Component(options: Componentoptions): ClassDecorator;



export function Component(options?: Componentoptions): ClassDecorator {
    return function (target: any){
        const isInjectable = Reflect.getMetadata("design:paramtypes", target);
        if(isInjectable){
            injectable()(target);
        }
        let lifecycle: lifecycle = options?.lifecycleScope || { scope: 'singleton' };
        let InjectionKey: any = options?.key || target.name;
        let proxy: boolean = options?.proxy || false;
        
        const bindingScope = lifecycle?.scope || 'singleton';
        if(typeof InjectionKey === 'string'){
            if(bindingScope=='transient'){
            ApplicationContext.bind(InjectionKey).to(target).inTransientScope();
            return;
            }else{
                if(proxy===true){
                    const proxyInstance = createHookedProxy(new target);
                    ApplicationContext.bind(InjectionKey).toConstantValue(proxyInstance);
                }else{
                ApplicationContext.bind(InjectionKey).to(target);
                }
            }
            return;
        }
        if(proxy===true){
            const proxyInstance = createHookedProxy(target);
            ApplicationContext.bind(InjectionKey).to(proxyInstance);
        }else{
        ApplicationContext.bind(InjectionKey).toSelf();
        }
    }
}