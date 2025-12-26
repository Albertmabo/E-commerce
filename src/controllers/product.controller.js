import Product from "../models/product.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

//@desc Get All Products
//@route GET api/v1/products
//@access Public

const getAllProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    message: "Product retrived successfully",
    data: products,
    meta: {
      total: products.length,
    },
  });
});

//@desc Get Single Product
//@route GET api/v1/products/:id
//@access Public

const getSingleProduct = asyncErrorHandler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    // TODO: Replace console log with centralized error handling middleware
    console.log(`No product found with id: ${productId}`);
  }

  res.status(200).json({
    success: true,
    message: "Product retrived successfully",
    data: product,
  });
});

//@desc Post Single Product
//@route POST api/v1/products
//@access Public

const createProduct = asyncErrorHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

//@desc Patch Single Product
//@route PATCH api/v1/products/:id
//@access Public

const updateProduct = asyncErrorHandler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidation: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

//@desc Delete Single Product
//@route PATCH api/v1/products/:id
//@access Public

const deleteProduct = asyncErrorHandler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndDelete(productId);

  if (!product) {
    // TODO: Replace console log with centralized error handling middleware
    console.log(`No product found with id: ${productId}`);
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
