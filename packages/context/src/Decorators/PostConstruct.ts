import { postConstruct } from "inversify"
/**
 * 
 * The lifeCycly hook for the Component
 */
export function PostConstruct(): MethodDecorator {
    return function(target,propertyKey,descriptor){
        postConstruct()(target,propertyKey,descriptor);
    }
}