import { ApplicationContext } from "../Container/ApplicationContext";



export type BeanOptions = {
    key?: any,
    lazy?: boolean
}

/**
 * 
 * @param key The key is used to bind the instance to the ApplicationContext
 * @returns The function with beanInstance loaded in the context
 * @author Inbanithi
 * @description It excutes the method and store the result of the method in the ApplicationContext
 * @type MethodDecorator
 */
export function Bean(options?: BeanOptions): MethodDecorator {
    return function(target: any, propertyKey: string|symbol, descriptor: PropertyDescriptor){
        const lazy = options?.lazy || false;
        const method = descriptor.value;
        if(!(lazy)){
        const beanInstance = method.apply(null);
        if(!beanInstance || typeof beanInstance !=="object"){
            throw new Error(`@Bean: Method '${String(propertyKey)}' did not return an object`);
        }
        const clazzType = options?.key || beanInstance.constructor.name
        
        if(ApplicationContext.isBound(clazzType)){
            ApplicationContext.unbind(clazzType)
        }
        ApplicationContext.bind(clazzType).toConstantValue(beanInstance);
    }else{
        const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
        const clazzType = options?.key || String(returnType.name);
        ApplicationContext.bind(clazzType).toDynamicValue((context)=>{
            const beanInstance = method.apply(null);
            if(!beanInstance || typeof beanInstance !=="object"){
                throw new Error(`@Bean: Method '${String(propertyKey)}' did not return an object`);
            }
            return beanInstance;
        }).inSingletonScope();
    }
    }
}