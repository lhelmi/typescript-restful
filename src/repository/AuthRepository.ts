import { IUser } from "../entity/User";

export interface AuthRepository {
    login(email:string, password:string): Promise<IUser>;
    save(user:IUser): Promise<IUser>;
    get(email?:String): Promise<IUser>;
    update(user:IUser, id:string): Promise<IUser>;
}