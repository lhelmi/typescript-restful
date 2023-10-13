import { IUser } from "../entity/User";
import { User } from "../model/User";
import { ResponseError } from "../error/ResponseError";
import { AuthRepository } from "./AuthRepository";
import jwt from 'jsonwebtoken';
import Config from "../config/Config";
import bcrypt from 'bcrypt';

class UserLoginRepositoryImp implements AuthRepository{
    async login(email: string, password:string): Promise<IUser> {
        const user = await this.get(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new ResponseError(401, "username or password wrong");
        const signed = jwt.sign(JSON.stringify(user), Config.jwtSecretKey as string);
        user.token?.push(signed);
        await User.findOneAndUpdate(
            {
                email: user.email
            },
            {
                $push : {
                    token : signed
                }
            },
            {
                new:true
            }
        );

        return user;
    }

    async get(email:string): Promise<IUser> {
        const result = await User.findOne(
            {
                email : email
            }
        );

        if(!result) throw new ResponseError(404, 'User not found');

        return result;
    }
    
}

export default new UserLoginRepositoryImp