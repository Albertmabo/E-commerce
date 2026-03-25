import Joi from "joi";

const passowordResetValidation = Joi.object({
    email: Joi.string().email().trim().required().messages({
        "string.base":"Email must be String",
        "string.empty":"Email cannot be empty",
        "any.required":"Email is required"
    })
    
})

export default passowordResetValidation;