import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

//register user: POST /api/users/register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    

    //create jwt token
    const payload = { user: { id: newUser._id, role: newUser.role } };
    //payload is having database id

    //sign and return the token with userData
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user: {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
            role: newUser.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

//login user: POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid mail credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid ganda credentials" });
    }

    //create jwt token
    const token = jwt.sign(
      { user: { id: user._id, role: user.role } }, //payload
      process.env.JWT_SECRET,
      { expiresIn: "40h" }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


//@route GET /api/users/profile
//@desc Get loggedIn user profile
//@access private

router.get("/profile", protect , async(req, res)=>{
    res.json(req.user)
})


export default router;
