import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/ResponseError"
import { Error } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import JwtStatusCode from "../utils/JwtStatusCode";

class ErrorMiddleware{
    get(err:Error, req : Request, res : Response, next:NextFunction){
        if(!err){
            next();
            return;
        }
    
        if(err instanceof ResponseError){
            return res.status(err.status).json({
                errors : err.message
            }).end();
        }else if(err instanceof Error.ValidationError){
            return res.status(400).json({
                errors : err.message,
                field : err.errors
            }).end();
        }else if(err instanceof JsonWebTokenError){
            let status = JwtStatusCode.get(err.message)
            return res.status(status).json({
                errors : err.message,
            }).end();
        
        }else{
            if (err.message == 'Not Found'){
                return res.status(404).json({
                    errors : err.message
                }).end();    
            }
            return res.status(500).json({
                errors : err.message
            }).end();
        }
    }
}

export default new ErrorMiddleware();