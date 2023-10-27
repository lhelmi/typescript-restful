import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repository/AuthRepository";
import { IUser } from "../entity/User";
import { Controller } from "./Controller";
import {AuthRepositoryImp} from "../repository/AuthRepositoryImp";
import { Policy } from "../policy/Policy";
import AuthToken from "../utils/AuthToken";
import { EmailService } from "../service/EmailService";
import { EmailType } from "../entity/EmailType";
import { v4 as uuid } from "uuid";
import EmailTemplate from "../utils/template/EmailTemplate";
import Config from "../config/Config";

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

    private registerPayload(req:Request):IUser{
        let payload = req.body;
        const user = new IUser();
        user.full_name = payload.full_name;
        user.customer_id = payload.customer_id;
        user.email = payload.email;
        user.password = payload.password;
        user.remember_token = uuid();

        return user;
    }

    private sendRegistrationEmail(email:string, token?:string):void{
        const text = EmailTemplate.register(token);
        const emailParam:EmailType = {
            to :email,
            subject: "Pendaftaran",
            from: Config.email_from,
            text:text
        }
        
        const emailService = new EmailService();
        emailService.sendNewEmail(emailParam)
    }

    async register(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const user = this.registerPayload(req);
            const result = await this.repository.save(user);
            this.sendRegistrationEmail(user.email, user.remember_token);
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
            const id = req.user?._id;
            const user = await this.repository.get(id);

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

    async resend(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            
            const { from, to, subject, text } = req.body;
            const emailService = new EmailService();
            
            await emailService.sendNewEmail({from, to, subject, text});
            
            res.status(200).json({
                data : null,
                message : "successfully resend"
            });
        } catch (error) {
            next(error);
        }
    }

    async updateEmailVerify(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const { remember_token } = req.body;
            const userAccount = await this.repository.get(req.params.id)
            const user = new IUser();
            user.remember_token = remember_token;

        } catch (error) {
            
        }
    }
}