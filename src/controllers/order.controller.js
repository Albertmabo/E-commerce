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

  let product = items.map((values) => {
    return {
      productId: values.productId,
      quantity: values.quantity,
    };
  });

  let total = 0;

  for (let i = 0; i < product.length; i++) {
    let id = product[i].productId;

    let p = await Product.findById(id);

    if (p.discount) {
      let cost = p.price * product[i].quantity;
      total += cost - cost * (p.discount / 100);
    } else {
      total += p.price * product[i].quantity;
    }
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
    payment: req.body,
  });

  await order.populate({
    path: "user",
    select: "-role -dateOfBirth -createdAt -updatedAt -__v",
  });

  res.status(201).json({
    message: "order places successfully",
    order,
  });
});

//@desc create order
//@route GET api/v1/cart
//@access user
const getOrder = asyncErrorHandler(async (req, res) => {
  const order = await Order.findOne({ user: req.user.id });

  if (!order) {
    throw new CustomError("Order is empty, create order", 404);
  }
  res.status(200).json({
    success: true,
    message: "order retrived successfully",
    order,
  });
});

export { createOrder, getOrder };
