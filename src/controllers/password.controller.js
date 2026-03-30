import User from "../models/user.js";
import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import passowordResetValidation from "../validations/passwordResetReqest.validation.js";
import sendEmail from "../utils/email.js";
import { sendResponse } from "../utils/apiResponse.js";
import crypto from "crypto";
import signToken from "../utils/signToken.js";

//@desc Create ForgetPassword
//@rotute POST api/v1/auth/forget-password
//@access Public

const forgetPassword = asyncErrorHandler(async (req, res) => {
  // input validation
  const { error, value } = passowordResetValidation.validate(req.body, {
    abortEarly: true,
  });
  if (error) {
    throw new CustomError("Invalid Email type", 400);
  }

  const { email } = value;

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("No user please sign-up", 404);
  }

  const resetToken = user.generateResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`;

  const message = `we have recieved password reset request.\nPlease use the provided link below to reset the password.\n\n${resetUrl}\nThis link is valid for 10 minutes\n\nPlese ignore if you have not requested\n\nThank you`;
  console.log(message);

  const subject = `Password reset Token`;

  try {
    await sendEmail({
      email: user.email,
      subject,
      message,
    });
    sendResponse(res, "Password reset successful");
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });

    throw new CustomError(
      "There was error sending password reset email. Please try again later",
      500,
    );
  }
});

//@desc reset password
//@rotute POST api/v1/auth/reset-password/:token
//@access Public
const resetPassword = asyncErrorHandler(async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    throw new CustomError(
      "No user found, please make password reset request again",
      404,
    );
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresAt = undefined;
  user.isPasswordChangedAt = Date.now();
  await user.save({ validateBeforeSave: true });

  const jwtToken = signToken(user._id);

  res.status(201).json({
    success: true,
    jwtToken,
  });
});

//@desc update Password for Authenticaed Users
//@rotute GET api/v1/auth/update-password
//@access Users

const updateAuthenticatedUserPassword = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePasswordInDb(
    req.body.oldPassword,
    user.password,
  );
  if (!isMatch) {
    throw new CustomError("Password did not match", 401);
  }
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmNewPassword;
  await user.save({ validateBeforeSave: true });

  sendResponse(res, "Password updated successful");
});
export { forgetPassword, resetPassword, updateAuthenticatedUserPassword };
