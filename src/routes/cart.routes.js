import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
// "admin", "user", "vendor"
import {
  createCart,
  getCart,
  deleteCartItems,
  updateCart,
} from "../controllers/cart.controller.js";
router
  .route("/")
  .get(protect, rbac("user"), getCart)
  .post(protect, rbac("user"), createCart);

router
  .route("/:id")
  .patch(protect, rbac("user"), updateCart)
  .delete(protect, rbac("user"), deleteCartItems);
export default router;
