import User from "../models/User.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    const user = new User({
      username,
      email,
      password: hash,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    const user = new User({
      username,
      email,
      password: hash,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
