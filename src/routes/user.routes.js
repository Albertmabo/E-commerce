import express from "express";

const router = express.Router();
import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";
import {getAllHistory} from "../controllers/purchaseHistory.controller.js"

router.route("/history").get(protect, userAccess, getAllHistory)

export default router