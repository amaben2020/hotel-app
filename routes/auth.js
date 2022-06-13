import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/register", (req, res) => {
  res.send("Hello World");
});

export default router;
