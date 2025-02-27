const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleWears/Auth"); // Import auth middleware
const { UserModel, validUser } = require("../models/UserModel");
const adminAuth = require ("../middleWears/authAdmin");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error, value } = validUser(req.body);
  if (error) {
    return res.status(400).json({ err: "Invalid user data", details: error.details });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);

    const newUser = new UserModel(value);
    await newUser.save();

    res.status(201).json({ success: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ err: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ err: "Invalid username or password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      "user-secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: "Login successful",
      token: token,
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/profile", auth, async (req, res) => {
  res.json({ success: "Profile accessed", user: req.user });
});

module.exports = router;
