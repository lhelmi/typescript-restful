import { Request } from "express";

class AuthToken{
    get(req:Request):string | null{
        const token = req.headers.authorization ? req.headers.authorization.replace('bearer', '') : null;
        return token && token.length ? token : null;
    }
}

export default new AuthToken();