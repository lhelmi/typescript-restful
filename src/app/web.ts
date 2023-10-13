import express from "express";
import { publicRouter } from "../route/PublicApi";
import { errorMiddleware } from "../middleware/ErrorMiddleware";
import cors  from 'cors';
import { db } from "./database";
import { TokenMiddleware } from "../middleware/TokenMiddleware";
import { AuthRouter } from "../route/AuthRouter";

db.once('open', () => {
    console.log('server connect');
});

export const web = express();
web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(AuthRouter);
web.use(errorMiddleware);
