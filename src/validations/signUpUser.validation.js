import Joi from "joi";

const signUpUserInputValidation = Joi.object({
  firstName: Joi.string().trim().max(20).min(3).required().messages({
    "string.base": "First Name must be string",
    "string.empty": "First Name cannot be empty",
    "any.required": "First name is required",
    "string.max": "First name cannot be more then 20 character",
    "string.min": "First name cannot be less then 3 character",
  }),
  middleName: Joi.string().trim().max(20).min(3).optional().messages({
    "string.base": "Middle Name must be string",
    "string.empty": "Middle Name cannot be empty",
    "string.max": "Middle name cannot be more then 20 character",
    "string.min": "Middle name cannot be less then 3 character",
  }),
  lastName: Joi.string().trim().max(20).min(3).required().messages({
    "string.base": "Last Name must be string",
    "string.empty": "Last Name cannot be empty",
    "any.required": "Last name is required",
    "string.max": "Last name cannot be more then 20 character",
    "string.min": "Last name cannot be less then 3 character",
  }),

  email: Joi.string().email().trim().required().messages({
    "string.base": "Email must be string",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  phoneNo: Joi.string().trim().max(15).min(6).required().messages({
    "string.base": "Contact number must be string",
    "string.empty": "Contact number cannot be empty",
    "any.required": "Contact number is required",
    "string.max": "Contact number cannot be more then 15 character",
    "string.min": "Contact number cannot be less then 6 character",
  }),
  role: Joi.string()
    .valid("admin", "user", "vendor")
    .required()
    .default("user")
    .messages({
      "string.base": "Role must be string",
      "string.empty": "Role cannot be empty",
      "any.only": "Role must be one of the allowed",
    }),

  address: Joi.string().trim().max(150).min(6).required().messages({
    "string.base": "Address must be string",
    "string.empty": "Address cannot be empty",
    "any.required": "Address is required",
    "string.max": "Address cannot be more then 150 character",
    "string.min": "Address cannot be less then 6 character",
  }),

  dateOfBirth: Joi.date().required().messages({
    "data.base": "Date of birth must be of type Date",
    "any.required": "Date of birth is required",
  }),
  password: Joi.string().trim().min(6).required().messages({
    "string.base": "Password must be string",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password cannot be less then 6 character",
  }),
  confirmPassword: Joi.string().trim().min(6).required().messages({
    "string.base": "Confirm Password must be string",
    "string.empty": "Confirm Password cannot be empty",
    "any.required": "Confirm Password is required",
    "string.min": "Confirm Password cannot be less then 6 character",
  }),
  isPasswordChangedAt:Joi.date().optional().messages({
    "data.base": "Password Change Date of must be of type Date",
  }),
});

export default signUpUserInputValidation;