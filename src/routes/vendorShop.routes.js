import express from "express";
const router = express.Router();

import {
  getAllVendorShops,
  getVendorShop,
  updatedVendorShop,
  createVendorShop,
  deleteVendorShop,
} from "../controllers/vendorShop.controller.js";


import protect from "../middlewares/protect.middleware.js";
import { vendorAccess, access } from "../middlewares/rbac.middleware.js";

router.route("/").get(getAllVendorShops).post(protect, vendorAccess, createVendorShop);
router
  .route("/:id")
  .get(getVendorShop)
  .patch(protect, vendorAccess, updatedVendorShop)
  .delete(protect, access , deleteVendorShop);

export default router;
