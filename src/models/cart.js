
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User must be asscociated with a cart"]
    },
    item: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Please provide the product for the cart"]
            },
            quantity: {
                type: Number,
                required: [true, "Please provide the product quantity"],
                validate: {
                    validator: function (value) {
                        return value > 0;
                    },
                    message: "Product quantity cannot be Zero or less then 0"
                }
            }
        }
    ]
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;