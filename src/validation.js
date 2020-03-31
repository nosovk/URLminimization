const Joi = require('@hapi/joi');


const registerSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required(),
    password2: Joi.ref('password')
});

const loginSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required(),
});


module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
