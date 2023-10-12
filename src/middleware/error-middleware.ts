import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error"

const errorMiddleware = async (err : Error, req : Request, res : Response, next:NextFunction) => {

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