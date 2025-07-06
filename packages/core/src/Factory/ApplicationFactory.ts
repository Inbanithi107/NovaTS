import express from "express";
import { NovaHttpFactory } from "./NovaHttpFactory";
import { ConfigLoader } from "../Utils/ConfigLoader";
import { ProprtyResolver } from "../Resolver/PropertyResolver";

/**
 * Options for configuring the Nova application.
 * This interface allows you to specify the port,
 * middlewares, and an existing Express application instance.
 * You can use this to customize the behavior of the Nova application
 * during initialization.
 */
export type NovaOptions = {
    port?: number;
    middlewares?: any[];
    application?: express.Express;
}

/**
 * Bootstraps and configures the entire application.
 *
 * This function is used to initialize the framework,
 * set up routes, middleware, dependency injection, and start the Express server.
 *
 * Example usage:
 * ```ts
 * const Application = new ApplicationFactory();
 * Application.InitializeApplication().startApplication();
 * ```
 *
 * port - The port number on which the application should listen.
 * @returns {void | Promise<void>} Starts the server after all configurations are complete.
 * @author Inbanithi107
 * @requires ```@nova-ts/context``` installed in the application
 */
export class ApplicationFactory {

    private Application = express();   

    private port: number;

    constructor(options?: NovaOptions) {
        let port = options?.port;
        let middlewares = options?.middlewares;
        let application = options?.application;
        if(application){
            this.Application = application;
        }else{
            this.Application.use(express.json());
            this.port = port ?? 8080;
        } 
        if(middlewares && middlewares.length > 0){
            this.Application.use(...middlewares);
        }
    }

    /**
     * 
     * @param port It is the port number on which the application should listen.
     * @returns Instance of ApplicationFactory for method chaining.
     */
    public setPort(port: number){
        this.port = port;
        return this;
    }

    /**
     * 
     * @returns The express application instance.
     */
    public getApplication(){
        return this.Application;
    }
    
    /**
     * Sets the Express application instance.
     * This allows for custom configurations or middleware to be applied before starting the server.
     *
     * @param {express.Express} application - The Express application instance.
     * @returns {ApplicationFactory} The current instance of ApplicationFactory for method chaining.
     */
    public setApplication(application: any){
        this.Application = application;
        return this;
    }

    /**
     * Initializes the application by loading configurations,
     * setting up routes, and exception handling.
     * @returns Instance of ApplicationFactory for method chaining.
     */
    public InitializeApplication(){
        ConfigLoader.load();
        ProprtyResolver.loadAllProperties();
        new NovaHttpFactory(this.Application).initializeRoute().initializeExceptionHandler();
        if(!this.port){
            this.port = 8080;
        }
        return this;
    }

    /**
     * 
     * @param middlewares An array of middleware functions to be applied to the application.
     * @returns The current instance of ApplicationFactory for method chaining.
     */
    public applyMiddlewares(middlewares: any[]){
        this.Application.use(...middlewares);
        return this;
    }

    /**
     * Starts the application by listening on the specified port.
     */
    public startApplication(){
        this.Application.listen(this.port, ()=>{
        console.log(`Application started on the port : ${this.port}`);
    });
    }
}