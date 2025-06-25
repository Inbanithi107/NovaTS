import express from "express";
import { NovaHttpFactory } from "./NovaHttpFactory";
import { ConfigLoader } from "../Utils/ConfigLoader";

const Application = express();
Application.use(express.json());

/**
 * Bootstraps and configures the entire application.
 *
 * This function is used to initialize the framework,
 * set up routes, middleware, dependency injection, and start the Express server.
 *
 * Example usage:
 * ```ts
 * InitializeApplication(3000);
 * ```
 *
 * port - The port number on which the application should listen.
 * @returns {void | Promise<void>} Starts the server after all configurations are complete.
 * @author Inbaithi107
 * @requires ```@nova-ts/context``` installed in the application
 */
export class ApplicationFactory {

    

    port!: number;

    setPort(port: number){
        this.port = port;
    }

    public InitializeApplication(){
        ConfigLoader.load();
        new NovaHttpFactory(Application).initializeRoute().initializeExceptionHandler();
        if(!this.port){
            this.port = 8080;
        }
    }

    public startApplication(){
        Application.listen(this.port, ()=>{
        console.log(`Application started on the port : ${this.port}`);
    });
    }
}