import { ApplicationContext } from "@nova-ts/context";
import { getAllValueClassTargets } from "../Decorators/Value";
import { InjectValues } from "../Utils/NovaPropertyLoader";

/**
 * Responsible for resolving configuration properties and injecting them into
 * class instances or class fields based on the `@Value` decorator.
 */
export class ProprtyResolver {

    /**
   * Loads and injects all properties into classes or fields decorated with `@Value`,
   * and registers them in the `ApplicationContext`.
   *
   * This method is typically called during application bootstrap.
   */
    public static loadAllProperties(){
        const targets = getAllValueClassTargets();
        for(const clazz of targets){
            const instance = new (clazz as any)();
            InjectValues(instance);
            ApplicationContext.bind(clazz.name as string).toConstantValue(instance);
        }
    }

}