import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";

import { createOrder, getOrder } from "../controllers/order.controller.js";
router
    .route("/")
    .get(protect, userAccess, getOrder)
    .post(protect, userAccess, createOrder);

export default router;
