import { autoBind } from "@nova-ts/context";
import { ApplicationFactory } from "@nova-ts/core";

async function start(){

    await autoBind('./dist/NovaApp');

    const Application = new ApplicationFactory();
    Application.InitializeApplication().startApplication();

}

start();