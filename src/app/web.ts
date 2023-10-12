import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import cors  from 'cors';
import { db } from "./database";

db.once('open', () => {
    console.log('server connect');
});

export const web = express();
web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);