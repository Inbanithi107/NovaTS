import { NovaConstant } from "../Constants/NovaConstants";

/**
 * It is used to decorate class which interact with api request
 * @description It takes base path ""
 * @author Inbanithi107
 */
export function Controller(): ClassDecorator;


/**
 * 
 * @param basePath The path used to map request to the controller
 * @description It is used to map controller with path
 * @author Inbanithi107
 */
export function Controller(basePath: string): ClassDecorator;


export function Controller(basePath? : string): ClassDecorator {
    return function(target: any){
        const path = basePath || "";
        Reflect.defineMetadata(NovaConstant.Controller, path, target);
    }
}


