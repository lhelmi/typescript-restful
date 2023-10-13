import { NextFunction, Request, Response } from "express";
import { IUser } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import jwt from 'jsonwebtoken';
import Config from "../config/Config";
import { User } from "../model/User";

export class UserController {

    private repository:UserRepository;

    constructor(repository: UserRepository){
        this.repository = repository;
    }

    async register(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            let payload = req.body;
            
            const user = new IUser();
            user.full_name = payload.full_name;
            user.customer_id = payload.customer_id;
            user.email = payload.email;
            user.password = payload.password;
            
            const result = await this.repository.save(user);
            
            return res.status(201).json({
                data : result,
                message : 'Created'
            });
        } catch (error) {
            next(error);
        }
    }

    async get(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const email = req.user?.email;
            res.status(200).json({
                data : email,
                message : 'Ok'
            });
        } catch (error) {
            next(error);
        }
    }
}