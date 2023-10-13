import { User } from "../src/model/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from "../src/config/Config";

const removeTestUser = async() => {
    await User.findOneAndDelete({
        email : 'test@tes.cc'
    });
}

const createUserTest = async() => {
    const value = {
        full_name : 'test',
        customer_id : 20,
        email : 'test@tes.cc',
        password : 'test'
    }
    
    const data = new User(value);
    return await data.save();
}

const getUserTest = async() => {
    return await User.findOne({
        email : 'test@tes.cc'
    });
}

export {
    removeTestUser,
    createUserTest,
    getUserTest
}