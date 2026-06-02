import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import {
  rateProduct,
  getAllRatings,
  getRating,
} from "../controllers/ratings.controller.js";

router.route("/").get(getAllRatings);
router
  .route("/:id")
  .post(protect, rbac("user"), rateProduct)
  .get(protect, rbac("user"), getRating);
export default router;
