import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { registerValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";
import { UserRepository } from "./UserRepository";
import { RegisterResponse } from "../error/response";

class UserRespositoryImp implements UserRepository{
    
    async save(req: Request): Promise<RegisterResponse> {
        const user = validate(registerValidation, req);
        
        const countUser = await prismaClient.user.count({
            where : {
                username : user.username as string
            }
        });

        if(countUser > 0) throw new ResponseError(400, "username is already taken");
        user.password = await bcrypt.hash(user.password, 10);
        return await prismaClient.user.create({
            data : user,
            select : {
                username : true,
                first_name : true,
                last_name : true,
                email : true,
                image: true
            }
        });
    }
    
}

export default new UserRespositoryImp