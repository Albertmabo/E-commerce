import mongoose from "mongoose";

const vendorShopSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shopName: {
      type: String,
      mixlength: [30, "Shop name cannot be more then 30"],
      minlength: [3, "Shop name cannot be less then 2"],
      required: [true, "Shop Name cannot be empty"],
      trim:true
    },
    address: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
    },
    shopRegistrationNumber: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const VendorShop = mongoose.model("VendorShop", vendorShopSchema);
export default VendorShop;
