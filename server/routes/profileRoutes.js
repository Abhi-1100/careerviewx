const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// GET PROFILE (Protected Route)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      careerSuggestions: user.careerSuggestions,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE CAREER SUGGESTIONS (Protected Route)
router.put("/career-suggestions", authMiddleware, async (req, res) => {
  try {
    const { careerSuggestions } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { careerSuggestions },
      { new: true }
    ).select("-password");

    res.json({
      message: "Career suggestions updated",
      careerSuggestions: user.careerSuggestions
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
