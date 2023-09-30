import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { User } from "../model/User";
import { registerValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";

const register = async(user:User):Promise<any> => {
    validate(registerValidation, user);
    const countUser = await prismaClient.user.count({
        where : {
            username : user.username
        }
    });

    if(countUser > 0) throw new ResponseError(400, "username is already taken");

    user.password = await bcrypt.hash(user.password, 10);
    return await prismaClient.user.create({
        data : user,
        select : {
            username : true,
            first_name : true,
            last_name : true
        }
    });
}

export default{
    register
}