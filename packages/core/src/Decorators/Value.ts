import { NovaConstant } from "../Constants/NovaConstants";

const CLASS_VALUE_TARGETS: Set<Function> = new Set();

export function getAllValueClassTargets(): Function[] {
  return Array.from(CLASS_VALUE_TARGETS);
}

type CombinedDecorator = ClassDecorator & PropertyDecorator;

/**
 * Decorator that injects configuration values from a property source (e.g., .yml, .env)
 * into class fields or registers the configuration path for the entire class.
 *
 * ### Property-level usage:
 * Injects the specified configuration value directly into the field.
 * ```ts
 * class AppConfig {
 *   @Value('server.port')
 *   port: number;
 * }
 * ```
 *
 * ### Class-level usage:
 * Binds the class to a configuration path. All properties in the file under that path
 * will be mapped to matching fields in the class.
 * ```ts
 * @Value('database')
 * class DatabaseConfig {
 *   host: string;
 *   port: number;
 *   username: string;
 *   password: string;
 * }
 * ```
 *
 * ### Notes:
 * - For class-level usage, ensure that the class is registered as a singleton or component
 *   in the application context to be instantiated and injected where needed.
 * - Internally uses a configuration loader (like `js-yaml` or `dotenv`) to resolve the values.
 * - Supports nested property resolution.
 *
 * @param path - The key path to the property (e.g., `'server.port'` or `'database'`)
 * @returns A decorator usable on either classes or class properties.
 */
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