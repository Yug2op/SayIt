/**
 * Profanity Filter Middleware using Gemini API
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Check if message contains profanity or offensive content
 * @param {string} text - The message text to check
 * @returns {Promise<{isProfane: boolean, cleanVersion: string, reason: string}>}
 */
async function checkProfanity(text) {
  try {
    const prompt = `
You are a strict content moderation assistant.
Analyze the following text and determine if it contains profanity, explicit content, hate speech, or offensive language in ANY language.

Respond ONLY in valid JSON format:
{
  "isProfane": true/false,
  "cleanVersion": "censored text",
  "reason": "why flagged"
}

Text: "${text}"
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const output = result.response.text();
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    return parsed || {
      isProfane: false,
      cleanVersion: text,
      reason: "Parsing failed but allowing message"
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      isProfane: false,
      cleanVersion: text,
      reason: "API failure, allowing message"
    };
  }
}

/**
 * Express middleware
 */
async function profanityFilterMiddleware(req, res, next) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      error: "Message content is required"
    });
  }

  const result = await checkProfanity(content);

  if (result.isProfane) {
    return res.status(400).json({
      error: "Your message contains inappropriate content",
      reason: result.reason,
      cleanVersion: result.cleanVersion,
    });
  }

  next();
}

module.exports = {
  checkProfanity,
  profanityFilterMiddleware
};
