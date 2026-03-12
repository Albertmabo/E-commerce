import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = asyncErrorHandler(async (req, res, next) => {
  let testToken = req.headers.authorization;
  if (!testToken) {
    throw new CustomError("Please login or sighup", 401);
  }

  if (testToken.startsWith("Bearer")) {
    testToken = testToken.split(" ")[1];
  } else throw new CustomError("Token does not start with bearer");

  const decodedToken = jwt.verify(testToken, process.env.SECRET_STR);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new CustomError("Please login or signup", 401);
  }

  if (user.isPasswordChanged(decodedToken.iat)) {
    throw new CustomError("Invalid passoword, Login again", 400);
  }

  req.user = user;

  next();
});

export default protect;
