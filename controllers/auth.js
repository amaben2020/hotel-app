import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

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
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    const isValid = await bcrypt.compareSync(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // give whatever info here that would be encrypted in the token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    //skillfully removing certain props and sending others
    const { isAdmin, password, ...otherProps } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherProps });
  } catch (error) {
    next(error);
  }
};
