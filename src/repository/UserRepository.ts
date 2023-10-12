import { IUser } from "../entity/User";

export interface UserRepository {
    save(user:IUser): Promise<IUser>;
}