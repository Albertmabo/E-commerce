import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import Order from "../models/order.js";
import Payment from "../models/payment.js";
import { sendResponse } from "../utils/apiResponse.js";
//@desc create payment
//@route POST api/v1/payment/:id
//@access user

const createPayment = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const { id: orderId } = req.params;
  console.log(orderId);

  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new CustomError("No order found", 404);
  }

  const { transactionId } = req.body;
  let pay;
  if (transactionId) {
    // Mock In production, this would call Fonepay's verification API
    let tid = "FONEPAY_TXN_1748765432";
    if (!transactionId === tid) {
      throw new CustomError("invaid transactionId", 400);
    }
    pay = await Payment.create({
      user: userId,
      order: orderId,
      transactionId,
      payment: {
        paymentType: "MobileBanking",
      },
    });
  } else {
    pay = await Payment.create({
      user: userId,
      order: orderId,
      payment: {
        paymentType: "COD",
      },
    });
  }

  sendResponse(res, "Payment successful", pay, 201);
});

//@desc get payment details
//@route POST api/v1/payment/:id
//@access user, vendor, admin

const getPayment = asyncErrorHandler(async (req, res) => {
  const { id: paymentId } = req.params;

  const pay = await Payment.findOne({ _id: paymentId }).populate({
    path: "order",
    populate: {
      path: "items.productId",
    },
  });

  if (!pay) {
    throw CustomError("No payment found", 404);
  }

  sendResponse(res, "successful retrived", pay, 200);
});

export { createPayment, getPayment };
