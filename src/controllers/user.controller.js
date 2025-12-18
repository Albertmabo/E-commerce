import User from "../models/user.js";

//@desc Get All Users
//@route GET api/v1/users
//@access Public

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    message: "User retrived successfully",
    data: users,
    meta: {
      total: users.length,
    },
  });
};

//@desc Get Singe User
//@route GET api/v1/users/:id
//@access Public

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne(userId);
  res.status(200).json({
    success: true,
    message: "User retrived successfully",
    data: user,
  });
};

//@desc Create User
//@route POST api/v1/users/:id
//@access Public

const createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

//@desc Update User
//@route PATCH api/v1/users/:id
//@access Public

const updateUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidation: true,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

//@desc Delete User
//@route Delete api/v1/users/:id
//@access Public

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await user.findOneAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

export { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
