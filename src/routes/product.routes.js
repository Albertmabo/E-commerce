import express from "express";
const router = express.Router();
import protect from "../middlewares/protect.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { rateProduct } from "../controllers/ratings.controller.js";

router
  .route("/")
  .get(getAllProducts)
  .post(protect, rbac("vendor"), createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(protect, rbac("vendor"), updateProduct)
  .delete(protect, rbac("vendor", "admin"), deleteProduct);

router.route("/ratings/:id").post(protect, rbac("user"), rateProduct);

export default router;
