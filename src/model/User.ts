import mongoose from "mongoose";
const { model, Schema } = mongoose;
import bcrypt from 'bcrypt';
import { IUser } from "../entity/User";

const HASH_ROUND = 10;

const userSchema = new Schema<IUser>({
    full_name : {
        type : String,
        required: [true, 'Nama harus diisi'], 
        maxlength: [255, 'Panjang nama harus antara 3 - 255 karakter'],
        minlength: [3, 'Panjang nama harus antara 3 - 255 karakter']
    },
    customer_id: {
        type: Number, 
    },
    email: {
        type: String, 
        required: [true, 'Email harus diisi'], 
        maxlength: [255, 'Panjang email maksimal 255 karakter'],
        
    },
    password: {
        type: String, 
        required: [true, 'Password harus diisi'], 
        maxlength: [255, 'Panjang password maksimal 255 karakter'], 
    }, 
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: [String],
    email_verified_at: {
        type: Date
    },
    remember_token : {
        type : String
    } 
}, {
    timestamps : true
});

userSchema.path('email').validate(function(params:string) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    
    return EMAIL_RE.test(params);
}, `{VALUE} harus merupakan email yang valid!`);

userSchema.path('email').validate(async function(params){
    try {
        const count = await model('User').count({email: params});

        return !count;
    } catch (error) {
        throw error;
    }
}, `Email {VALUE} sudah terdaftar`);

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
});

userSchema.pre('save', async function(next){
    try {
        const count = await model('User').find()
        .sort({ customer_id: -1 })
        .limit(1);
        if (count.length > 0){
            let number = parseInt(count[0].customer_id) + 1;
            this.customer_id = number
        }else{
            this.customer_id = 1;
        }
    } catch (error) {
        throw error;
    }
    next();
});

export const User = model('User', userSchema);