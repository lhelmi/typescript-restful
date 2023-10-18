import dotenv from 'dotenv';
import path from 'path';

class Config{
    dotenv = dotenv.config();
    rootPath = path.resolve(__dirname, '..');
    emailHost:string = process.env.EMAIL_HOST as string;
    emailPort:number =  Number(process.env.EMAIL_PORT) as number;
    emailUser:string =  process.env.EMAIL_USER as string;
    emailPass:string =  process.env.EMAIL_PASS as string;
    serviceName:string =  process.env.SERVICE_NAME as string;
    dbHost:string =  process.env.DB_HOST as string;
    dbPort:string = process.env.DB_PORT as string;
    dbUser:string = process.env.DB_USER as string;
    dbPass:string = process.env.DB_PASS as string;
    dbName:string = process.env.DB_NAME as string;
    jwtSecretKey :string = process.env.JWTSECRETKEY as string;
}

export default new Config;