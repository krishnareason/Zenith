// src/api/controllers/ai.controller.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pool = require('../../config/db.config');

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getInsights = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch all trades for the user
    const tradesResult = await pool.query("SELECT * FROM trades WHERE user_id = $1", [userId]);
    const trades = tradesResult.rows;

    if (trades.length < 3) {
      return res.json({ insights: "Not enough trade data to generate insights. Please add at least 3 trades." });
    }

    // 2. Prepare the data and engineer the prompt for the AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


    const tradesSummary = trades.map(t => ({
      pnl: parseFloat(t.profit_loss).toFixed(2),
      strategy: t.strategy,
      day: new Date(t.exit_timestamp).toLocaleDateString('en-US', { weekday: 'long' })
    }));

    const prompt = `
      You are an expert trading analyst AI. Your task is to analyze a trader's performance based on a list of their recent trades and provide 2-3 concise, actionable insights. Do not give generic advice. Base your insights directly on the data provided.

      Here is the trader's data in JSON format:
      ${JSON.stringify(tradesSummary, null, 2)}

      Based on this data, provide 2-3 bullet points identifying their strengths, weaknesses, or interesting patterns. For example, mention their most profitable strategy, a day of the week they consistently lose on, or any other observable patterns. Keep the insights short and to the point.
    `;

    // 3. Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insightsText = response.text();

    // 4. Send the AI's response back to the client
    res.json({ insights: insightsText });

  } catch (err) {
    console.error("AI Insight generation failed:", err);
    res.status(500).send("Failed to generate AI insights.");
  }
};