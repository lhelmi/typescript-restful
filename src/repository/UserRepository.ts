import { Prisma } from "@prisma/client";
import { RegisterResponse } from "../error/response";

export interface UserRepository {
    save(user: Prisma.UserCreateInput): Promise<RegisterResponse>;
}