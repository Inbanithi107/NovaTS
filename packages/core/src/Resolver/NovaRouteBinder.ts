import express from 'express'
import { NovaControllerResolver } from './NovaControllerResolver';
import { ControllerRegistry } from '../Registry';
import { ApplicationContext } from '@nova-ts/context';
import { NovaConstant } from '../Constants/NovaConstants';
import { ConvertPath } from '../Utils/RequestPath';
import { NovaControllerInvoker } from './NovaControllerInvoker';
import { NovaFilterExecutor } from './NovaFilterExecutor';
import { NovaRequest, NovaResponse } from '../Abstract';

/**
 * @class NovaRouteBinder
 * @description
 * Responsible for binding all registered controllers and their routes to the Express application.
 * It centralizes the process of reading controller metadata, applying filters,
 * and setting up the routing logic using `NovaControllerInvoker` and `NovaFilterExecutor`.
 * 
 * This class acts as the final integrator that brings together the components of the Nova
 * HTTP pipeline — controllers, filters, argument resolvers — and registers them with Express.
 */
export class NovaRouteBinder {
    private resolver = new NovaControllerResolver();

  constructor(private app: express.Express) {}

  /**
   * Binds all controllers from the `ControllerRegistry` to the Express app.
   * 
   * This method:
   * - Retrieves controller classes and metadata.
   * - Resolves controller instances from `ApplicationContext`.
   * - Constructs the full route path.
   * - Sets up a `NovaFilterExecutor` and `NovaControllerInvoker` for each route.
   * - Registers the route handler with Express using the appropriate HTTP method.
   * 
   * This is the main entry point for bootstrapping route registration in the Nova framework.
   */
  public bindAllControllers() {
    for (const [clazz, definition] of ControllerRegistry) {
      const instance: any = ApplicationContext.get(clazz.name);
      const basePath = Reflect.getMetadata(NovaConstant.Controller, clazz);

      for (const route of definition.routes) {
        const fullPath = ConvertPath(`${basePath}${route.path}`);
        const handler = instance[route.handlerName].bind(instance);

        this.app[route.method](fullPath, async (req, res, next) => {
          const Request = req as NovaRequest;
          const Response = res as NovaResponse;

          try {
            const controllerInvoker = new NovaControllerInvoker(instance, route, handler, this.resolver);
            await new NovaFilterExecutor().execute(Request, Response, async() => controllerInvoker.invoke(Request, Response, next));
            Response.json(Response.body);
          } catch (error) {
            console.error(`[ERROR] in ${route.method.toUpperCase()} ${fullPath}:`, error);
            next(error);
          }
        });
      }
    }
  }
}