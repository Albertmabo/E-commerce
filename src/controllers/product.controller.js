import Product from "../models/product.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import productInputValidation from "../validations/product.validation.js";
import VendorShop from "../models/vendorShop.js";
import { sendResponse } from "../utils/apiResponse.js";
//@desc Get All Products
//@route GET api/v1/products
//@access Public

const getAllProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new CustomError(`There are not Products`, 404);
  }

  sendResponse(
    res,
    "Product retrived successfully",
    products,
    200,
    products.length,
  );
});

//@desc Get Single Product
//@route GET api/v1/products/:id
//@access Public

const getSingleProduct = asyncErrorHandler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError(`No product found with id`, 404);
  }
  await product.populate({
    path: "soldBy",
  });

  await product.populate({
    path: "ratings",
  });

  sendResponse(res, "Product retrived successfully", product, 200);
});

//@desc Post Single Product
//@route POST api/v1/products
//@access Public

const createProduct = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { error, value } = productInputValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(
      error.details.map((d) => d.message),
      400,
    );
  }

  const vendorShop = await VendorShop.findOne({ user: userId });
  console.log("Vednor shop", vendorShop);

  const product = await Product.create({
    ...value,
    soldBy: vendorShop._id,
  });

  sendResponse(res, "Product created successfully", product, 201);
});

//@desc Patch Single Product
//@route PATCH api/v1/products/:id
//@access Public

const updateProduct = asyncErrorHandler(async (req, res) => {
  const { id: productId } = req.params;

  const productExist = await Product.findById(productId);
  if (!productExist) {
    throw new CustomError("No product found with id", 404);
  }

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  sendResponse(res, "Product updated successfully", product, 200);
});

//@desc Delete Single Product
//@route PATCH api/v1/products/:id
//@access Public

const deleteProduct = asyncErrorHandler(async (req, res) => {
  const { id: productId } = req.params;
  await Product.findOneAndDelete(productId);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });

  sendResponse(res, "Product deleted successfully");
});

const getCategory = asyncErrorHandler(async (req, res) => {
  const { field } = req.params;
  console.log(field);

  const product = await Product.find({ category: field });

  console.log(product);
});

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategory,
};
