import { NovaRequest, NovaResponse } from "../Abstract";
import { ExceptionRegistry } from "../Exception/ExceptionRegistry";

export class NovaExceptionResolver {

    public static resolve(err: any, request: NovaRequest, response: NovaResponse){
        const handler = ExceptionRegistry.get(err.constructor);
        if(handler){
            return handler.method.call(handler.constructor, err,request,response)
        }
         response.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }

}