import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  total: {
    type: Number,
    required: [true, "Total price cannot be empty"],
  },
  payment: {
    paymentType: {
      default: "COD",
      type: String,
      enum: ["COD", "MobileBanking"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
});

paymentSchema.pre("save", function () {
  if (this.payment.paymentType === "MobileBanking") {
    this.payment.paid = true;
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
