import User from "../models/User.js";
//controller: These are functions that CRUD resources in the database
//They are responsible for using the model to interact with the database
//CREATE: req is what you are taking from user and saving in the database, res is what you are sending back to user
export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  // creating a new User object
  const user = new User({
    username,
    email,
    password,
  });
  try {
    const createdUser = await user.save();
    res.status(200).json(createdUser);
  } catch (error) {
    next();
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
