import VendorShop from "../models/vendorShop.js";
import User from "../models/user.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Joi from "joi";
import CustomError from "../utils/CustomError.js";

//@desc Get VendorShop
//@rotute GET api/v1/vendorshop
//@access public

const getAllVendorShops = asyncErrorHandler(async (req, res) => {
  const vendorShops = await VendorShop.find({}).select("-__v").populate({
    path: "user",
    select: "-__v",
  });
  res.status(200).json({
    success: true,
    message: "Vendor Shop retrived successfully",
    data: vendorShops,
    meta: {
      total: vendorShops.length,
    },
  });
});

//@desc Get sinble VendorShop
//@rotute GET api/v1/vendorshop/:id
//@access public

const getVendorShop = asyncErrorHandler(async (req, res) => {
  const { id: vendorId } = req.params;
  const vendorShop = await VendorShop.findById(vendorId)
    .select("-__v")
    .populate({
      path: "user",
      select: "-__v",
    });

  if (!vendorShop) {
    return res.status(404).json({
      error: "VendorShop not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Vendor Shop retrived successfully",
    data: vendorShop,
  });
});

//@desc Post VendorShop
//@rotute POST api/v1/vendorshop
//@access public

const createVendorShop = asyncErrorHandler(async (req, res) => {
  const { user: userId } = req.body;

  // Check if the user exist
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (user.role !== "vendor") {
    throw new CustomError("User is not a vendor", 400);
  }

  const vendorShopInputValidation = Joi.object({
    user: Joi.string().length(24).hex().required().messages({
      "string.length": "Invalid user ID",
      "string.hex": "Invalid user ID, Only hex value",
      "any.required": "User is required to create Vendor Shop",
    }),
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
      "any.required": "Shop registration numner is required",
    }),
    isVerified: Joi.boolean().default(false),
  });

  // validation
  const {error, value} = vendorShopInputValidation.validate(req.body,{
    abortEarly: true,
  })

  if(error){
    throw new CustomError(
       error.details.map((d) => d.message).join(", "), 400
    )
  }
  const vendorShop = await VendorShop.create(value);

  res.status(201).json({
    success: true,
    message: "Vendor Shop created successfully",
    data: vendorShop,
  });
});
//@desc Update VendorShop
//@rotute PATCH api/v1/vendorshop/:id
//@access public

const updatedVendorShop = asyncErrorHandler(async (req, res) => {
  const { id: vendorId } = req.params;
  const vendorShop = await VendorShop.findOneAndUpdate(
    { _id: vendorId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!vendorShop) {
    return res.status(404).json({
      error: "No vendot shop avalilabe",
    });
  }

  res.status(200).json({
    success: true,
    message: "Vendor Shop Updated successfully",
    data: vendorShop,
  });
});
//@desc Delete VendorShop
//@rotute DELETE api/v1/vendorshop/:id
//@access public

const deleteVendorShop = asyncErrorHandler(async (req, res) => {
  const { id: vendorId } = req.params;

  const vendorShop = await VendorShop.findOneAndDelete(vendorId);

  res.status(200).json({
    success: true,
    message: "Vendor Shop Deleted successfully",
    data: null,
  });
});
export {
  getAllVendorShops,
  getVendorShop,
  createVendorShop,
  updatedVendorShop,
  deleteVendorShop,
};
