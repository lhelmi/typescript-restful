import { ResponseError } from "../error/ResponseError";

const validate = (schema : any, request: any) => {
    const result = schema.validate(request, {
        abortEarly : false,
        allowUnknow : false
    });

    if(result.error){
        throw new ResponseError(400, result.error.message);
    }else{
        return result.value;
    }
}

export {
    validate
}