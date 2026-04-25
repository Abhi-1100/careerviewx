const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const { callOpenRouter } = require("../utils/openrouter");

// ── Helpers for dynamic, unique question generation ──

/** Fisher-Yates shuffle — returns a new shuffled copy */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick N random items from an array */
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// All possible question angles — we pick 10 each time and shuffle the order
const ALL_ANGLES = [
  "Favorite subjects and academic interests",
  "Learning style and preferred study methods",
  "Problem-solving approach and thinking style",
  "Personality traits and temperament",
  "Ideal work environment and daily routine",
  "Core values and what motivates you",
  "Leadership vs teamwork preferences",
  "Creativity, imagination, and innovation style",
  "Communication and social interaction style",
  "Long-term career goals and life ambitions",
  "Risk-taking appetite and decision-making under pressure",
  "How you handle failure, setbacks, and criticism",
  "Hobbies, extracurricular activities, and free-time choices",
  "Relationship with technology and digital tools",
  "Financial goals and attitude towards money",
  "Desire for social impact and helping others",
  "Preferred pace of work — fast-moving or methodical",
  "Interest in travel, exploration, and new cultures",
  "Attitude towards competition and achievement",
  "How you learn from real-world experiences vs theory",
];

// Tone/style variations to make the wording different each time
const TONE_OPTIONS = [
  "Use a friendly, conversational tone — like a mentor chatting with a student.",
  "Use a professional, polished tone — like a career counselor in a formal session.",
  "Use a fun, energetic tone — like a quiz on a youth magazine.",
  "Use a thoughtful, reflective tone — like a journal prompt for self-discovery.",
  "Use a direct, no-nonsense tone — get straight to the point with clarity.",
  "Use a warm, encouraging tone — make the student feel safe and supported.",
];

// Scenario/framing variations
const SCENARIO_OPTIONS = [
  "Frame some questions as real-life situations the student might face.",
  "Frame some questions as 'imagine you are in this situation' hypotheticals.",
  "Frame some questions as choices between two appealing alternatives.",
  "Frame some questions around what the student would do on a free weekend.",
  "Frame some questions as 'your friend asks for advice' scenarios.",
  "Frame some questions around choosing between different school/college projects.",
];

