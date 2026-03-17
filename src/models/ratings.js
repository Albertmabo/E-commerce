import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  rating: {
    type: Number,
    validate: {
      validator: function (val) {
        return val >= 0 && val <= 5;
      },
      message:`Rating range is form 0 to 5`
    },
  },
  review:{
    type: String,
    mixlength: [500, "review cannot be more then 500 charcter"]
  }
});

const Ratings = new mongoose.model("Ratings", ratingSchema)

export default Ratings;