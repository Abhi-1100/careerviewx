const https = require("https");

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "mistralai/mixtral-8x7b-instruct";

const SYSTEM_PROMPT = `You are an expert career counselor AI with deep knowledge of Indian education streams and global career paths. Your job is to understand a student's interests, strengths, personality, and work style through smart questions and give them genuinely useful, personalized career guidance. Always respond in pure valid JSON only — no markdown, no backticks, no explanation before or after the JSON.`;

/**
 * Call OpenRouter API with messages and return parsed JSON.
 * Retries once on JSON parse failure.
 */
async function callOpenRouter(messages, retries = 1, temperature = 0.7) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables");
  }

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: temperature,
    max_tokens: 4000,
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

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const rawResponse = await makeRequest(OPENROUTER_BASE_URL, options, body);
      const responseData = JSON.parse(rawResponse);

      if (responseData.error) {
        throw new Error(
          `OpenRouter API error: ${responseData.error.message || JSON.stringify(responseData.error)}`
        );
      }

      const content = responseData.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No content in OpenRouter response");
      }

      // Extract JSON from response — handle cases where the model wraps JSON in backticks
      const parsed = extractJSON(content);
      return parsed;
    } catch (err) {
      console.error(
        `OpenRouter call attempt ${attempt + 1} failed:`,
        err.message
      );
      if (attempt >= retries) {
        throw err;
      }
      // Wait a moment before retry
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

/**
 * Make an HTTPS request and return the response body as a string.
 */
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
          reject(
            new Error(`HTTP ${res.statusCode}: ${data.substring(0, 500)}`)
          );
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error("Request timed out after 30 seconds"));
    });
    req.write(body);
    req.end();
  });
}

/**
 * Extract JSON from a string that may contain markdown fences or extra text.
 */
function extractJSON(text) {
  // Try direct parse first
  try {
    return JSON.parse(text.trim());
  } catch (_) {
    // ignore
  }

  // Try to extract from markdown code block
  const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch (_) {
      // ignore
    }
  }

  // Try to find JSON object in the text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (_) {
      // ignore
    }
  }

  throw new Error(`Failed to parse JSON from AI response: ${text.substring(0, 200)}`);
}

module.exports = { callOpenRouter };
