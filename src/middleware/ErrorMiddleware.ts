import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/ResponseError"

// class ValidationError extends Error {
//     status: number;
//     errors:string[];
//     constructor(status:number, message : string, errors:string[]){
//         super(message);
//         this.status = status;
//         this.errors = errors;
//     }
// }

const errorMiddleware = async (err:any, req : Request, res : Response, next:NextFunction) => {

    if(!err){
        next();
        return;
    }

    if(err instanceof ResponseError){
        return res.status(err.status).json({
            errors : err.message
        }).end();
    }else if(err && err.name === 'ValidationError'){
        return res.status(400).json({
            errors : err.message,
            field : err.errors
        }).end();
    }else{
        return res.status(500).json({
            errors : err.message
        }).end();
    }
}

export {
    errorMiddleware
}