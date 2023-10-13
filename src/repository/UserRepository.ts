import { IUser } from "../entity/User";

export interface UserRepository {
    save(user:IUser): Promise<IUser>;
    get(email:String): Promise<IUser>;
    update(user:IUser, id:string): Promise<IUser>;
}