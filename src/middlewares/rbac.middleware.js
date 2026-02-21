import CustomError from "../utils/CustomError.js";

const adminAccess = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    throw new CustomError(
      "You dont have the permisson for this operation",
      401,
    );
  }
};

const vendorAccess = (req, res, next) => {
  if (req.user.role === "vendor") {
    next();
  } else {
    throw new CustomError(
      "You dont have the permission for this operation",
      401,
    );
  }
};




const userAccess = (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    throw new CustomError(
      "You dont have the permission for this operation",
      401,
    );
  }
};

const access = (req, res, next) => {
  console.log(req.user.role);
  console.log(req.user.role === "vendor");

  if (req.user.role === "vendor" || req.user.role === "admin") {
    next();
  } else {
    throw new CustomError(
      "You dont have the permission for this operation",
      401,
    );
  }
};

export { adminAccess, vendorAccess, userAccess, access };
