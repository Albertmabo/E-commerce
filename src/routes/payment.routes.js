import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import {
  createPayment,
  getPayment,
} from "../controllers/payment.controller.js";

router
  .route("/:id")
  .post(protect, rbac("user"), createPayment)
  .get(protect, rbac("user"), getPayment);

export default router;
