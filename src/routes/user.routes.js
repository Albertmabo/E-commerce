import express from "express";

const router = express.Router();
import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";
import {getHistory} from "../controllers/purchaseHistory.controller.js"

router.route("/history").get(protect, userAccess, getHistory)

export default router