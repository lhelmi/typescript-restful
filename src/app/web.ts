import express from "express";
import { publicRouter } from "../route/PublicApi";
import { errorMiddleware } from "../middleware/ErrorMiddleware";
import cors  from 'cors';
import { db } from "./database";
import { TokenMiddleware } from "../middleware/TokenMiddleware";
import { Router } from "../route/Api";

db.once('open', () => {
    console.log('server connect');
});

export const web = express();
web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(Router);
web.use(errorMiddleware);
