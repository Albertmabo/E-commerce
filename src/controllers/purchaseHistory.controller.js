import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Payment from "../models/payment.js";
import CustomError from "../utils/CustomError.js";


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
  res.status(200).json({
    success: true,
    history,
  });
});

export { getHistory };
