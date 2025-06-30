import { CLASS_HOOKS_KEY, HookFunction, METHOD_HOOKS_KEY } from "./HookManagement";
import { NovaContextCreator } from "./NovaContextCreator";

export function createHookedProxy<T extends Object>(instance: T): T {
  return new Proxy(instance, {
    get(target, prop, receiver) {
        
      const original = Reflect.get(target, prop, receiver);

      if (typeof original === 'function') {
        const methodHooks: HookFunction[] =
          Reflect.getMetadata(METHOD_HOOKS_KEY, target, prop as string) || [];
        const classHooks: HookFunction[] =
          Reflect.getMetadata(CLASS_HOOKS_KEY, target.constructor) || [];

        if (methodHooks.length > 0 || classHooks.length > 0) {
          const handler = NovaContextCreator.createInvocationHandler(
            target,
            prop as string,
            original
          );
          return handler;
        }
      }

      return original;
    }
  });
}
