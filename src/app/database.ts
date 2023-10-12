import mongoose from "mongoose";
import config from '../config/Config';
import { ResponseError } from "../error/ResponseError";


(async () => {
    try {
        await mongoose.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin`);
    } catch (err) {
        throw new ResponseError(500, "DB not connected");
    }
})()

export const db = mongoose.connection;