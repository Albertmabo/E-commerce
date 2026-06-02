import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";
import { createPayment , getPayment} from "../controllers/payment.controller.js";

router
  .route("/:id")
  .post(protect, userAccess, createPayment)
  .get(protect, userAccess, getPayment);

export default router;
