require("dotenv").config({ path: ".env" });
const { callOpenRouter } = require("./utils/openrouter");

async function test() {
  try {
    const prompt = `Generate exactly 9 career assessment questions for a student. These questions should explore DIFFERENT aspects of the student's personality and career fit.

Each question MUST explore a DIFFERENT angle from this list (one question per angle):
1. Academic strengths and favorite subjects
2. Problem-solving style and approach
3. Personality traits and temperament
4. Work environment and style preferences
5. Values, motivations, and what drives them
6. Leadership vs teamwork preferences
7. Creativity and innovation style
8. Communication and social preferences
9. Long-term career goals and ambitions

Return EXACTLY this JSON structure:
{
  "questions": [
    {
      "question": "Question text here?",
      "category": "one-word like skills/personality/values/workstyle/goals/leadership/creativity/communication/academics",
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
- Generate exactly 9 questions (they will be questions 2-10; question 1 is pre-set)
- Each question must have exactly 4 options
- Each option must have a "traits" array with 2-3 relevant personality/skill traits
- Make questions engaging, diverse, and relevant to career discovery for Indian students
- DO NOT ask about favorite subject (that's already question 1)
- Options should reveal different career inclinations (science, commerce, arts, tech, medical, etc.)
- Return ONLY the JSON object, nothing else`;

    const res = await callOpenRouter([{ role: "user", content: prompt }]);
    console.log("Success! Questions count:", res.questions ? res.questions.length : 'no questions field');
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

test();
