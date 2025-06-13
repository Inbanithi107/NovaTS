import { ApplicationContext } from "@nova-ts/context";
import { ControllerRegistry } from "../Registry/ControllerRegistry";
import express from "express";
import { NovaConstant } from "../Constants/NovaConstants";
import { ConvertPath } from "../Utils/RequestPath";
import { NovaControllerResolver } from "../Resolver/NovaControllerResolver";

export function HttpFactory(Application: express.Express){
    
    const Resolver = new NovaControllerResolver();
        
    for(const [clazz, Definition] of ControllerRegistry){
        const instance: any = ApplicationContext.get(clazz.name);
        for(const route of Definition.routes){
            const basePath = Reflect.getMetadata(NovaConstant.Controller, clazz);
            const fullPath = `${basePath}${route.path}`;
            const ApplicationPath = ConvertPath(fullPath);
            const handler = instance[route.handlerName].bind(instance);
            console.log("path",ApplicationPath);
            Application[route.method](ApplicationPath, async(req,res,next)=>{
                try{
                    const args = Resolver.resolveArgument(instance,route,req);
                console.log(args);
                const result = await handler(...args);
                res.send(result);
                }
                catch(error){
                    console.error(`[ERROR] in ${route.method.toUpperCase()} ${fullPath}:`, error);
                    next(error);
                }
                
            });
        }
    }
    
}