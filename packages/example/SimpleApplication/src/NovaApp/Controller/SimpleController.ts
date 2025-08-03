import { Component } from "@nova-ts/context";
import { Controller, GetMapping } from "@nova-ts/core";

@Controller()
@Component()
export class SimpleController {

    @GetMapping("/simple")
    public simple(){
        return {
            message: "This is a simple controller response"};
    }

}