import { TokenMiddleware } from '../middleware/TokenMiddleware';
import express, { Router } from 'express';
import { AuthController } from '../controller/AuthController';


export class AuthRouter {
    public router:Router;
    private controller;
    private auth;

    constructor(){
        this.router = express.Router();
        this.auth = new TokenMiddleware().decode;
        this.controller = new AuthController();
        this.authRouter();
    }

    protected authRouter():void{
        this.router.get('/api/users/current', this.auth, (req, res, next) => {
            this.controller.get(req, res, next);
        });
    }

}