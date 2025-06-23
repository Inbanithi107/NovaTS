import { ExceptionRegistry } from "../Exception/ExceptionRegistry"

export function ExceptionHandler(type: any): MethodDecorator{
    return function(target,propertyKey,discriptor: PropertyDescriptor){
        ExceptionRegistry.set(type, {constructor: target.constructor, method: discriptor.value});
    }
}