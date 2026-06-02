import express from "express";
const router = express.Router();

import {
  getAllVendorShops,
  updatedVendorShop,
  createVendorShop,
  deleteVendorShop,
} from "../controllers/vendorShop.controller.js";

import protect from "../middlewares/protect.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";

router
  .route("/")
  .get(protect, rbac("vendor", "admin"), getAllVendorShops)
  .post(protect, rbac("vendor"), createVendorShop)
  .patch(protect, rbac("vendor"), updatedVendorShop)
  .delete(protect, rbac("vendor", "admin"), deleteVendorShop);

export default router;
