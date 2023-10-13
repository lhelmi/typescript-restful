import { Request } from "express";

export const getToken = (req:Request) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('bearer', '') : null;
    return token && token.length ? token : null;
}