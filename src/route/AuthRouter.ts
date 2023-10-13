import express, { NextFunction, Request, Response } from 'express';
import { TokenMiddleware } from '../middleware/TokenMiddleware';
import { AuthController } from '../controller/AuthController';
import AuthRepositoryImp from '../repository/AuthRepositoryImp';

const AuthRouter = express.Router();
AuthRouter.use(TokenMiddleware.tokenDecode);
const controller = new AuthController(AuthRepositoryImp);

AuthRouter.get('/api/users/current', (req, res, next) => {
    controller.get(req, res, next);
});

export{
    AuthRouter
}
