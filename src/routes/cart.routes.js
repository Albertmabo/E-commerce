import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import {userAccess} from "../middlewares/rbac.middleware.js";

router.route("/").get().post();

export default router;