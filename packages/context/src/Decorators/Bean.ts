import { ApplicationContext } from "../Container/ApplicationContext";
import { BeanRegistry } from "../Container/BeanRegistry";

/**
 * 
 * @param key The key is used to bind the instance to the ApplicationContext
 * @returns The function with beanInstance loaded in the context
 * @author Inbanithi
 * @description It excutes the method and store the result of the method in the ApplicationContext
 * @type MethodDecorator
 */
export function Bean(key?: any): MethodDecorator {
    return function(target: any, propertyKey: string|symbol, descriptor: PropertyDescriptor){
        const method = descriptor.value;
        const beanInstance = method.apply(null);
        if(!beanInstance || typeof beanInstance !=="object"){
            throw new Error(`@Bean: Method '${String(propertyKey)}' did not return an object`);
        }
        const clazzType = key || beanInstance.constructor.name
        
        if(ApplicationContext.isBound(clazzType)){
            ApplicationContext.unbind(clazzType)
        }
        ApplicationContext.bind(clazzType).toConstantValue(beanInstance);
    }
}