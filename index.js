import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("disconnected");
  } catch (error) {
    console.log(error);
  }
};

const app = express();

app.use(cookieParser());

//middlewares :
app.use(express.json()); //for parsing json
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);

//This middleware would run after any route runs
//error handling middleware : customizing error message
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connectionText = async () => {
  await connect();
  console.log("Connected");
};
app.listen(8800, connectionText);
