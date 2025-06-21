import { Response } from "express";

export interface NovaResponse extends Response {
    body?: any; 
}