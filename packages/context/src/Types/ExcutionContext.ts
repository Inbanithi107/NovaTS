export interface ExecutionContext {
  target: any;
  methodName: string;
  handler: Function;
  args: any[];
  setData(key: string, value: any): void;
  getData<T = any>(key: string): T | undefined;
}
