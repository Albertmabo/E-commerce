import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be asscociated with a Orders"],
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide the product for the order"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
        validate: {
          validator: function (value) {
            return value > 0;
          },
          message: "Product quantity cannot be Zero or less then 0",
        },
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "Total price cannot be empty"],
  },

  orderStatus: {
    type: String,
    default: "Processing",
    required: [true, "Must provide order status "],
    enum: ["Processing", "Shipped", "Delivered"],
  },
});



const Order = mongoose.model("Order", orderSchema);
export default Order;
