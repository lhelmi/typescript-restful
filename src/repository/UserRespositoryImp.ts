import { UserRepository } from "./UserRepository";
import { IUser } from "../entity/User";
import { User } from "../model/User";

class UserRespositoryImp implements UserRepository{
    
    async save(value: IUser): Promise<IUser> {
        const data = new User(value);
        return await data.save();
    }
    
}

export default new UserRespositoryImp