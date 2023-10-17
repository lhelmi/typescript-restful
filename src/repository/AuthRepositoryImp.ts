import { IUser } from "../entity/User";
import { User } from "../model/User";
import { ResponseError } from "../error/ResponseError";
import { AuthRepository } from "./AuthRepository";
import jwt from 'jsonwebtoken';
import Config from "../config/Config";
import bcrypt from 'bcrypt';

export class AuthRepositoryImp implements AuthRepository{
    async login(email: string, password:string): Promise<IUser> {
        const user = await this.get(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new ResponseError(401, "username or password wrong");
        const signed = jwt.sign(JSON. stringify(user), Config.jwtSecretKey as string);
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

    async get(email?:string): Promise<IUser> {
        if(!email) throw new ResponseError(400, 'Email is invalid!')

        const result = await User.findOne(
            {
                email : email
            }
        );

        if(!result) throw new ResponseError(404, 'User not found');

        return result;
    }

    async save(value: IUser): Promise<IUser> {
        const data = new User(value);
        return await data.save();
    }

    update(user: IUser, id: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    async updateToken(token: string | null): Promise<IUser> {
        if(!token){
            throw new ResponseError(404, "User not found");    
        }
        const user = await User.findOneAndUpdate({
            token : {
                $in : [token]
            }
        },{
            $pull : {token}
        },{
            useFindAndMofify:false
        });

        if(!user){
            throw new ResponseError(404, "User not found");
        }

        return user;
    }
    
}