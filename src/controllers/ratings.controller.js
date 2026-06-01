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
  const { _id: userId } = req.user;
  const productId = req.params.id;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError("There is no product with this id", 404);
  }

  const isVerfied = await Payment.findOne({ user: userId }).populate({
    path: "order",
  });

  let exist = isVerfied.order.items.map((val) => {
    return val.productId;
  });

  let varifiedPurchase = exist.find((val) => {
    return val.toString() === productId.toString();
  });

  if (!isVerfied) {
    throw new CustomError("You have not purchesed this product yet", 404);
  }

  if (!varifiedPurchase) {
    throw new CustomError(
      "You are not a verifid Buyer, only veried buyer can leve review ",
      400,
    );
  }

  const review = await Ratings.create({
    user: userId,
    product: productId,
    rating: req.body.rating,
    review: req.body.review,
  });

  if (!product.ratings) {
    product.ratings = [];
  }

  product.ratings.push(rating._id);
  await product.save();

  sendResponse(res, "Product review successfully", review, 201);
});


//@desc GET All review
//@route post api/v1/ratings/
//@access Admin

const getAllRatings = asyncErrorHandler(async(req,res)=>{
  const review = await Ratings.find({});

  sendResponse(res,"Products Rating retrieved Successfully", review, 200)
})

//@desc GET all review a user left
//@route post api/v1/ratings/:id
//@access user

const getRating = asyncErrorHandler(async(req,res)=>{
  const { _id: userId } = req.user;
  const review = await Ratings.find({user:userId});

  sendResponse(res,"User Rating retrieved Successfully", review, 200)
})



export { rateProduct, getAllRatings, getRating};
