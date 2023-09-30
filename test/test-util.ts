import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";

const removeTestUser = async() => {
    await prismaClient.user.deleteMany({
        where : {
            username : 'test'
        }
    });
}

export {
    removeTestUser
}