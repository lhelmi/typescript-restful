import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/ResponseError";

class EmailVerifyMiddleware{
    check(req:Request, res:Response, next:NextFunction){
        if(req?.user){
            if(!req.user?.email_verified_at){
                throw new ResponseError(401, "Forbidden, email must verify at once");
            }
            if(req.user?.email_verified_at == null){
                throw new ResponseError(401, "Forbidden, email must verify at once");
            }else{
                return next();
            }
        }
        return next();
    }
}

export default new EmailVerifyMiddleware();