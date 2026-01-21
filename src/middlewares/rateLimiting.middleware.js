import rateLimit from "express-rate-limit";

const rateLimiter = (max, windowMs) =>
  rateLimit({
    max,
    windowMs,
    message: {
      error: "Too many requests, please try again later.",
    },
    statusCode: 429,
  });

export default rateLimiter;
