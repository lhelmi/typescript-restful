import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controller/UserController';
import UserRespositoryImp from '../repository/UserRespositoryImp';

const publicRouter = express.Router();
const controller = new UserController(UserRespositoryImp);

publicRouter.post('/api/users/register', (req, res, next) => {
    controller.register(req, res, next);
});

export {
    publicRouter
}