import Product from "../models/product.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import productInputValidation from "../validations/product.validation.js";

//@desc Get All Products
//@route GET api/v1/products
//@access Public

const getAllProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new CustomError(`There are not Products`, 404);
  }

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
    throw new CustomError(`No product found with id`, 404);
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
  const { error, value } = productInputValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(
      error.details.map((d) => d.message),
      400,
    );
  }

  const product = await Product.create({ ...value, createdBy: req.user._id });

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

  if (!product) {
    throw new CustomError(`No product found with id`, 404);
  }

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
