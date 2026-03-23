import express from "express";
const router = express.Router();
import protect from "../middlewares/protect.middleware.js";
import {
  vendorAccess,
  access,
  userAccess,
} from "../middlewares/rbac.middleware.js";

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategory
} from "../controllers/product.controller.js";

import { rateProduct } from "../controllers/ratings.controller.js";

router
  .route("/")
  .get(getAllProducts)
  .post(protect, vendorAccess, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(protect, vendorAccess, updateProduct)
  .delete(protect, access, deleteProduct);


router.route("/ratings/:id").post(protect, userAccess, rateProduct);


router.route("/category/:field").get(getCategory)

export default router;
