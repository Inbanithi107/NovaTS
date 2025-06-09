// decorators/Service.ts
import { injectable } from "inversify";
import ApplicationContext from "../Container/ApplicationContext";


export function Component(id?: any) {
  return function (target: any) {
    console.log("Binding", target.name); // Debug
    injectable()(target);
    const bindId = id || target;
    if (!ApplicationContext.isBound(bindId)) {
      ApplicationContext.bind(bindId).to(target);
    }
  };
}
