import express from "express";
import { PublicRouter } from "../route/PublicApi";
import cors  from 'cors';
import { db } from "./database";
import ErrorMiddleware from "../middleware/ErrorMiddleware";
import { AuthRouter } from "../route/AuthRouter";
import createError from 'http-errors';

db.once('open', () => {
    console.log('server connect');
});

export const web = express();
web.use(cors());
web.use(express.json());

web.use(new PublicRouter().router);
web.use(new AuthRouter().router);
web.use(function(req, res, next) {
    res.status(404).json({
        errors: "Not Found"
    });
});
web.use(ErrorMiddleware.get);
