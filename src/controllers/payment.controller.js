import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";

import Cart from "../models/cart.js";
import Order from "../models/order.js";

import Payment from "../models/payment.js";
import { sendResponse } from "../utils/apiResponse.js";
//@desc create payment
//@route POST api/v1/payment
//@access user

const createPayment = asyncErrorHandler(async (req, res) => {
  const { id } = req.user;
  const { payment } = req.body || {};

  const order = await Order.findOne({ user: id });
  if (!order) {
    throw new CustomError("No order", 404);
  }

  const pay = await Payment.create({
    user: order.user,
    order: order._id,
    payment,
    date: Date.now(),
  }).populate({
    path: "order",
  });

  let onSuccess =
    pay.payment.paymentSuccess && pay.order.orderStatus === "Delivered";

  if (onSuccess) {
    await Cart.findOneAndDelete({ user: id });
  }

  sendResponse(res, "Payment successful", pay, 201);
});

export { createPayment };
