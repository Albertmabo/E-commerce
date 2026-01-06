import express from "express";
const router = express.Router();

import { signUpUser, logInUser} from "../controllers/auth.controller.js";

router.route("/signup").post(signUpUser);
router.route("/login").post(logInUser)

export default router;
