import express, { Router } from 'express';
import { AuthController } from '../controller/AuthController';

export class PublicRouter {
    public router:Router;
    private authController;
    
    constructor(){
        this.router = express.Router();
        this.authController = new AuthController()
        this.authRouter();
    }

    protected authRouter():void{
        this.router.post('/api/users/register', (req, res, next) => {
            this.authController.register(req, res, next);
        });

        this.router.post('/api/users/login', (req, res, next) => {
            this.authController.login(req, res, next);
        });

        this.router.post('/api/users/resend-email', (req, res, next) => {
            this.authController.resend(req, res, next);
        });
    }
    // publicRouter.post('/api/users/register', (req, res, next) => {
    //     authController.register(req, res, next);
    // });

    // publicRouter.post('/api/users/login', (req, res, next) => {
    //     authController.login(req, res, next);
    // });

}