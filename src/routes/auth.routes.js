import express from "express";
const router = express.Router();
import rateLimiter from "../middlewares/rateLimiting.middleware.js";
import { signUpUser, logInUser } from "../controllers/auth.controller.js";

router.route("/signup").post(rateLimiter(6, 60 * 60 * 1000), signUpUser);
router.route("/login").post(rateLimiter(6, 60 * 60 * 1000), logInUser);

export default router;
