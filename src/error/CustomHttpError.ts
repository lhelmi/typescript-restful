// import {HttpError} from 'http-errors';
import { HttpError } from 'http-errors';

export class CustomHttpError extends Error implements HttpError{
    status: number;
    [key: string]: any;
    statusCode: number;
    expose: boolean;
    headers?: { [key: string]: string; } | undefined;
    
    constructor(statusCode:number, message : string, expose:boolean, status:number){
        super(message);
        this.statusCode = statusCode;
        this.expose = expose;
        this.status = status;
    }
    
}