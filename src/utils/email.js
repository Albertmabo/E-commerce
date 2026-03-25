import { Resend } from "resend";
import asyncErrorHandler from "./asyncErrorHandler.js";
import CustomError from "./CustomError.js";

const sendEmail = asyncErrorHandler(async (options) => {
  const resend = new Resend(process.env.EMAIL_API);

  const emailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const { data, error } = await resend.emails.send(emailOptions);
  if (error) {
    throw new CustomError("Filed to send resend-email", 500);
  }
  console.log("Email sent successfully!");
  console.log("Email ID:", data?.id);
});

export default sendEmail;
