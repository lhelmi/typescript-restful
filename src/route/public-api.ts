import express from 'express';
import userController from '../controller/user-controller';
import { upload } from '../error/file-errors';

const publicRouter = express.Router();
publicRouter.post('/api/users/register', upload.single('image'), userController.register);

export {
    publicRouter
}