import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Payment from "../models/payment.js";
import CustomError from "../utils/CustomError.js";
import Cart from "../models/cart.js";
import User from "../models/user.js";
import Product from "../models/product.js";

//@desc Get User purchse history
//@route GET api/v1/users/history
//@access User

const getAllHistory = asyncErrorHandler(async (req, res) => {
  const { id } = req.user;

  const history = await Payment.find();

  res.status(200).json({
    success: true,
    history,
  });
});

export { getAllHistory };
