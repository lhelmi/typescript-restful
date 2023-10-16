import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/ResponseError";
import jwt from 'jsonwebtoken';
import config from "../config/Config";
import { User } from "../model/User";
import { IUser } from "../entity/User";
import AuthToken from "../utils/AuthToken";

declare global {
    namespace Express {
        interface Request {
            user? : IUser
            // user? : Record<string, any>
        }
    }
}

export class TokenMiddleware{
    async decode(req:Request, res:Response, next:NextFunction){
        try {
            const token = AuthToken.get(req);
            // if(!token) return next();
            if(!token) throw new ResponseError(401, "UNAUTHORIZED");
            const isValid = jwt.verify(token, config.jwtSecretKey as string);
            if(!isValid) throw new ResponseError(401, "UNAUTHORIZED");
            const user = await User.findOne({
                token : {
                    $in : [token]
                }
            });

            if(!user) throw new ResponseError(401, "Token Expired");

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}