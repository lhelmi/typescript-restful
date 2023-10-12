import Joi from "joi";

const registerValidation = Joi.object({
    full_name : Joi.string().max(100).required(),
    email : Joi.string().max(100).required().email(),
    customer_id : Joi.number().max(100).required(),
    password : Joi.string().max(100).required(),
    token : Joi.string().max(100).allow('', null)
});

export {
    registerValidation
}