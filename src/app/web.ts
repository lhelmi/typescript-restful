import express from "express";
import { PublicRouter } from "../route/PublicApi";
import cors  from 'cors';
import { db } from "./database";
import ErrorMiddleware from "../middleware/ErrorMiddleware";
import { AuthRouter } from "../route/AuthRouter";
// import { AuthRouter } from "../route/AuthRouter";

db.once('open', () => {
    console.log('server connect');
});

export const web = express();
web.use(cors());
web.use(express.json());
web.use(new PublicRouter().router);
web.use(new AuthRouter().router);
// web.use(AuthRouter);
web.use(ErrorMiddleware.get);
