import { RouteDefinition } from "./RouteDefinition";

export type ControllerDefinition = {
    mapping: string,
    routes: RouteDefinition[],
}