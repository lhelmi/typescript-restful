import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const rootPath = path.resolve(__dirname, '..');
const serverPort = process.env.PORT;

export default{
    serviceName : process.env.SERVICE_NAME,
    dbHost : process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    jwtSecretKey : process.env.JWTSECRETKEY,
    rootPath,
    serverPort
}