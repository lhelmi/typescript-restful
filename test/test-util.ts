import { prismaClient } from "../src/app/database";

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