import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { sendResponse } from "../utils/apiResponse.js";

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

  let productId = items.map((items) => {
    return items.productId;
  });

  const products = await Product.find({
    _id: { $in: productId },
  });

  const total = items.reduce((acc, item) => {
    const product = products.find(
      (p) => p._id.toString() === item.productId.toString(),
    );
    if (!product) return acc;

    const cost = product.price * item.quantity;
    return (
      acc + (product.discount ? cost - cost * (product.discount / 100) : cost)
    );
  }, 0);

  const order = await Order.create({
    user: userId,
    items,
    total,
    orderStatus: "Processing",
  });

  sendResponse(res, "Order placed successfully", order, 201);
});

//@desc create order
//@route GET api/v1/order
//@access user
const getOrders = asyncErrorHandler(async (req, res) => {
  const order = await Order.findOne({ user: req.user.id });

  if (!order) {
    throw new CustomError("Order is empty, create order", 404);
  }

  sendResponse(res, "Order retrived successfully", order, 200);
});

export { createOrder, getOrders };
