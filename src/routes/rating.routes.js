
import express from "express"
const router = express.Router();


import protect from "../middlewares/protect.middleware.js";
import { userAccess, userAndAdminAccess } from "../middlewares/rbac.middleware.js";
import { rateProduct, getAllRatings, getRating} from "../controllers/ratings.controller.js"

router.route("/").get(getAllRatings)
router.route("/:id").post(protect,userAccess, rateProduct ).get(protect,userAccess, getRating)
export default router;
