import { ApplicationContext } from "@nova-ts/context";
import { getAllValueClassTargets } from "../Decorators/Value";
import { InjectValues } from "../Utils/NovaPropertyLoader";

export class ProprtyResolver {

    public static loadAllProperties(){
        const targets = getAllValueClassTargets();
        for(const clazz of targets){
            const instance = new (clazz as any)();
            InjectValues(instance);
            ApplicationContext.bind(clazz.name as string).toConstantValue(instance);
        }
    }

}