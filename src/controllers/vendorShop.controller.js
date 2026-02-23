import VendorShop from "../models/vendorShop.js";
import User from "../models/user.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import vendorShopInputValidation from "../validations/vendorShop.validation.js";
//@desc Get VendorShop
//@rotute GET api/v1/vendorshop
//@access public

const getAllVendorShops = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const vendorShop = await VendorShop.findOne({ user: userId });

  await vendorShop.populate({
    path: "user",
  });

  if (!vendorShop) {
    throw new CustomError("VendorShop not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Vendor Shop retrived successfully",
    data: vendorShop,
  });
});

//@desc Get sinble VendorShop
//@rotute GET api/v1/vendorshop/:id
//@access public

const getVendorShop = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const vendorShop = await VendorShop.findById(userId);

  await vendorShop.populate({
    path: "user",
  });

  if (!vendorShop) {
    throw new CustomError("VendorShop not found", 404);
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
  const { _id: userId } = req.user;

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
    throw new CustomError(error.details.map((d) => d.message).join(", "), 400);
  }
  const vendorShop = await VendorShop.create({ user: userId, ...value });

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
  const { _id: userId } = req.user;

   await VendorShop.findOneAndDelete({ user: userId });

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
