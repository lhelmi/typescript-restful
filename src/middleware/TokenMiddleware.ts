import { NextFunction, Request, Response } from "express";
import { getToken } from "../utils/GetToken";
import { ResponseError } from "../error/ResponseError";
import jwt from 'jsonwebtoken';
import config from "../config/Config";
import { User } from "../model/User";
import { IUser } from "../entity/User";

declare global {
    namespace Express {
        interface Request {
            user? : IUser
            // user? : Record<string, any>
        }
    }
}

export class TokenMiddleware{
    static async tokenDecode(req:Request, res:Response, next:NextFunction){
        try {
            const token = getToken(req);
            if(!token) throw new ResponseError(401, "UNAUTHORIZED");

            const isValid = jwt.verify(token, config.jwtSecretKey as string);
            
            if(!isValid) throw new ResponseError(401, "UNAUTHORIZED");
            console.log('lewat isvalid');
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