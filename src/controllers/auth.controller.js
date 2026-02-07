import User from "../models/user.js";
import signToken from "../utils/signToken.js";
import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

//@desc sighup User
//@route POST api/v1/users/sighnup
//@access Public

const signUpUser = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);
  if (!user) {
    throw new CustomError("Fail to sign-up user", 400);
  }
  const token = signToken(user._id, user.role);

  res.cookie("jwt", token, {
    maxAge: 30 * 60 * 1000,
    secure: false,
    httpOnly: true,
  });
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      user
    }
  });
});

//@desc login User
//@route POST api/v1/users/login
//@access Public

const logInUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Please provide email and password", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePasswordInDb(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid email or password", 401);
  }

  const token = signToken(user._id, user.role);
  res.cookie("jwt", token, {
    maxAge: 30 * 60 * 1000,
    secure:false,
    httpOnly: true
  })
  user.password = undefined;



  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user
    }
  });
});

export { signUpUser, logInUser };
