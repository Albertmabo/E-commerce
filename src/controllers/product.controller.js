import Product from "../models/product.js";

//@desc Get All Products
//@route GET api/v1/products
//@access Public

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      message: "Product retrived successfully",
      data: products,
      meta: {
        total: products.length,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//@desc Get Single Product
//@route GET api/v1/products/:id
//@access Public

const getSingleProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

//@desc Post Single Product
//@route POST api/v1/products
//@access Public

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

//@desc Patch Single Product
//@route PATCH api/v1/products/:id
//@access Public

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
        runValidation: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

//@desc Delete Single Product
//@route PATCH api/v1/products/:id
//@access Public

const deleteProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
