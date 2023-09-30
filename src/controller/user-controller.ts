import { NextFunction, Request, Response } from "express";
import userRepository from "../repository/user-repository";
import { User } from "../model/User";

const register = async(req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {
            username,
            email,
            password,
            first_name,
            last_name,
        } = req.body;
        const user:User = new User(username, email, password, first_name, last_name);
        const result = await userRepository.register(user);
        return res.status(201).json({
            data : result,
            message : 'Created'
        });
    } catch (error) {
        next(error);
    }
}

export default{
    register
}