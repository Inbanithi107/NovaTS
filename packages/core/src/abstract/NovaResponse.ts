import { Response } from "express";

/**
 * NovaResponse interface extends the Express Response interface.
 * It can be used to add custom properties or methods to the response object.
 */
export interface NovaResponse extends Response {
    body?: any; 
}