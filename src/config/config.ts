import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const rootPath = path.resolve(__dirname, '..');
const serverPort = process.env.PORT;

export default{
    rootPath,
    serverPort
}