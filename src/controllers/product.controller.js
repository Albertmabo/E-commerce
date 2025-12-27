import Product from "../models/product.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import Joi from "joi";

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
  const productInputValidation = Joi.object({
    name: Joi.string().trim().required().max(60).min(4).messages({
      "string.base": "Product Name must be String",
      "string.empty": "Product name cannot be empty",
      "any.required": "Product name is required",
      "string.max": "Product name cannot be greater then 60 character",
      "string.min": "Product name cannot be less then 4 charcter",
    }),

    price: Joi.number().required().min(0).precision(2).messages({
      "any.required": "Price is required",
      "number.base": "Price must be Number",
      "number.min": "Price cannot be negative",
      "number.precision": "Price can have at most 2 decimal place",
    }),

    rating: Joi.string().optional(),

    os: Joi.string()
      .valid("Windows", "Mac", "Linux")
      .trim()
      .required()
      .messages({
        "string.base": "os must be a string",
        "any.required": "os is required",
        "string.empty": "os cannot be empty",
        "any.only": "os must be one of the allowed os",
      }),

    brand: Joi.string()
      .valid(
        "Acer",
        "Apple",
        "ASUS",
        "Dell",
        "Lenovo",
        "HP",
        "MSI",
        "Razer",
        "Microsoft"
      )
      .required()
      .messages({
        "string.base": "brand must be string",
        "any.required": "brand is required",
        "string.empty": "brand cannot be empty",
        "any.only": "brand must be one of the allowed brand",
      }),

    type: Joi.string()
      .valid("Entry Level", "Mid Range", "High End")
      .trim()
      .required()
      .messages({
        "string.base": "type must be a string",
        "any.required": "type is required",
        "string.empty": "type cannot be empty",
        "any.only": "type must me one of the allowed type",
      }),

    category: Joi.string()
      .valid("Gaming", "Business", "Ultrabook", "2-in-1")
      .trim()
      .required()
      .messages({
        "string.base": "category must be string",
        "any.required": "category is required",
        "string.empty": "category cannot be empty",
        "any.only": "categoty must me one of the allowed categoty",
      }),

    inStock: Joi.boolean().default(false),

    processor: Joi.string().trim().required().max(60).min(4).messages({
      "string.base": "Processor name must be string",
      "any.required": "Processor name i required",
      "string.empty": "Processor name cannot be empty",
      "string.max": "Processor name cannot be greater then 60 characters",
      "string.min": "Processor name cannot be less then 3 character",
    }),

    ram: Joi.object({
      size: Joi.number().required().integer().max(99).min(1).messages({
        "any.required": "Size is required",
        "number.integer": "Storage size must be a integer",
        "number.base": "Size must be a number",
        "number.min": "Size cannot be less then 1",
        "number.max": "Size cannot be greater then 99",
      }),
      speed: Joi.number().required().messages({
        "any.required": "Ram speed is required",
        "number.base": "Ram spped must be a number",
      }),
      ramType: Joi.string()
        .trim()
        .valid("DDR3", "DDR4", "DDR5")
        .required()
        .messages({
          "any.only": "Ram type must be one of the allowed ",
          "string.base": "Ram type should be string",
          "any.required": "Ram type is required",
          "string.empty": "Ram type cannot be empty",
        }),
    }),

    storage: Joi.object({
      storageType: Joi.string().valid("HDD", "SSD").required().trim().messages({
        "string.base": "Storge type must be string",
        "any.required": "Storage type is required",
        "string.empty": "Storage type cannot be empty",
        "any.only": "Storage type must be one of the valid values",
      }),
      storageSize: Joi.number().required().integer().max(9999).min(1).messages({
        "number.base": "Storage size must be a number",
        "number.integer": "Storage size must be a integer",
        "number.required": "Storage size is required",
        "number.max": "Storage size cannot be greater then 9999 GB",
        "number.min": "Storage size cannot be less then 1 GB",
      }),
    }),

    display: Joi.object({
      displayType: Joi.string()
        .trim()
        .valid("IPS", "OLED", "LED")
        .required()
        .messages({
          "any.required": "Display type is required",
          "string.base": "Display type should string",
          "string.empty": "Display type cannot be empty",
          "any.only": "Display type should be among the allowed type",
        }),
      displaySize: Joi.number().required().max(20).min(10).messages({
        "number.base": "Display size can only be number",
        "any.required": "Display size is required",
        "number.max": "Display size cannot be greater then 20 inch",
        "number.min": "Display size cannot be less then 10 inch",
      }),
      displayResolution: Joi.string()
        .trim()
        .valid(
          "1366x768",
          "1920x1080",
          "2560x1440",
          "3840x2160",
          "2880x1800",
          "3072x1920"
        )
        .required()
        .messages({
          "string.base": "Disaply resolution must be string",
          "string.empty": "Display resolution cannot be empty",
          "any.required": "Display resolution is required",
          "any.only": "Display resolution must be among allowrd",
        }),
    }),

    graphicCard: Joi.object({
      graphicCardBrand: Joi.string()
        .trim()
        .valid("Intel", "AMD", "NVDIA")
        .required()
        .messages({
          "string.base": "Graphic card  brand must be string",
          "string.empty": "Grapihc card  brand cannot be empty",
          "any.required": "Graphic card brand is required",
          "any.only": "Graphic card must be among the allowed",
        }),
      graphicVram: Joi.number().required().max(99).min(1).messages({
        "number.base": "Graphic V ram must be a number",
        "any.required": "Graphic V ram is required",
        "number.max": "Graphic V ram cannot be more then 99 GB",
        "number.min": "Graphic V ram cannot be less 1 GB",
      }),
      tgp: Joi.number().optional().max(200).min(20).messages({
        "number.base": "TGP must be a number",
        "number.max": "TGP cannot be greater then 200 Watts",
        "number.min": "TGP cannot be less 20 Watts",
      }),
      series: Joi.string()
        .optional()
        .trim()
        .valid(
          "RTX 50 Series",
          "RTX 40 Series",
          "RTX 30 Series",
          "RTX 20 Series",
          "Radeon RX 7000 Series",
          "Radeon RX 6000 Series",
          "Radeon RX 5000 Series",
          "Radeon RX Vega Series",
          "Intel Iris Xe",
          "Intel Arc A Series"
        )
        .messages({
          "string.base": "Graphic series must be in string",
          "any.only": "Graphic series must abe among the allowed",
        }),
    }),

    battery: Joi.object({
      capacity: Joi.number().integer().required().max(120).min(20).messages({
        "number.base": "Battery capacity must be number",
        "any.required": "Battery capacity is required",
        "number.integer": "Battery capacity must be interger",
        "number.max": "Battery capicity cannot be greater then 120 Watt hour",
        "number.min": "Battery capicity cannot be less then 20 Watt hour ",
      }),
    }),

    weight: Joi.number().required().max(6).min(1).precision(1).messages({
      "number.base": "weight should be in number",
      "any.required": "weight is required",
      "number.max": "weight cannot be greater then 6 kg",
      "number.min": "weight cannot be less then 1 kg",
    }),

    warranty: Joi.number()
      .required()
      .max(3)
      .min(0)
      .precision(1)
      .default(1)
      .messages({
        "number.base": "warranty should be in number",
        "any.required": "warranty is required",
        "number.max": "warranty cannot be greater then 3 year",
        "number.min": "warranty cannot be less then 0 year",
      }),
    featured: Joi.boolean().default(false),
    createdBy: Joi.string().trim().optional(),
    productImage: Joi.string().optional(),
  });

  // validaiton
  const { error, value } = productInputValidation.validate(req.body, {
    abortEarly: true,
  });

  if (error) {
    throw new CustomError(error.details.map((d) => d.messages).join(", "), 400);
  }

  const product = await Product.create(value);

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
