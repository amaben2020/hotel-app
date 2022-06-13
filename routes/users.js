import express from "express";
import { verifyUser, verifyToken, verifyAdmin } from "../utils/verifyToken.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

//Get authenticated user

//has to be the first, ensures the user has a valid token and cookie
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("You are logged in");
// });

// //check for token to ensure that user can delete its account
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("You are logged in and you can delete your account");
// });

// // check for token to ensure that user is admin
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin you can delete all accounts");
// });

router.post("/", createUser);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router;
