import User from "../models/User.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
