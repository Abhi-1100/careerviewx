const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, education, stream } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      education: education || "",
      stream: stream || ""
    });

    await user.save();

    // Generate token for auto-login after signup
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ 
      message: "User registered successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        education: user.education,
        stream: user.stream,
        careerSuggestions: user.careerSuggestions
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        education: user.education,
        stream: user.stream,
        careerSuggestions: user.careerSuggestions
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// LOGOUT (Client-side token removal, but endpoint for consistency)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
