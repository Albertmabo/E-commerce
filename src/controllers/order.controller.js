import mongoose from "mongoose";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

//@desc create order
//@route POST api/v1/order
//@access user
const createOrder = asyncErrorHandler(async (req, res) => {
  console.log(req.body);
  
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("You are not not registed please signed in again");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new CustomError(
      "Please create a cart, cart does not for this user",
      404,
    );
  }

  const { items } = cart;

  let productId = items.map((values) => {
    return values.productId;
  });

  let totalquantity = items.map((values) => {
    return values.quantity;
  });

  
  let total = 0;

  for (let i = 0; i < productId.length; i++) {
    let id = productId[i];
    let p = await Product.findById(id);
    total += p.price * totalquantity[i];
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
    payment: req.body
  });

  res.status(200).json({
    message: "order places successfully",
    order,
   
  });
});

//@desc create order
//@route GET api/v1/cart
//@access user
const getOrder = asyncErrorHandler(async (req, res) => { });

export { createOrder, getOrder };
