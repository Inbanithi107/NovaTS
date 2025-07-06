import { plainToInstance } from "class-transformer";
import { createParameterDecorator } from "../Factory";
import { validateSync } from "class-validator";
import { ConfigLoader } from "../Utils";

 /**
 * Decorator to bind a method parameter to the body of the HTTP request.
 *
 * This is commonly used in POST or PUT handlers where data is sent in the request body.
 *
 * Example usage:
 * ```ts
 * @PostMapping('/create')
 * createUser(@Body() userData: CreateUserDto) {
 *   // userData will contain the parsed request body
 * }
 * ```
 *
 * @returns {ParameterDecorator} The parameter decorator function.
 * @author Inbanithi107
 */
export function RequestBody(): ParameterDecorator {
    return createParameterDecorator((req,res,next,type?: any)=>{
        const body = req.body;
        if(type){
            const transformed = plainToInstance(type, body);
            if(ConfigLoader.get<boolean>('nova.class.validate', false)){
                const errors = validateSync(transformed);
                if(errors.length){
                    console.error(errors);
                    throw new Error("Validation error occured");
                }
                return transformed;
            }
            return transformed;
        }
        return body;
    })
}