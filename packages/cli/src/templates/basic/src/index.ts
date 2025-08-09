import { autoBind } from "@nova-ts/context";
import { ApplicationFactory } from "@nova-ts/core";


async function main() {

    await autoBind("./nova/app");

    const Application = new ApplicationFactory();
    Application
        .InitializeApplication()
        .setPort(8080)
        .startApplication();

}

main();