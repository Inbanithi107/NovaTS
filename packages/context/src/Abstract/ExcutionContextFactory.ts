import { ExecutionContext } from "../Types/ExcutionContext";

export function createExecutionContext(
  target: any,
  methodName: string,
  handler: Function,
  args: any[]
): ExecutionContext {
  const store = new Map<string, any>();
  return {
    target,
    methodName,
    handler,
    args,
    setData: (k, v) => store.set(k, v),
    getData: (k) => store.get(k),
  };
}
