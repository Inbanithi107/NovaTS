import { createExecutionContext } from "./ExcutionContextFactory";
import { CLASS_HOOKS_KEY, HookFunction, METHOD_HOOKS_KEY } from "./HookManagement";

export class NovaContextCreator {
  static createInvocationHandler(
    instance: any,
    methodName: string,
    originalHandler: Function
  ): (...args: any[]) => Promise<any> {
    const classHooks: HookFunction[] =
      Reflect.getMetadata(CLASS_HOOKS_KEY, instance.constructor) || [];

    const methodHooks: HookFunction[] =
      Reflect.getMetadata(METHOD_HOOKS_KEY, instance, methodName) || [];

    const allHooks = [...classHooks, ...methodHooks];

    return async (...args: any[]) => {
      const ctx = createExecutionContext(instance, methodName, originalHandler, args);

      const composed = allHooks.reduceRight(
        (next, hook) => () => hook(ctx, next),
        () => originalHandler.apply(instance, args)
      );

      return await composed();
    };
  }
}
