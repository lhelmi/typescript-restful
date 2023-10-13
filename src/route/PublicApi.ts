import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controller/UserController';
import UserRespositoryImp from '../repository/UserRespositoryImp';
import { AuthController } from '../controller/AuthController';
import AuthRepositoryImp from '../repository/AuthRepositoryImp';

const publicRouter = express.Router();
const controller = new UserController(UserRespositoryImp);
const authController = new AuthController(AuthRepositoryImp);

publicRouter.post('/api/users/register', (req, res, next) => {
    controller.register(req, res, next);
});

publicRouter.post('/api/users/login', (req, res, next) => {
    authController.login(req, res, next);
});

export {
    publicRouter
}