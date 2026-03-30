import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Payment from "../models/payment.js";
import CustomError from "../utils/CustomError.js";
import Ratings from "../models/ratings.js";
import Product from "../models/product.js";
import { sendResponse } from "../utils/apiResponse.js";

//@desc POST User review
//@route post api/v1/ratings/:id
//@access User

const rateProduct = asyncErrorHandler(async (req, res) => {
  const { id: user } = req.user;

  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError("There is no product with this id", 404);
  }

  const isVerfied = await Payment.findOne({ user });
  if (!isVerfied) {
    throw new CustomError("You have not purchesed this product yet", 404);
  }
  /*
  const isVerified = await Payment.findOne({ 
  user, 
  order: { $in: await Order.find({ "items.product": req.params.id }).select("_id") }
});
  */

  if (!isVerfied.payment.paymentSuccess) {
    throw new CustomError(
      "You are not a verifid Buyer, only veried buyer can leve review ",
      400,
    );
  }

  const rating = await Ratings.create({
    user,
    product,
    rating: req.body.rating,
    review: req.body.review,
  });
  

  if (!product.ratings) {
    product.ratings = [];
  }

  product.ratings.push(rating._id);
  await product.save();

  sendResponse(res, "Product review successfully", rating, 200);
});

export { rateProduct };
