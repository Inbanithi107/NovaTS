import express from 'express'
import { NovaRouteBinder } from "../Resolver/NovaRouteBinder";

/**
 * @class HttpFactory
 * @description
 * Responsible for wiring up all the controllers and their respective routes
 * into the Express application during Nova application initialization.
 * 
 * It reads controller metadata from the `ControllerRegistry`, resolves instances
 * using the `ApplicationContext`, and maps each method to its corresponding Express route.
 * 
 * It also handles the injection of request parameters using `NovaControllerResolver`
 * and applies filters/middleware where necessary.
 * 
 */
export class NovaHttpFactory {

    constructor(private app: express.Express){

    }

    /**
   * Initializes all controller routes and registers them into the Express application.
   * 
   */
    public initializeRoute(){
        const binder = new NovaRouteBinder(this.app);
        binder.bindAllControllers();
    }

}