import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repository/AuthRepository";
import { IUser } from "../entity/User";
import { Controller } from "./Controller";
import {AuthRepositoryImp} from "../repository/AuthRepositoryImp";
import { Policy } from "../policy/policy";
import AuthToken from "../utils/AuthToken";

export class AuthController extends Controller {

    private repository:AuthRepository;

    constructor(){
        super();
        this.repository = new AuthRepositoryImp();
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

    async update(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            (new Policy(req.user, 'update', 'User').checkAbillities());

            const payload = req.body;
            const id = req.params.id;
            const user = new IUser();
            user.full_name = payload.full_name;
            user.email = payload.email;
            user.password = payload.password;
            
            console.log(id);
            const result = await this.repository.update(user, id);
            
            return res.status(200).json({
                data : result,
                message : 'Updated'
            });
        
        } catch (error) {
            next(error);
        }
    }

    async get(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            (new Policy(req.user, 'read', 'User').checkAbillities());
            const email = req.user?.email;

            const user = await this.repository.get(email);

            res.status(200).json({
                data : user,
                message : 'User data'
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const token = AuthToken.get(req);
            await this.repository.updateToken(token);

            res.status(200).json({
                data : null,
                message : "successfully logout"
            });
        } catch (error) {
            next(error);
        }
    }
}