import User from "../models/user.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

//@desc sighup User
//@route POST api/v1/users/sighnup
//@access Public

const sighUpUser = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export { sighUpUser };
