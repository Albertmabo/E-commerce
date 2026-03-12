import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign(
    {
      id
    },
    process.env.SECRET_STRING,
    { expiresIn: process.env.LOGIN_EXPIRES },
  );
};

export default signToken;
