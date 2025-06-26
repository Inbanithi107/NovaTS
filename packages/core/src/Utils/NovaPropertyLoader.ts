import { NovaConstant } from "../Constants/NovaConstants";
import { ConfigLoader } from "./ConfigLoader";




export function InjectValues(instance: any){

    const prototype = Object.getPrototypeOf(instance);
    const rootPath = Reflect.getMetadata(NovaConstant.NovaValueMeta, prototype);
    if(rootPath){
        const configObject = ConfigLoader.get(rootPath);
        if(configObject && typeof configObject === "object"){
            Object.assign(instance, configObject);
        }
    }
    for (const key of Object.keys(instance)) {
        const valuePath = Reflect.getMetadata(NovaConstant.NovaValueMeta, prototype, key);
        if (valuePath) {
        instance[key] = ConfigLoader.get(valuePath);
    }
  }
    return instance;
}