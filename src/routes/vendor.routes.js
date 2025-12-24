import express from "express";
const router = express.Router();

import {
  getAllVendorShops,
  getVendorShop,
  updatedVendorShop,
  createVendorShop,
  deleteVendorShop,
} from "../controllers/vendor.controller.js";

router.route("/").get(getAllVendorShops).post(createVendorShop);
router
  .route("/:id")
  .get(getVendorShop)
  .patch(updatedVendorShop)
  .delete(deleteVendorShop);

export default router;
