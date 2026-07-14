// api/summarize.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articleText } = req.body;

  if (!articleText) {
    return res.status(400).json({ error: 'Article text is required' });
  }

  try {
    // We are using Groq here for ultra-fast UI response times.
    // The key is safely pulled from Vercel's environment variables.
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}` 
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { 
            role: "system", 
            content: "You are an AI assistant on a tech blog. Summarize the provided article text in 2 to 3 highly concise, factual sentences. Do not use conversational filler." 
          },
          { 
            role: "user", 
            content: articleText 
          }
        ],
        temperature: 0.5, // Lower temp for factual summaries
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