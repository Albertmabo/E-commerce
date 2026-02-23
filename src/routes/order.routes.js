import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import { userAccess, userAndAdminAccess } from "../middlewares/rbac.middleware.js";

import { createOrder, getOrder } from "../controllers/order.controller.js";
router
    .route("/")
    .get(protect, userAccess, getOrder)
    .post(protect, userAndAdminAccess, createOrder);

export default router;
