import ApplicationContext from "../Container/ApplicationContext";

export function Bean(): MethodDecorator {
    return function(target: any, propertyKey: string|symbol, descriptor: PropertyDescriptor){
        const method = descriptor.value;
        const constructor = new target.constructor();
        const beanInstance = method.call(constructor);
        if(ApplicationContext.isBound(beanInstance.constructor)){
            ApplicationContext.unbind(beanInstance.constructor)
        }
        ApplicationContext.bind(beanInstance.constructor).toConstantValue(beanInstance)
    }
}