import { NextFunction, Request, Response } from "express";
import { IUser } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

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
}