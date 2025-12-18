import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: [3, "First Name cannot be be less then 3"],
    max: [20, "First Name cannot be greater then 20 character"],
  },
  middleName: {
    type: String,
    min: [3, "Middle Name cannot be be less then 3"],
    max: [20, "Middle Name cannot be greater then 20 character"],
  },
  lastName: {
    type: String,
    required: true,
    min: [3, "Middle Name cannot be be less then 3"],
    max: [20, "Middle Name cannot be greater then 20 character"],
  },
  email: {
    type: String,
    required: [true, "E-mail cannot be empty"],
  },
  phoneNo: {
    type: String,
    required: [true, "Phone No cannot be empty"],
  },
  address: {
    type: String,
    required: [true, "Address cannot be empty"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth cannot be empty"],
  },
});


const User = mongoose.model("User",userSchema );
export default User;``