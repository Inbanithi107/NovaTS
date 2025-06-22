import { ExecutionContext } from "../Types/ExcutionContext";

export const METHOD_HOOKS_KEY = 'nova:method_hooks';
export const CLASS_HOOKS_KEY = 'nova:class_hooks';

export type HookFunction = (
  context: ExecutionContext,
  proceed: () => Promise<any>
) => Promise<any>;

export function addMethodHook(
  target: any,
  methodName: string,
  hook: HookFunction
) {
  const hooks: HookFunction[] =
    Reflect.getMetadata(METHOD_HOOKS_KEY, target, methodName) || [];
  hooks.push(hook);
  Reflect.defineMetadata(METHOD_HOOKS_KEY, hooks, target, methodName);
}

export function addClassHook(target: any, hook: HookFunction) {
  const hooks: HookFunction[] =
    Reflect.getMetadata(CLASS_HOOKS_KEY, target) || [];
  hooks.push(hook);
  Reflect.defineMetadata(CLASS_HOOKS_KEY, hooks, target);
}
