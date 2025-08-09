#!/usr/bin/env node

import { Command } from "commander";
import { createApp } from "./programs/createApp";


const program = new Command();
program
  .name("nova-ts")
  .description("Nova TypeScript CLI")
  .version("1.0.0");
program
    .command("create-app <appName>")
    .description("Create a new Nova TypeScript application")
    .action((appName) => {
        createApp(appName).then(() => {
            console.log(`Nova app '${appName}' created successfully!`);
        }).catch((error) => {
            console.error(`Error creating app: ${error.message}`);
            process.exit(1);
        });
    });
program.parse(process.argv);