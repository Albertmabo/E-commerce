import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";

import {
  createCart,
  getCart,
  deleteCartItems,
  updateCart,
} from "../controllers/cart.controller.js";
router
  .route("/")
  .get(protect, userAccess, getCart)
  .post(protect, userAccess, createCart);

router
  .route("/:id")
  .patch(protect, userAccess, updateCart)
  .delete(protect, userAccess, deleteCartItems);
export default router;
