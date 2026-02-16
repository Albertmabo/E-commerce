
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
      min: [0, "Price cannot be less then zero"],
    },
    rating: {
      type: String,
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
      enum: ["Gaming", "Business", "Ultrabook", "2-in-1"],
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
      maxlength: [60, "Processor Name cannot be longer than 60 characters"],
      minlength: [4, "Processor Name must be greater than 3 characters"],
      required: [true, "Must provide the processor detail"],
    },
    ram: {
      size: {
        type: Number,
        required: [true, "Must provide ram size"],
        max: [99, "Ram size cannot be greater then 99 GB"],
        min: [1, "Ram size cannot be less then  then 1 GB"],
      },
      speed: {
        type: Number,
        required: [true, "Must provide ram speed"],
      },
      ramType: {
        trim: true,
        type: String,
        enum: ["DDR3", "DDR4", "DDR5"],
        required: [true, "Must Provide ram type"],
      },
    },
    storage: {
      storageType: {
        type: String,
        trim: true,
        enum: ["HDD", "SSD"],
        required: [true, "Must provide storage type"],
      },
      storageSize: {
        type: Number,
        min: [1, "Storage size should be at lest 1 GB"],
        max: [9999, "Storage size cannot be more then 9999 GB"],
        required: [true, "Must provide storage size"],
      },
    },
    display: {
      displayType: {
        type: String,
        trim: true,
        emum: ["IPS", "OLED", "LED"],
        required: [true, "Must provide display type"],
      },
      displaySize: {
        type: Number,
        min: [10, "The minimum display size must be 10 inch"],
        max: [20, "The maximum display size cannt be more then 20 inch"],
        required: [true, "Must provide display Size"],
      },
      displayResolution: {
        type: String,
        trim: true,
        enum: [
          "1366x768",
          "1920x1080",
          "2560x1440",
          "3840x2160",
          "2880x1800",
          "3072x1920",
        ],
        required: [true, "Must provide the display resolution"],
      },
    },
    graphicCard: {
      graphicCardBrand: {
        type: String,
        enum: ["Intel", "AMD", "NVDIA"],
        trim: true,
        required: [true, "Must Provide graphic card Brand"],
      },
      graphicVram: {
        type: Number,
        max: [99, "Graphic v ram cannot be more then 99 GB"],
        min: [1, "Graphic v ram cannot be less then 1 GB"],
        required: [true, "Must provide graph v ram"],
      },
      tgp: {
        type: Number,
        max: [200, "TGP cannot be greater then 200 Watts"],
        min: [20, "TGP cannot be less then 20 Watts"],
      },
      series: {
        type: String,
        trim: true,
        enum: [
          "RTX 50 Series",
          "RTX 40 Series",
          "RTX 30 Series",
          "RTX 20 Series",
          "Radeon RX 7000 Series",
          "Radeon RX 6000 Series",
          "Radeon RX 5000 Series",
          "Radeon RX Vega Series",
          "Intel Iris Xe",
          "Intel Arc A Series",
        ],
      },
    },
    battery: {
      capacity: {
        type: Number,
        required:[true, "Must provide battery capicity"],
        max:[120, "The maximum battery capacity is 120 Watt hour"],
        min:[20, "The minimum battery capaitcy is 20 watt hour"]
      }
    },
    weight: {
      type: Number,
      required: true,  
      max:[6, "Laptop cannot be more then 6 kg"],
      min:[1, "Laptop cannot be less then 1 kg"]
    },
    warranty: {
      type: Number,
      default: 1,
      min:[0, "Warrenty cannot be less then 0 year"],
      max:[3, "wattenty cannot be more then 3 year"],
      required: [true, "Must provide the warranty detail"],
    }, 
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: String,
    productImage: {
      type: String,
    },
    discount:{
      type:Number,
      max:[100, "Discount cannot be greater then 100 %"],
      min: [0, "Discount cannot be less then 0%"],
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
