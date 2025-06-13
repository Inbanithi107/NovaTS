import { NovaConstant } from "../Constants/NovaConstants";

export class NovaControllerResolver {

    public resolveArgument(instance: any,route: any,request: any): any[]{
        const paramMetaData = Reflect.getMetadata(NovaConstant.ControllerParameter, instance, route.handlerName) || [];

        console.log(paramMetaData)

        const args: any[] = [];

        for(const param of paramMetaData){
            args[param.index] = request.params[param.name];
        }

        return args;
    }

}