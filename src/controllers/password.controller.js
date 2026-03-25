import User from "../models/user.js";
import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import passowordResetValidation from "../validations/passwordResetReqest.validation.js";
import sendEmail from "../utils/email.js";
import { sendResponse } from "../utils/apiResponse.js";

//@desc Create ForgetPassword
//@rotute GET api/v1/auth/forget-password
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

export { forgetPassword };
