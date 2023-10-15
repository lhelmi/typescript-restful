import { TokenMiddleware } from '../middleware/TokenMiddleware';
import express, { Router } from 'express';
import { AuthController } from '../controller/AuthController';


export class AuthRouter {
    public router:Router;
    private controller;
    private tokenMiddleware;

    constructor(){
        this.router = express.Router();
        this.tokenMiddleware = new TokenMiddleware();
        this.router.use(this.tokenMiddleware.decode);
        this.controller = new AuthController();
        this.authRouter();
    }

    protected authRouter():void{
        this.router.get('/api/users/current', (req, res, next) => {
            this.controller.get(req, res, next);
        });
    }

}