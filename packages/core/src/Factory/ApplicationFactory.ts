import express from "express";
import { HttpFactory } from "./HttpFactory";
import { ApplicationContext } from "@nova-ts/context";


export class ApplicationFactory {
    setcontext(context: any){
        ApplicationContext.load(context);
    }
}

const Application = express();

export async function InitializeApplication(port?: number){

    

    HttpFactory(Application);

    

    const listeningPort = port || 8080;


    Application.listen(listeningPort, ()=>{
        console.log(`Application started on the ${port==null?"Deafult port 8080": `port ${port}`}`);
    });

}