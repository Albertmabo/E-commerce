import express from "express";
const router = express.Router();

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
