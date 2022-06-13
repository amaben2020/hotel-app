import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";

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

//middlewares
app.use(express.json()); //for parsing json
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);

const connectionText = async () => {
  await connect();
  console.log("Connected");
};
app.listen(8800, connectionText);
