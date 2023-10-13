import { UserRepository } from "./UserRepository";
import { IUser } from "../entity/User";
import { User } from "../model/User";
import { ResponseError } from "../error/ResponseError";

class UserRespositoryImp implements UserRepository{
    
    async save(value: IUser): Promise<IUser> {
        const data = new User(value);
        return await data.save();
    }

    async get(email: String): Promise<IUser> {
        const result = await User.findOne(
            {
                email : email
            }
        );

        if(!result) throw new ResponseError(404, 'User not found');

        return result;
    }

    update(user: IUser, id: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    
}

export default new UserRespositoryImp