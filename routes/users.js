import express from "express";
import { verifyUser, verifyToken } from "../utils/verifyToken.js";
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

//Get authenticated user
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("You are logged in");
});

//Get authenticated user
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("You are logged in and you can delete your account");
});

//GET ALL
router.get("/", getAllUser);

export default router;
