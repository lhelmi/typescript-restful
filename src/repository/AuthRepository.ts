import { IUser } from "../entity/User";

export interface AuthRepository {
    login(email:string, password:string): Promise<IUser>;
}