import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";

import { createCart, getCart , deleteCart} from "../controllers/cart.controller.js";
router
    .route("/")
    .get(protect, userAccess, getCart)
    .post(protect, userAccess, createCart)
    .delete(protect, userAccess, deleteCart);
export default router;
