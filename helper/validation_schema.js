const Joi = require('joi');
const validateManualSignUp = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid("Male", "Female", "Others").required(),
    age: Joi.number().min(1).required(),
    country: Joi.string().required(),
});
const validateSocialSignUp = Joi.object({
    socialLoginId: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().lowercase().required().allow(null, ''),
    gender: Joi.string().valid("Male", "Female", "Others").required(),
    age: Joi.number().min(1).required(),
    country: Joi.string().required(),
    avatar: Joi.string().required(),
    networkPlatform: Joi.string().required(),
});

const validateManualSignIn = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),

});
const validateSocialSignIn = Joi.object({
    socialLoginId: Joi.string().required(),
});

const validateUpdateProfileSchema = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email().lowercase(),
    gender: Joi.string().valid("Male", "Female", "Others"),
    age: Joi.number().min(1),
    country: Joi.string(),
    avatar: Joi.string(),
})

module.exports = {
    validateManualSignUp,
    validateSocialSignUp,
    validateManualSignIn,
    validateSocialSignIn,
    validateUpdateProfileSchema,



}