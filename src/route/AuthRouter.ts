import { TokenMiddleware } from '../middleware/TokenMiddleware';
import express, { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import EmailVerifyMiddleware from '../middleware/EmailVerifyMiddleware';

export class AuthRouter {
    public router:Router;
    private controller;
    private auth;
    private emailVerify;

    constructor(){
        this.router = express.Router();
        this.auth = new TokenMiddleware().decode;
        this.emailVerify = EmailVerifyMiddleware.check;

        this.controller = new AuthController();
        this.authRouter();
        this.emailMiddleware();
        
    }

    protected authRouter():void{
        this.router.use(this.auth);
        
        this.router.get('/api/users/current', (req, res, next) => {
            this.controller.get(req, res, next);
        });

        this.router.get('/api/users/logout',  (req, res, next) => {
            this.controller.logout(req, res, next);
        });

        this.router.post('/api/users/resend-email', (req, res, next) => {
            this.controller.resend(req, res, next);
        });
    }

    protected emailMiddleware():void{
        this.router.use(this.auth);
        this.router.use(this.emailVerify);

        this.router.put('/api/users/:id', this.emailVerify, (req, res, next) => {
            this.controller.update(req, res, next);
        });
    }

}