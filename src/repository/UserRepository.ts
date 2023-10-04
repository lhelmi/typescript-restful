import { RegisterResponse } from "../error/response";

export interface UserRepository {
    save(req: Request): Promise<RegisterResponse>;
}