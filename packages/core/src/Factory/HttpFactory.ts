import { ApplicationContext } from "@nova-ts/context";
import { ControllerRegistry } from "../Registry/ControllerRegistry";
import express from "express";
import { NovaConstant } from "../Constants/NovaConstants";
import { ConvertPath } from "../Utils/RequestPath";
import { NovaControllerResolver } from "../Resolver/NovaControllerResolver";

/**
 * Responsible for binding controller methods to Express routes.
 *
 * This function takes an Express application instance and dynamically maps
 * all controller methods (decorated with `@GetMapping`, `@PostMapping`, etc.)
 * to their corresponding routes based on metadata. Controllers are resolved
 * from the application context (i.e., the DI container).
 *
 * Example usage:
 * ```ts
 * const app = express();
 * HttpFactory(app);
 * ```
 *
 * @param {import('express').Application} app - The Express application instance to attach routes to.
 * @returns {void} Configures the routes based on controllers registered in the context.
 * @author Inbaithi107
 */
export function HttpFactory(Application: express.Express){
    
    const Resolver = new NovaControllerResolver();
        
    for(const [clazz, Definition] of ControllerRegistry){
        const instance: any = ApplicationContext.get(clazz.name);
        for(const route of Definition.routes){
            const basePath = Reflect.getMetadata(NovaConstant.Controller, clazz);
            const fullPath = `${basePath}${route.path}`;
            const ApplicationPath = ConvertPath(fullPath);
            const handler = instance[route.handlerName].bind(instance);
            Application[route.method](ApplicationPath, async(req,res,next)=>{
                try{
                    const args = Resolver.resolveArgument(instance,route,req,res,next);
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