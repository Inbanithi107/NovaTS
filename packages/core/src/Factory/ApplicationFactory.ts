import express from "express";
import { HttpFactory } from "./HttpFactory";
import { ApplicationContext } from "@nova-ts/context";


export class ApplicationFactory {
    setcontext(context: any){
        ApplicationContext.load(context);
    }
}

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
 * @param {number} port - The port number on which the application should listen.
 * @returns {void | Promise<void>} Starts the server after all configurations are complete.
 * @author Inbaithi107
 * @requires ```@nova-ts/context``` installed in the application
 */
export async function InitializeApplication(port?: number){

    

    HttpFactory(Application);

    

    const listeningPort = port || 8080;


    Application.listen(listeningPort, ()=>{
        console.log(`Application started on the ${port==null?"Deafult port 8080": `port ${port}`}`);
    });

}