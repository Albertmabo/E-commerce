import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First Name cannot be be less then 3"],
      maxlength: [20, "First Name cannot be greater then 20 character"],
    },
    middleName: {
      type: String,
      minlength: [3, "Middle Name cannot be be less then 3"],
      maxlength: [20, "Middle Name cannot be greater then 20 character"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last Name cannot be be less then 3"],
      maxlength: [20, "Last Name cannot be greater then 20 character"],
    },
    email: {
      type: String,
      required: [true, "E-mail cannot be empty"],
      unique: true,
    },
    phoneNo: {
      type: String,
      required: [true, "Phone No cannot be empty"],
    },

    role: {
      type: String,
      enum: ["admin", "user", "vendor"],
      default: "user",
      required: true,
    },

    address: {
      type: String,
      required: [true, "Address cannot be empty"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth cannot be empty"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please enter Confirm password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and confirm password should be same",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

const User = mongoose.model("User", userSchema);
export default User;
