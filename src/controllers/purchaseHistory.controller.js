import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Payment from "../models/payment.js";
import CustomError from "../utils/CustomError.js";
import { sendResponse } from "../utils/apiResponse.js";

//@desc Get User purchse history
//@route GET api/v1/users/history
//@access User

const getHistory = asyncErrorHandler(async (req, res) => {
  const { id } = req.user;

  const history = await Payment.findOne({ user: id });

  if (!history) {
    throw new CustomError("No History found, Happy shopping", 400);
  }
  await history.populate({
    path: "order",
  });

  sendResponse(res, "History Retrieved successfully", history, 200);
});

export { getHistory };
