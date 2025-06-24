import { instantiateClass } from "./ObjectWrapper";

export function coerceArgs(args: any[], paramTypes: Function[]): any[] {
    return args.map((arg, index) => {
        const Type = paramTypes[index];

        if (Type === String) {
            return String(arg);
        }

        if (Type === Number) {
            const num = Number(arg);
            if (isNaN(num)) {
                throw new Error(`Cannot convert "${arg}" to Number at position ${index}`);
            }
            return num;
        }

        if (Type === Boolean) {
            return arg === 'true' || arg === true;
        }

        if (Type === Object || Type === Array) {
            return arg;
        }

        
        if (typeof Type === 'function') {
            if (arg instanceof Type) return arg;

           
            if (typeof arg === 'object') {
                return instantiateClass(Type as any, arg);
            }

            try {
                return new (Type as any)(arg); 
            } catch (err) {
                throw new Error(`Cannot instantiate ${Type.name} with value at position ${index}`);
            }
        }

        return arg; 
    });
}
