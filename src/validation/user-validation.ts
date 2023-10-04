import Joi from "joi";

const registerValidation = Joi.object({
    username : Joi.string().max(100).required(),
    email : Joi.string().max(100).required().email(),
    first_name : Joi.string().max(100).required(),
    last_name : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    token : Joi.string().max(100).allow('', null),
    image : Joi.string().max(100).default('')
});

export {
    registerValidation
}