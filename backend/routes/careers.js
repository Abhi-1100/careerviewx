const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/careers/search?q=<query> - Search careers by name (live search bar)
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(200).json({ success: true, careers: [] });
    }

    // Case-insensitive partial match on careerName, title, category, description
    const regex = new RegExp(q.trim(), "i");
    const careers = await Career.find({
      $or: [
        { careerName: regex },
        { title: regex },
        { category: regex },
        { shortDescription: regex }
      ]
    })
      .select("_id careerName title category shortDescription icon")
      .limit(10);

    res.status(200).json({ success: true, careers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching careers",
      error: error.message
    });
  }
});

// GET /api/careers/detail/:id - Fetch full career data by MongoDB _id
router.get("/detail/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found"
      });
    }

    res.status(200).json({ success: true, career });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid career ID format"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error fetching career",
      error: error.message
    });
  }
});

// GET /api/careers/:careerName - Fetch career by name (case insensitive) — existing endpoint
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
