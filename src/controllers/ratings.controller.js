import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Payment from "../models/payment.js";
import CustomError from "../utils/CustomError.js";
import Ratings from "../models/ratings.js";
import Product from "../models/product.js";

//@desc POST User review
//@route post api/v1/ratings/:id
//@access User

const rateProduct = asyncErrorHandler(async (req, res) => {
  const { id: user } = req.user;
  console.log(user);
  // only alow verfiled purchase to rate
  console.log(req.params.id);

  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError("There is no product with this id", 404);
  }

  const isVerfied = await Payment.findOne({ user });
  if (!isVerfied) {
    throw new CustomError("You have not purchesed this product yet", 404);
  }

  console.log(isVerfied);

  if (!isVerfied.payment.paymentSuccess) {
    throw new CustomError(
      "You are not a verifid Buyer, only veried buyer can leve review ",
      400,
    );
  }

  const rating = await Ratings.create({
    user,
    Product,
    rating: req.body.rating,
    review: req.body.review,
  });
  console.log(product.ratings);

  if (!product.ratings) {
    product.ratings = [];
  }

  product.ratings.push(rating._id);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Product review successfully",
    rating,
  });
});

export { rateProduct };
