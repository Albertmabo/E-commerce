import express from "express";
const router = express.Router();

import { sighUpUser } from "../controllers/auth.controller.js";

router.route("/signup").post(sighUpUser);

export default router;
