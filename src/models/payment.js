import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User must be asscociated with a Orders"],
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    transactionId: {
      type: String,
    },
    payment: {
      paymentType: {
        type: String,
        enum: ["COD", "MobileBanking"],
      },

      paymentStatus: {
        type: String,
        default: "PENDING",
        enum: ["PENDING", "SUCCESS", "FAILED"],
      },
    },
  },
  { timestamps: true },
);

paymentSchema.pre("save", function () {
  this.payment.paymentType === "MobileBanking"
    ? (this.payment.paymentStatus = "SUCCESS")
    : (this.payment.paymentStatus = "PENDING");
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
