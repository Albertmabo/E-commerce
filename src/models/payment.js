import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
 
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  payment: {
    paymentType: {
      default: "COD",
      type: String,
      enum: ["COD", "MobileBanking"],
    },
    paymentSuccess: {
      type: Boolean,
      default: false,
    },
  },
});

paymentSchema.pre("save", function () {
  if (this.payment.paymentType === "MobileBanking") {
    this.payment.paymentSuccess = true;
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
