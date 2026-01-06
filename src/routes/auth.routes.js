import express from "express";
const router = express.Router();

import { signUpUser} from "../controllers/auth.controller.js";

router.route("/signup").post(signUpUser);


export default router;
