import express from "express";
const router = express.Router();
import protect from "../middlewares/protect.middleware.js";
import { vendorAccess, access } from "../middlewares/rbac.middleware.js";

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

router.route("/").get(getAllProducts).post(protect, vendorAccess, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(protect, vendorAccess, updateProduct)
  .delete(protect, access, deleteProduct);

export default router;
