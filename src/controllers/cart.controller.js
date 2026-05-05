import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import Cart from "../models/cart.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import { sendResponse } from "../utils/apiResponse.js";

//@desc create cart
//@route POST api/v1/cart
//@access user

const createCart = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const { items } = req.body;

  let productId = items.map((values) => {
    return values.productId;
  });

  const product = await Product.find({ _id: { $in: productId } });

  if (product.length === 0) {
    throw new CustomError("Product does not exist", 404);
  }

  let cart = await Cart.create({
    user: userId,
    items,
  });

  console.log(cart);

  sendResponse(res, "Cart created succssfully", cart, 200);
});

//@desc get cart
//@route GET api/v1/cart
//@access user

const getCart = asyncErrorHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new CustomError("Cart does not exist please make a cart", 404);
  }

  sendResponse(res, "Cart retrieved successfully", cart, 200);
});

//@desc Delete cart
//@route DELETE api/v1/cart
//@access user

const deleteCartItems = asyncErrorHandler(async (req, res) => {
  console.log("delete hit");
  const { id: productId } = req.params;

  const { _id: userId } = req.user;

  const findCart = await Cart.findOne({ user: userId });
  if (!findCart) {
    throw new CustomError("Cart does not exist", 404);
  }

  await Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        items: { productId: productId },
      },
    },
    {
      new: true,
    },
  );

  console.log(cart);
  sendResponse(res, "Cart deleted successfully");
});
//@desc Update cart
//@route PATCH api/v1/cart/:id
//@access user
const updateCart = asyncErrorHandler(async (req, res) => {
  console.log("patch hit");
  const { quantity } = req.body;
  const { id: productId } = req.params;

  const { _id: userId } = req.user;

  const findCart = await Cart.findOne({ user: userId });
  if (!findCart) {
    throw new CustomError("Cart does not exist", 404);
  }

  const checkCart = await Cart.findOne({ user: userId });
  if (!checkCart) {
    throw new CustomError("No cart found please create cart");
  }

  const cart = await Cart.findOneAndUpdate(
    { user: userId, "items.productId": productId },
    {
      $set: {
        "items.$.quantity": quantity,
      },
    },
    {
      new: true,
    },
  );

  console.log(cart);

  sendResponse(res, "Cart updated successfully", cart, 200);
});

export { createCart, getCart, deleteCartItems, updateCart };
