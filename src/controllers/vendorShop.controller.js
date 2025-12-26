import VendorShop from "../models/vendorShop.js";
import User from "../models/user.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"

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
  const {
    user: userId,
    shopName,
    address,
    ratings,
    shopRegistrationNumber,
    isVerified,
  } = req.body;
  // Check if the user exist
  const user = await User.findOne({ _id: userId });

  console.log(user);

  if (!user) {
    return res.status(404).json({
      error: "user not found",
    });
  }

  if (user.role !== "vendor") {
    return res.status(400).json({
      error: "User is not a vendor",
    });
  }

  const vendorShop = await VendorShop.create(req.body);

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
    data: null
  });
});
export {
  getAllVendorShops,
  getVendorShop,
  createVendorShop,
  updatedVendorShop,
  deleteVendorShop
};
