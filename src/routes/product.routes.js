import express from "express";
const router = express.Router();
import protect from "../middlewares/protect.middleware.js";

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

router.route("/").get(protect, getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
