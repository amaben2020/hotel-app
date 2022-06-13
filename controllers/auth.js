import User from "../models/User.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
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
