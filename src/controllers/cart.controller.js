import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import Cart from "../models/cart.js";
import User from "../models/user.js";
import Product from "../models/product.js";

//@desc create cart
//@route POST api/v1/cart
//@access user

const createCart = asyncErrorHandler(async (req, res) => {
    const {_id: userId} = req.user;
    let user = await User.findById(userId);
    if (!user) {
        throw new CustomError("You are not not registed please signed in again");
    }

    const { items } = req.body;

    let productId = items.map((values) => {
        return values.productId;
    });

    for (let i = 0; i < productId.length ; i++) {
        let values = productId[i];
        let productExist = await Product.findById(values);
        if (!productExist) {
            throw new CustomError("Product does not exist", 404);
        }
    }

    // cart exist or not
    const checkCart = await Cart.findOne({ user: userId });
    let cart;

    if (!checkCart) {
        cart = await Cart.create({
            user: userId,
            items,
        });
    } else {
        cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items } },
            {
                new: true,
                runValidators: true,
            },
        );
    }

    res.status(200).json({
        success: true,
        data: {
            cart,
        },
    });
});

//@desc get cart
//@route GET api/v1/cart
//@access user

const getCart = asyncErrorHandler(async (req, res) => {
    const {_id: userId} = req.user;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new CustomError("Cart does not exist please make a cart", 404);
    }

    let cartItems = cart.items;
    let itemQuantity = cart.items.length;

    res.status(200).json({
        message: "Cart retrieved successfully",
        data: {
            cartItems,
        },
        meta: {
            noOfItems: itemQuantity,
        },
    });
});

//@desc Delete cart
//@route DELETE api/v1/cart
//@access user

const deleteCart = asyncErrorHandler(async (req, res) => {
    const {_id: userId} = req.user;

    // const cart = await Cart.findOne({ user: userId })
    const findCart = await Cart.findOne({ user: userId });
    if (!findCart) {
        throw new CustomError("Cart does not exist", 404);
    }

    const cart = await Cart.findByIdAndDelete(findCart._id);

    res.status(200).json({
        success: true,
        message: "Cart deleted successfully",
    });
});

export { createCart, getCart, deleteCart };
