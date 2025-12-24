import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

export default router;
