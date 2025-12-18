import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Must provide name"],
      maxlength: [60, "Name cannot be longer than 60 characters"],
      minlength: [4, "Name must be greater than 3 characters"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Must provide price"],
    },
    rating: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 1 && value <= 5;
        },
        message: "Rating ({VALUE}) should be above 1 and between 5",
      }
      
    },
    os: {
      type: String,
      trim: true,
      enum: ["Windows", "Mac", "Linux"],
      required: [true, "Must provide OS"],
    },
    brand: {
      type: String,
      enum: [
        "Acer",
        "Apple",
        "ASUS",
        "Dell",
        "Lenovo",
        "HP",
        "MSI",
        "Razer",
        "Microsoft",
      ],
      required: [true, "Must provide the brand name"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Entry Level", "Mid Range", "High End"],
      required: [true, "Must provide the type"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    processor: {
      type: String,
      trim: true,
      required: [true, "Must provide the processor detail"],
    },
    ram: {
      type: Number,
      required: [true, "Must provide the RAM size"],
    },
    storage: {
      type: Number,
      required: [true, "Must provide the storage detail"],
    },
    display: {
      type: Number,
    },
    graphic: {
      type: String,
      trim: true,
      required: [true, "Must provide the graphic detail"],
    },
    graphicVram: {
      type: Number,
      required: [true, "Must provide the graphic detail"],
    },
    battery: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    warranty: {
      type: String,
      default: "1 Year warranty",
      trim: true,
      required: [true, "Must provide the warranty detail"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: String,
    productImage:{
        type: String
    }
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);
export default Product;
