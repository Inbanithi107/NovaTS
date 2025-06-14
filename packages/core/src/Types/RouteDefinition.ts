import { HttpMethods } from "./HttpMethods"

export type RouteDefinition = {
    method: HttpMethods,
    path: string,
    handlerName: string
}