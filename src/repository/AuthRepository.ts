import { IUser } from "../entity/User";

export interface AuthRepository {
    login(email:string, password:string): Promise<IUser>;
    save(user:IUser): Promise<IUser>;
    get(id?:String): Promise<IUser>;
    getByEmail(email?:String): Promise<IUser>;
    update(user:IUser, id:string): Promise<IUser>;
    updateToken(token:string | null): Promise<IUser>;
}