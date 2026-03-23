import VendorShop from "../models/vendorShop.js";
import User from "../models/user.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import vendorShopInputValidation from "../validations/vendorShop.validation.js";
import { sendResponse } from "../utils/apiResponse.js";
//@desc Get VendorShop
//@rotute GET api/v1/vendorshop
//@access vendor

const getAllVendorShops = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const vendorShop = await VendorShop.findOne({ user: userId });

  await vendorShop.populate({
    path: "user",
  });

  if (!vendorShop) {
    throw new CustomError("VendorShop not found", 404);
  }

  sendResponse(res, "Vendor Shop retrived successfully", vendorShop, 200);
});

//@desc Post VendorShop
//@rotute POST api/v1/vendorshop
//@access vedor

const createVendorShop = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;
  console.log(userId);

  // Check if the user exist
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (user.role !== "vendor") {
    throw new CustomError("User is not a vendor", 400);
  }

  // validation
  const { error, value } = vendorShopInputValidation.validate(req.body, {
    abortEarly: true,
  });

  if (error) {
    throw new CustomError(
      error.details.map((d) => d.message),
      400,
    );
  }
  const vendorShop = await VendorShop.create({ user: userId, ...value });

  sendResponse(res, "Vendor Shop created successfully", vendorShop, 201);
});
//@desc Update VendorShop
//@rotute PATCH api/v1/vendorshop
//@access vendor

const updatedVendorShop = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const vendorShop = await VendorShop.findOneAndUpdate(
    { user: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!vendorShop) {
    throw new CustomError("VendorShop not found", 404);
  }

  sendResponse(res, "Vendor Shop Updated successfully", vendorShop, 200);
});
//@desc Delete VendorShop
//@rotute DELETE api/v1/vendorshop
//@access admin and vendor

const deleteVendorShop = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;

  await VendorShop.findOneAndDelete({ user: userId });

  sendResponse(res, "Vendor Shop Deleted successfully");
});
export {
  getAllVendorShops,
  createVendorShop,
  updatedVendorShop,
  deleteVendorShop,
};
