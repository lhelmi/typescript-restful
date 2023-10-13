import express, { NextFunction, Request, Response } from 'express';
import { TokenMiddleware } from '../middleware/TokenMiddleware';

import { UserController } from '../controller/UserController';
import UserRespositoryImp from '../repository/UserRespositoryImp';

const Router = express.Router();
Router.use(TokenMiddleware.tokenDecode);
const userController = new UserController(UserRespositoryImp);

Router.get('/api/users/current', (req, res, next) => {
    userController.get(req, res, next);
});

export {
    Router
}
