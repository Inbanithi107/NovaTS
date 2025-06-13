import { Request, Response } from "express";
import { ControllerRegistry } from "../Registry/ControllerRegistry"
import { HttpMethods } from "../Types/HttpMethods";

export function GetMapping(path: string): MethodDecorator {
    return function(target: any, propertyKey: string|symbol, descriptor: PropertyDescriptor){
        
        if(!ControllerRegistry.has(target.constructor)){
            ControllerRegistry.set(target.constructor, {
                mapping: '',
                routes: []
            });
        }
       const controller = ControllerRegistry.get(target.constructor);
        if (controller) {
            controller.routes.push({
                method: HttpMethods.GET, 
                path,
                handlerName: propertyKey as string
            });
        } else {
            console.warn(`Controller not registered for method ${propertyKey.toString()}`);
        }
        
    }
}