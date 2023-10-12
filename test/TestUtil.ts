import { User } from "../src/model/User";

const removeTestUser = async() => {
    await User.findOneAndDelete({
        email : 'test@tes.cc'
    });
}

export {
    removeTestUser
}