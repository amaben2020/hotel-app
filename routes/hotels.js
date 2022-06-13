import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE: req is what you are taking from user and saving in the database, res is what you are sending back to user
router.post("/", async (req, res) => {
  const {
    name,
    description,
    cheapestPrice,
    type,
    title,
    city,
    address,
    distance,
  } = req.body;
  // creating a new hotel object
  const hotel = new Hotel({
    name,
    description,
    city,
    address,
    distance,
    type,
    title,
    cheapestPrice,
  });
  try {
    const savedHotel = await hotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
