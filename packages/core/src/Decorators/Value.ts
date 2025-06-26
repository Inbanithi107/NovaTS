import { NovaConstant } from "../Constants/NovaConstants";

const CLASS_VALUE_TARGETS: Set<Function> = new Set();

export function getAllValueClassTargets(): Function[] {
  return Array.from(CLASS_VALUE_TARGETS);
}

type CombinedDecorator = ClassDecorator & PropertyDecorator;


export function Value(path: string): CombinedDecorator {
    return function(target: any, propertykey?: string|symbol): void{
        if(propertykey!==undefined){
            Reflect.defineMetadata(NovaConstant.NovaValueMeta, path, target, propertykey);
            CLASS_VALUE_TARGETS.add(target.constructor);
        }else{
            Reflect.defineMetadata(NovaConstant.NovaValueMeta, path,target.prototype);
            CLASS_VALUE_TARGETS.add(target);
        }
    }
}