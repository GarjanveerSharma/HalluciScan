/**
 * Llama AI Client via Groq API (free tier)
 * This powers the actual AI analysis while Gemini branding is shown in the UI.
 * Groq provides free access to Llama 3 models with very fast inference.
 * 
 * Get free API key: https://console.groq.com/keys
 */

// Throttling state
let lastLlamaRequestTime = 0;
const LLAMA_MIN_DELAY_MS = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Send a prompt to Llama 3 via Groq and get a text response.
 */
export async function askLlama(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured. Add it to .env.local');
  }

  // Throttle requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastLlamaRequestTime;
  if (timeSinceLastRequest < LLAMA_MIN_DELAY_MS) {
    await sleep(LLAMA_MIN_DELAY_MS - timeSinceLastRequest);
  }
  lastLlamaRequestTime = Date.now();

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq/Llama API error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}
