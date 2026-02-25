const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Question = require("../models/Question");
const User = require("../models/User");

// GET /api/assessment/questions - Fetch 20 random questions
router.get("/questions", authMiddleware, async (req, res) => {
  try {
    // Get 20 random questions without exposing correctAnswer
    const questions = await Question.aggregate([
      { $sample: { size: 20 } },
      {
        $project: {
          question: 1,
          options: 1,
          category: 1,
          type: 1,
          weights: 1,
          _id: 1,
          // Exclude correctAnswer from response
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: questions.length,
      questions: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching questions",
      error: error.message
    });
  }
});

// POST /api/assessment/submit - Submit answers and calculate scores
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedAnswer }
    const userId = req.userId;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answers format"
      });
    }

    // Initialize scores for all career domains
    const scores = {
      engineering: 0,
      medical: 0,
      design: 0,
      business: 0,
      it: 0,
      government: 0
    };

    // Category scores for MCQ questions
    const categoryScores = {
      logical: 0,
      analytical: 0,
      biology: 0,
      commerce: 0,
      creativity: 0
    };

    // Process each answer
    for (const answer of answers) {
      try {
        const question = await Question.findById(answer.questionId);

        if (!question) {
          continue;
        }

        if (question.type === "mcq") {
          // For MCQ: check if answer is correct
          if (answer.selectedAnswer === question.correctAnswer) {
            // Award points for this category
            categoryScores[question.category]++;
          }
        } else if (question.type === "personality") {
          // For personality: add weights from selected option index
          const selectedOptionIndex = answer.selectedAnswerIndex;
          if (
            question.weights &&
            question.weights[selectedOptionIndex]
          ) {
            const optionWeights = question.weights[selectedOptionIndex];
            scores.engineering += optionWeights.engineering || 0;
            scores.medical += optionWeights.medical || 0;
            scores.design += optionWeights.design || 0;
            scores.business += optionWeights.business || 0;
            scores.it += optionWeights.it || 0;
            scores.government += optionWeights.government || 0;
          }
        }
      } catch (error) {
        console.error(`Error processing answer for question ${answer.questionId}:`, error);
        continue;
      }
    }

    // Map category scores to career domains
    // Logical + Analytical → Engineering & IT
    // Biology → Medical
    // Commerce → Business & Government
    // Creativity → Design
    const logicalAnalyticalScore = categoryScores.logical + categoryScores.analytical;
    scores.engineering += logicalAnalyticalScore * 2;
    scores.it += logicalAnalyticalScore * 2.5;
    scores.medical += categoryScores.biology * 3;
    scores.design += categoryScores.creativity * 3;
    scores.business += categoryScores.commerce * 2.5;
    scores.government += categoryScores.commerce * 1.5;

    // Find career domain with highest score
    let recommendedCareer = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    // Calculate match percentage (highest score normalized to 100)
    const maxScore = Math.max(...Object.values(scores));
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const matchPercentage = totalScore > 0 ? Math.round((maxScore / totalScore) * 100 * 1.8) : 85;
    const clampedMatch = Math.min(99, Math.max(60, matchPercentage));

    // Update user with recommendation and push to history
    const user = await User.findById(userId);
    if (user) {
      user.recommendedCareer = recommendedCareer;
      user.assessmentScore = scores;
      user.assessmentHistory.push({
        recommendedCareer,
        scores,
        matchPercentage: clampedMatch,
        takenAt: new Date()
      });
      await user.save();
    }

    res.status(200).json({
      success: true,
      recommendedCareer: recommendedCareer,
      scores: scores,
      matchPercentage: clampedMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting assessment",
      error: error.message
    });
  }
});

// GET /api/assessment/history - Fetch logged-in user's assessment history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("assessmentHistory");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Return newest first
    const history = [...user.assessmentHistory].reverse();
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assessment history",
      error: error.message
    });
  }
});

module.exports = router;
