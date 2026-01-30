import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// @route POST /api/subscribe
// @desc Handle newLetter subscription
// access Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "email is already subscribed" });
    }
    //create a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res
      .status(201)
      .json({ message: "Successfully subscribed to the newsLetter!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router
