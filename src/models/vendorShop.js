import mongoose from "mongoose";

const vendorShopSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shopName: {
      type: String,
      mixlength: [30, "Shop name cannot be more then 30 character"],
      minlength: [3, "Shop name cannot be less then 2 character"],
      required: [true, "Shop Name cannot be empty"],
      trim:true
    },
    address: {
      type: String,
      required: true,
    },
    shopRegistrationNumber: {
      type: String,
      required: true,
    },
    isVerified: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);


const VendorShop = mongoose.model("VendorShop", vendorShopSchema);
export default VendorShop;
