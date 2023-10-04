import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";
import path from 'path';
import config from "../config/config";
import fs from 'fs';
import { ResponseError } from "../error/response-error";
import UserRespositoryImp from "../repository/UserRespositoryImp";

const register = async(req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {
            username,
            email,
            password,
            first_name,
            last_name
        } = req.body;
        let image = '';
        console.log('masuk');

        if(req.file){
            let tempPath = req.file.path;
            let originalExt = req.file.originalname.split('.') [req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let targetPath = path.resolve(config.rootPath, `public/upload/${filename}`);
            const src = fs.createReadStream(tempPath); // (1) baca file yang masih di lokasi sementara 
            const dest = fs.createWriteStream(targetPath); // (2) pindahkan file ke lokasi permanen/tujuan
            src.pipe(dest); // (3) file mulai dipindahkan dari `src` ke `dest`
            image = filename;
            src.on('error', async() => {
                throw new ResponseError(400, "upload gagal");
            });
        }

        const user:User = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.first_name = first_name;
        user.last_name = last_name;
        
        const result = await UserRespositoryImp.save(user);
        return res.status(201).json({
            data : result,
            message : 'Created'
        });
    } catch (error) {
        next(error);
    }
}

export default{
    register
}