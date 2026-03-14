import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

//@desc create payment
//@route POST api/v1/payment
//@access user

const createPayment = asyncErrorHandler(async (req, res) => {
  const { id } = req.user;

  
  

  res.status(201).json({
    success: true,
    message: "Payment successful",
  });
});

export { createPayment };
