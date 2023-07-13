const Joi = require('joi');
const validateManualSignUp = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid("Male", "Female", "Others").required(),
    age: Joi.number().min(1).required(),
    country: Joi.string().required(),
})

module.exports = {
    validateManualSignUp
}