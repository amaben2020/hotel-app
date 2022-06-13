import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//GET

router.get("/:id", getHotel);

//GET ALL

router.get("/", getAllHotel);

export default router;
