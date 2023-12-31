import { IUser } from "../entity/User";
import { User } from "../model/User";
import { ResponseError } from "../error/ResponseError";
import { AuthRepository } from "./AuthRepository";
import jwt from 'jsonwebtoken';
import Config from "../config/Config";
import bcrypt from 'bcrypt';

export class AuthRepositoryImp implements AuthRepository{
    async login(email: string, password:string): Promise<IUser> {
        const user = await this.getByEmail(email);
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

    async get(id?:string): Promise<IUser> {
        if(!id) throw new ResponseError(400, 'ID is invalid!')
        const result = await User.findOne(
            {
                _id : id
            }
        );

        if(!result) throw new ResponseError(404, 'User not found');

        return result;
    }

    async getByEmail(email?:string): Promise<IUser> {
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

    async update(user: IUser, id: string): Promise<IUser> {
        const result = await User.findOneAndUpdate(
            { _id : id },
            user,
            {
                new: true,
                runValidators : true
            }
        );

        if(!result){
            throw new ResponseError(404, "User not found");
        }

        return result;
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