const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/careers/:careerName - Fetch career by name (case insensitive)
router.get("/:careerName", authMiddleware, async (req, res) => {
  try {
    const { careerName } = req.params;

    // Find career by name (case insensitive)
    const career = await Career.findOne({
      careerName: careerName.toLowerCase().trim()
    });

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career '${careerName}' not found`
      });
    }

    res.status(200).json({
      success: true,
      career: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching career",
      error: error.message
    });
  }
});

module.exports = router;
