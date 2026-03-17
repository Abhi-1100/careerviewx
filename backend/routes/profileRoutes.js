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
      education: user.education,
      stream: user.stream,
      careerSuggestions: user.careerSuggestions,
      recommendedCareer: user.recommendedCareer,
      assessmentHistory: user.assessmentHistory,
      careerPaths: user.careerPaths,
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

// ADD CAREER PATH (Protected Route)
router.post("/career-path", authMiddleware, async (req, res) => {
  try {
    const { careerName, education, stream, matchPercentage } = req.body;

    if (!careerName) {
      return res.status(400).json({ message: "Career name is required" });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if career already exists
    const careerExists = user.careerPaths.some(
      path => path.careerName.toLowerCase() === careerName.toLowerCase()
    );

    if (careerExists) {
      return res.status(400).json({ 
        message: "Career path already exists",
        success: false 
      });
    }

    // Add new career path
    user.careerPaths.push({
      careerName,
      education: education || user.education,
      stream: stream || user.stream,
      matchPercentage,
      addedDate: new Date()
    });

    await user.save();

    res.json({
      success: true,
      message: "Career path added successfully",
      careerPaths: user.careerPaths
    });
  } catch (error) {
    console.error("Error adding career path:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET CAREER PATHS (Protected Route)
router.get("/career-paths", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("careerPaths");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      careerPaths: user.careerPaths
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
