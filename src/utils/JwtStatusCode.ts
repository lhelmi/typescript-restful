class JwtStatusCode{
    get(name: String){
        let status:number = 401;
        switch (name) {
            case 'invalid token':
                status = 498;
            break;

            default:
                status;
            break;
        }
        // console.log(`status : ${status} :: ${name}`);
        return status;
    }
}

export default new JwtStatusCode;