import express from "express";
const router = express.Router();
import rateLimiter from "../middlewares/rateLimiting.middleware.js";
import { signUpUser, logInUser } from "../controllers/auth.controller.js";
import {forgetPassword, resetPassword, updateAuthenticatedUserPassword} from "../controllers/password.controller.js"

import protect from "../middlewares/protect.middleware.js";

router.route("/signup").post(rateLimiter(6, 60 * 60 * 1000), signUpUser);
router.route("/login").post(rateLimiter(6, 60 * 60 * 1000), logInUser);

// password reset
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password/:token').post(resetPassword);
router.route('/update-password').post(protect, updateAuthenticatedUserPassword);

export default router;