// POST /api/assessment/generate-all-questions — Generate all 10 unique questions
router.post("/generate-all-questions", authMiddleware, async (req, res) => {
  try {
    // Pick 10 random angles and shuffle their order
    const selectedAngles = pickRandom(ALL_ANGLES, 10);
    const anglesText = selectedAngles
      .map((angle, i) => `${i + 1}. ${angle}`)
      .join("\n");

    // Pick random tone and scenario
    const tone = TONE_OPTIONS[Math.floor(Math.random() * TONE_OPTIONS.length)];
    const scenario = SCENARIO_OPTIONS[Math.floor(Math.random() * SCENARIO_OPTIONS.length)];

    // Unique session seed to further prevent caching/repetition
    const sessionSeed = `SESSION-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const prompt = `Generate exactly 10 UNIQUE career assessment questions for a student exploring their ideal career path.

UNIQUE SESSION ID: ${sessionSeed}
(Use this to make your output completely fresh and different from any previous generation.)

STYLE: ${tone}
APPROACH: ${scenario}

Each question MUST explore a DIFFERENT angle — one per angle listed below (in this exact order):
${anglesText}

Return EXACTLY this JSON structure:
{
  "questions": [
    {
      "question": "Your unique question text here?",
      "category": "one-word like interests/skills/personality/values/workstyle/goals/leadership/creativity/communication/academics",
      "options": [
        {"text": "Option A text", "traits": ["trait1", "trait2"]},
        {"text": "Option B text", "traits": ["trait1", "trait2"]},
        {"text": "Option C text", "traits": ["trait1", "trait2"]},
        {"text": "Option D text", "traits": ["trait1", "trait2"]}
      ]
    }
  ]
}

Rules:
- Generate exactly 10 questions — one for each angle above
- Each question must have exactly 4 options
- Each option must have a "traits" array with 2-3 relevant personality/skill traits
- Make every question CREATIVE and DIFFERENT from generic career quizzes — surprise the student!
- Questions and options must be relevant to career discovery for Indian students
- Options should map to diverse career inclinations (science, commerce, arts, tech, medical, law, design, social work, etc.)
- DO NOT use generic phrasing like "Which of the following..." — be original
- Return ONLY the JSON object, nothing else`;

    const aiResponse = await callOpenRouter(
      [{ role: "user", content: prompt }],
      1,       // retries
      0.95     // higher temperature for more creativity/uniqueness
    );

    // Validate response structure
    if (
      !aiResponse.questions ||
      !Array.isArray(aiResponse.questions) ||
      aiResponse.questions.length < 7
    ) {
      throw new Error("Invalid AI response: expected at least 7 questions");
    }

    // Validate each question
    const validatedQuestions = [];
    for (const q of aiResponse.questions.slice(0, 10)) {
      if (
        !q.question ||
        !q.options ||
        !Array.isArray(q.options) ||
        q.options.length !== 4
      ) {
        throw new Error("Invalid question structure in AI response");
      }
      for (const opt of q.options) {
        if (!opt.text || !opt.traits || !Array.isArray(opt.traits)) {
          throw new Error("Invalid option structure in AI response");
        }
      }
      validatedQuestions.push({
        question: q.question,
        category: q.category || "general",
        options: q.options,
      });
    }

    return res.status(200).json({
      success: true,
      questions: validatedQuestions,
      totalQuestions: validatedQuestions.length,
    });
  } catch (error) {
    console.error("Error generating all questions:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong generating questions. Please try again.",
      error: error.message,
    });
  }
});

// POST /api/assessment/next-question — Generate the next question using AI (kept for backward compat)
router.post("/next-question", authMiddleware, async (req, res) => {
  try {
    const { previousQnA, questionNumber, totalQuestions } = req.body;

    if (!questionNumber || !totalQuestions) {
      return res.status(400).json({
        success: false,
        message: "questionNumber and totalQuestions are required",
      });
    }

    // Question 1: return fixed starter question (no AI call needed)
    if (questionNumber === 1) {
      return res.status(200).json({
        success: true,
        question: FIRST_QUESTION.question,
        category: FIRST_QUESTION.category,
        options: FIRST_QUESTION.options,
      });
    }

    // Questions 2-10: generate dynamically with AI
    if (!previousQnA || !Array.isArray(previousQnA) || previousQnA.length === 0) {
      return res.status(400).json({
        success: false,
        message: "previousQnA is required for questions after the first",
      });
    }

    const qnaHistory = previousQnA
      .map(
        (qna, i) =>
          `Q${i + 1} (${qna.category}): ${qna.question}\nAnswer: ${qna.answer} [Traits: ${qna.traits.join(", ")}]`
      )
      .join("\n\n");

    const aspectsToExplore = [
      "interests and passions",
      "academic strengths and skills",
      "personality traits and temperament",
      "work style and environment preferences",
      "values and motivations",
      "leadership and teamwork style",
      "problem-solving approach",
      "creativity and innovation",
      "long-term career goals",
    ];

    const suggestedAspect = aspectsToExplore[(questionNumber - 2) % aspectsToExplore.length];

    const prompt = `Based on the following career assessment responses from a student, generate the NEXT most relevant career assessment question.

Previous Q&A:
${qnaHistory}

This is question ${questionNumber} of ${totalQuestions}. 
Focus on exploring: ${suggestedAspect}
Make sure this question explores a NEW angle not already covered. Do NOT repeat topics from previous questions.

Return EXACTLY this JSON structure:
{
  "question": "Your question text here?",
  "category": "one-word category like interests/skills/personality/values/workstyle",
  "options": [
    {"text": "Option A text", "traits": ["trait1", "trait2"]},
    {"text": "Option B text", "traits": ["trait1", "trait2"]},
    {"text": "Option C text", "traits": ["trait1", "trait2"]},
    {"text": "Option D text", "traits": ["trait1", "trait2"]}
  ]
}

Rules:
- Generate exactly 4 options
- Each option must have a "traits" array with 2-3 relevant personality/skill traits
- The question should be engaging and relevant to career discovery
- Make options diverse to reveal different career inclinations
- Return ONLY the JSON object, nothing else`;

    const aiResponse = await callOpenRouter([
      { role: "user", content: prompt },
    ]);

    if (
      !aiResponse.question ||
      !aiResponse.options ||
      !Array.isArray(aiResponse.options) ||
      aiResponse.options.length !== 4
    ) {
      throw new Error("Invalid AI response structure for question generation");
    }

    for (const opt of aiResponse.options) {
      if (!opt.text || !opt.traits || !Array.isArray(opt.traits)) {
        throw new Error("Invalid option structure in AI response");
      }
    }

    return res.status(200).json({
      success: true,
      question: aiResponse.question,
      category: aiResponse.category || "general",
      options: aiResponse.options,
    });
  } catch (error) {
    console.error("Error generating next question:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong generating the question. Please try again.",
      error: error.message,
    });
  }
});

// POST /api/assessment/final-result — Analyze all answers and generate career recommendations
router.post("/final-result", authMiddleware, async (req, res) => {
  try {
    const { allQnA } = req.body;

    if (!allQnA || !Array.isArray(allQnA) || allQnA.length === 0) {
      return res.status(400).json({
        success: false,
        message: "allQnA array is required with all assessment answers",
      });
    }

    // Build comprehensive analysis prompt
    const qnaHistory = allQnA
      .map(
        (qna, i) =>
          `Q${i + 1} (${qna.category}): ${qna.question}\nAnswer: ${qna.answer}\nTraits revealed: ${qna.traits.join(", ")}`
      )
      .join("\n\n");

    // Collect all traits
    const allTraits = allQnA.flatMap((qna) => qna.traits);
    const traitCounts = {};
    allTraits.forEach((t) => {
      traitCounts[t] = (traitCounts[t] || 0) + 1;
    });
    const topTraits = Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([trait]) => trait);

    const prompt = `Analyze this career assessment for an Indian student and provide personalized career recommendations.

Complete Assessment Responses:
${qnaHistory}

Dominant traits (ranked by frequency): ${topTraits.join(", ")}

Based on ALL the answers and traits above, provide career recommendations. Return EXACTLY this JSON structure:
{
  "summary": "A 1-2 sentence personality and career profile of this student based on their answers",
  "careers": [
    {
      "title": "Career Title",
      "matchPercent": 87,
      "whyItFits": "2-3 sentence explanation of why this career matches this specific student based on their answers",
      "stream": "Science/Commerce/Arts/Technology",
      "skillsToLearn": ["Skill 1", "Skill 2", "Skill 3"],
      "topColleges": ["College 1, City", "College 2, City", "College 3, City"]
    }
  ]
}

Rules:
- Provide exactly 5 career recommendations
- Match percentages should be REALISTIC and VARIED — NOT all above 85%. Range from 60% to 95% based on actual fit
- The top career should have the highest percentage, with others decreasing realistically
- "whyItFits" must reference the student's SPECIFIC answers and traits, not generic descriptions
- Include Indian colleges/universities that are actually relevant
- Each career should be from a different domain if possible
- skillsToLearn should be specific, actionable skills the student should develop
- Return ONLY the JSON object, nothing else`;

    const aiResponse = await callOpenRouter([
      { role: "user", content: prompt },
    ]);

    // Validate response structure
    if (!aiResponse.summary || !aiResponse.careers || !Array.isArray(aiResponse.careers)) {
      throw new Error("Invalid AI response structure for final results");
    }

    // Validate each career entry
    for (const career of aiResponse.careers) {
      if (
        !career.title ||
        typeof career.matchPercent !== "number" ||
        !career.whyItFits ||
        !career.stream
      ) {
        throw new Error("Invalid career entry in AI response");
      }
      // Ensure arrays exist with defaults
      career.skillsToLearn = career.skillsToLearn || ["Research this field", "Build projects", "Network with professionals"];
      career.topColleges = career.topColleges || ["Check NIRF rankings", "Explore local universities", "Consider online programs"];
    }

    // Sort careers by matchPercent descending
    aiResponse.careers.sort((a, b) => b.matchPercent - a.matchPercent);

    // Save to user's assessment history
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (user) {
        const topCareer = aiResponse.careers[0];
        user.recommendedCareer = topCareer.title;
        user.assessmentHistory.push({
          recommendedCareer: topCareer.title,
          scores: {
            engineering: 0,
            medical: 0,
            design: 0,
            business: 0,
            it: 0,
            government: 0,
          },
          matchPercentage: topCareer.matchPercent,
          takenAt: new Date(),
          aiResult: {
            summary: aiResponse.summary,
            careers: aiResponse.careers,
          },
        });
        await user.save();
      }
    } catch (saveError) {
      console.error("Error saving assessment history:", saveError.message);
    }

    return res.status(200).json({
      success: true,
      summary: aiResponse.summary,
      careers: aiResponse.careers,
    });
  } catch (error) {
    console.error("Error generating final results:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong analyzing your responses. Please try again.",
      error: error.message,
    });
  }
});

// GET /api/assessment/history — Fetch logged-in user's assessment history
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
      error: error.message,
    });
  }
});

module.exports = router;
