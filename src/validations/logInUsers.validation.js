import Joi from "joi";

const logInUserInputValidation = Joi.object({
  email: Joi.string().email().required().lowercase().messages({
    "string.base": "Email must be of type string",
    "string.empty": "Email field cannot be empty",
    "any.required": "Email field is required",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password must be of type string",
    "string.empty": "Password field cannot be empty",
    "any.required": "Password field is required",
    "string.min": "Password must at least 6 characters",
  }),
});

export default logInUserInputValidation;
