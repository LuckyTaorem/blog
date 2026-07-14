// api/summarize.js
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://ltdeveloperblogs.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', 'https://ltdeveloperblogs.github.io');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articleText } = req.body;

  if (!articleText) {
    return res.status(400).json({ error: 'Article text is required' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are an AI assistant on a tech blog. Summarize the provided article text in 2 to 3 highly concise, factual sentences. Do not use conversational filler." },
          { role: "user", content: articleText }
        ],
        temperature: 0.5,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return res.status(200).json({ summary: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'Failed to generate summary from AI provider.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'API connection error.' });
  }
}
