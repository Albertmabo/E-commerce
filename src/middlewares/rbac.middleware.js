import User from "../models/user.js";
import CustomError from "../utils/CustomError.js";

// const adminAccess = (req, res, next) => {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     throw new CustomError(
//       "You dont have the permisson for this operation",
//       401,
//     );
//   }
// };

// const vendorAccess = (req, res, next) => {
//   if (req.user.role === "vendor") {
//     next();
//   } else {
//     throw new CustomError(
//       "You dont have the permission for this operation",
//       401,
//     );
//   }
// };

// const userAccess = (req, res, next) => {
//   if (req.user.role === "user") {
//     next();
//   } else {
//     throw new CustomError(
//       "You dont have the permission for this operation",
//       401,
//     );
//   }
// };

// const access = (req, res, next) => {
//   if (req.user.role === "vendor" || req.user.role === "admin") {
//     next();
//   } else {
//     throw new CustomError(
//       "You dont have the permission for this operation",
//       401,
//     );
//   }
// };

// const userAndAdminAccess = (req, res, next) => {
//   if (req.user.role === "user" || req.user.role === "admin") {
//     next();
//   } else {
//     throw new CustomError(
//       "You dont have the permission for this operation",
//       401,
//     );
//   }
// };

// export { adminAccess, vendorAccess, userAccess, access, userAndAdminAccess };

const rbac = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(
        "You do not have permisson to perform this action",
        403,
      );
    }
    next();
  };
};

export default rbac;