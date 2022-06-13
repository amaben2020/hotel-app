import Hotel from "../models/Hotel";
import Room from "../models/Room";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      console.log(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.status(200).json(Room);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Hotel.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
