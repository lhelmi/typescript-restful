import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repository/AuthRepository";

export class AuthController {

    private repository:AuthRepository;

    constructor(repository: AuthRepository){
        this.repository = repository;
    }

    async login(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const { email, password} = req.body;
            const result = await this.repository.login(email, password);   
            return res.status(200).json({
                data : result,
                message : 'Login Successful'
            });
        } catch (error) {
            next(error);
        }
    }
}