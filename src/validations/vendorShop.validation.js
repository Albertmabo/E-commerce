import Joi from "joi";
const vendorShopInputValidation = Joi.object({
  shopName: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Name of the shop shoud be string",
    "string.empty": "Shop name cannot be empty",
    "string.min": "Shop name cannot be less then 3 characters",
    "string.max": "Shop name cannot be more then 30 characters",
    "any.required": "Shop name cannot be empty",
  }),
  address: Joi.string().trim().required().messages({
    "string.base": "Shop address should be string",
    "string.empty": "Shop address cannot be empty",
    "any.required": "Shop address cannot be empty",
  }),
  ratings: Joi.string().optional(),
  shopRegistrationNumber: Joi.string().trim().required().messages({
    "string.base": "Shop registration number must be a string",
    "string.empty": "Shop registration number cannot be empty",
    "any.required": "Shop registration number is required",
  }),
  isVerified: Joi.boolean().default(false),
});

export default vendorShopInputValidation;
