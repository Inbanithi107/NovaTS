import { ControllerRegistry } from "../Registry/ControllerRegistry"
import { HttpMethods } from "../Types/HttpMethods"

/**
 * Decorator to mark a method as an HTTP POST endpoint handler.
 * 
 * Binds the method to the specified path, and ensures it responds to POST requests.
 * 
 * Example usage:
 * ```ts
 * @Controller('/users')
 * class UserController {
 *   @PostMapping('/{id}')
 *   updateUser(@PathVariable('id') id: string, @Body() userData: any) {
 *     // Handle POST /users/{id}
 *   }
 * }
 * ```
 *
 * @param {string} path - The URL path for the POST endpoint, relative to the controller's base path.
 * @returns {MethodDecorator} The method decorator function.
 * @author Inbaithi107
 */
export function PostMapping(path: string): MethodDecorator {
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
                method: HttpMethods.POST, 
                path,
                handlerName: propertyKey as string
            });
        } else {
            console.warn(`Controller not registered for method ${propertyKey.toString()}`);
        }
    }
}