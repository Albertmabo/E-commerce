import jwt from "jsonwebtoken";

const signToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.SECRET_STRING,
    { expiresIn: process.env.LOGIN_EXPIRES }
  );
};

export default signToken;