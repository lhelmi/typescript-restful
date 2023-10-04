import multer from 'multer';
import os from 'os';
import { ResponseError } from './response-error';

export const imageFilter = (req:any, file:any, cb:any) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        throw new ResponseError(400, "Format file upload salah");
    }
    cb(null, true);
}
export const upload = multer({
    dest: os.tmpdir(),
    fileFilter:imageFilter
})