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
You are a content moderation assistant for the "SayIt" app — a positive, anonymous message wall.  
Your goal is to ensure messages stay friendly, safe, and appropriate for all audiences.

Analyze the given text and determine if it contains harmful or inappropriate content.

Use a **balanced and community-friendly** approach:
- Do not flag casual slang or light frustration.
- Only flag messages that are truly harmful or offensive.

---

### ✅ ALLOWED (These are fine)
- Casual slang and informal tone: "lol", "bruh", "omg", "no way!"
- Mild frustration: "darn", "heck", "ugh"
- Friendly teasing or sarcasm that isn’t mean-spirited
- General emotional expressions

---

### 🚫 REJECT / FLAG (These are not okay)
- Profanity or explicit curse words  
- Hate speech or discriminatory language (racism, sexism, homophobia, etc.)  
- Violent or threatening expressions  
- Sexually explicit or adult content  
- Harassment, bullying, or personal attacks  

---

### 🧹 CLEANUP INSTRUCTIONS
If the text includes any flagged content:
1. Replace each inappropriate word with a clean, friendly word that **starts with the same letter**.  
2. Keep the sentence natural and preserve tone and meaning.  
3. Example replacements:
   - “f***” → “fudge”  
   - “s***” → “sugar”  
   - “d***” → “darn”  
   - “b****” → “buddy”  
4. Keep the structure and flow intact — only clean what’s necessary.

---

### ⚙️ OUTPUT FORMAT
Respond **only** in valid JSON (no extra text, no explanations).

{
  "isProfane": true/false,
  "cleanVersion": "text with same-letter clean replacements",
  "reason": "short, clear reason for flagging (or 'no issues found')"
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
  const { content, recipient } = req.body;

  // Check message content
  if (content) {
    const contentResult = await checkProfanity(content);

    if (contentResult.isProfane) {
      return res.status(400).json({
        error: "Your message contains inappropriate content",
        reason: contentResult.reason,
        cleanVersion: contentResult.cleanVersion,
        field: "content"
      });
    }
  }

  // Check recipient field
  if (recipient) {
    const recipientResult = await checkProfanity(recipient);

    if (recipientResult.isProfane) {
      return res.status(400).json({
        error: "The 'To' field contains inappropriate content",
        reason: recipientResult.reason,
        cleanVersion: recipientResult.cleanVersion,
        field: "recipient"
      });
    }
  }

  next();
}

module.exports = {
  checkProfanity,
  profanityFilterMiddleware
};
