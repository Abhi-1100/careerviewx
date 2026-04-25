// Direct test of the callOpenRouter function with verbose logging
require("dotenv").config({ path: ".env" });
const https = require("https");

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "mistralai/mixtral-8x7b-instruct";

const SYSTEM_PROMPT = `You are an expert career counselor AI with deep knowledge of Indian education streams and global career paths. Your job is to understand a student's interests, strengths, personality, and work style through smart questions and give them genuinely useful, personalized career guidance. Always respond in pure valid JSON only — no markdown, no backticks, no explanation before or after the JSON.`;

function makeRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      ...options,
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      port: 443,
    };

    const req = https.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 1000)}`));
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(60000, () => {
      req.destroy(new Error("Request timed out after 60 seconds"));
    });
    req.write(body);
    req.end();
  });
}

async function test() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("API Key found:", apiKey ? `Yes (${apiKey.slice(0, 15)}...)` : "NO KEY FOUND");

  const prompt = `Generate exactly 9 career assessment questions for a student. These questions should explore DIFFERENT aspects of the student's personality and career fit.

Each question MUST explore a DIFFERENT angle from this list (one question per angle):
1. Learning style and preferred methods of study
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
- DO NOT ask "What is your favorite subject?" (that's already asked) but instead ask about how they prefer to study or learn.
- Options should reveal different career inclinations (science, commerce, arts, tech, medical, etc.)
- Return ONLY the JSON object, nothing else`;

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 3000,
  });

  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://careerviewx.vercel.app",
      "X-Title": "Career Assessment",
    },
  };

  try {
    console.log("Making API request...");
    const raw = await makeRequest(OPENROUTER_BASE_URL, options, body);
    const parsed = JSON.parse(raw);

    if (parsed.error) {
      console.error("OpenRouter API error:", JSON.stringify(parsed.error));
      return;
    }

    const content = parsed.choices?.[0]?.message?.content;
    if (!content) {
      console.error("No content in response:", JSON.stringify(parsed));
      return;
    }

    console.log("Raw AI content (first 500 chars):", content.substring(0, 500));

    // Try to parse as JSON
    try {
      const jsonResult = JSON.parse(content.trim());
      console.log("Questions count:", jsonResult.questions?.length);
      console.log("SUCCESS!");
    } catch (parseErr) {
      console.error("Failed to parse JSON. Content:", content.substring(0, 500));
    }
  } catch (err) {
    console.error("Request failed:", err.message);
  }
}

test();
