import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);

//UPDATE
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//GET

router.get("/:id", getUser);

//GET ALL

router.get("/", getAllUser);

export default router;
