import express from "express";
const router = express.Router();

import protect from "../middlewares/protect.middleware.js";
import { userAccess } from "../middlewares/rbac.middleware.js";
import {createPayment} from "../controllers/payment.controller.js"


router.route("/").post(protect, userAccess, createPayment).get((req,res)=>{
    res.json({
        messag: "Hello"
    })
})

export default router;