import Hotel from "../models/Hotel.js";

//controller: These are functions that CRUD resources in the database
//They are responsible for using the model to interact with the database
//CREATE: req is what you are taking from user and saving in the database, res is what you are sending back to user
export const createHotel = async (req, res, next) => {
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
    next();
  }
};

export const updateHotel = async (req, res) => {
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
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min | 1, $lte: max || 999 },
    });
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  //req.query is a object that contains all the query parameters

  const cities = req.query.cities.split(",");
  // console.log(req.query);
  try {
    const list = await Promise.all(
      cities.map(async (city) => {
        const count = await Hotel.countDocuments({ city });
        return { city: count };
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByTypes = async (req, res, next) => {
  //req.query is a object that contains all the query parameters
  const hotelCount = Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = Hotel.countDocuments({ type: "apartment" });
  const resortCount = Hotel.countDocuments({ type: "resort" });
  const villaCount = Hotel.countDocuments({ type: "villa" });
  const cabinCount = Hotel.countDocuments({ type: "cabin" });

  try {
    res.status(200).json([
      { type: "hotel", count: await hotelCount },
      { type: "apartment", count: await apartmentCount },
      { type: "resort", count: await resortCount },
      { type: "villa", count: await villaCount },
      { type: "cabin", count: await cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};
