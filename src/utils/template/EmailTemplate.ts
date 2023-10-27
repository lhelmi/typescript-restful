import { ResponseError } from "../../error/ResponseError";

class EmailTemplate{
    register(uuid?:string){
        if(uuid){
            return `<p>Untuk verifikasi email silahkan salin dan submit kunci dibawah ini :</p><hr><p><b>${uuid}</b></p>`
        }
        throw new ResponseError(400, "uuid not found");
    }
}

export default new EmailTemplate();