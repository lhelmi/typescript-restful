export class IUser{
    _id!:string;
    full_name!:string;
    customer_id!:Number;
    email!:string;
    password!:string;
    role!:string;
    token?:string[];
    email_verified_at?:Date;
    remember_token?:string;
}