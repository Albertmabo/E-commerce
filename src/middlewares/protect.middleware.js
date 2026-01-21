import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = asyncErrorHandler(async (req, res, next) => {
  const testToken = req.headers.authorization;
  if (!testToken) throw new CustomError("You are not logged-in", 401);

  let token;

  if (testToken && testToken.startsWith("bearer")) {
    token = testToken.split(" ")[1];
  } else throw new CustomError("Token does not start with bearer");

  // token validation
  const decodedToken = jwt.verify(token, process.env.SECRET_STRING);

  // checking is user exist
  const user = await User.findById(decodedToken.id);
  if (!user) throw new CustomError("There is no user with this id in Database", 400);

  const time = user.passwordStatus(decodedToken.iat);
  if (time) throw new CustomError("Please re-login", 401);

  // passing user in req for RBAC
  req.user = user;

  next();
});

export default protect;
