import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";

import { createOrder, getOrders } from "../controllers/order.controller.js";
router
  .route("/")
  .get(protect, rbac("user"), getOrders)
  .post(protect, rbac("user", "admin"), createOrder);

export default router;
