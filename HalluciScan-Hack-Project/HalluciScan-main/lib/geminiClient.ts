import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GOOGLE_API_KEY is not set. Add it to .env.local to enable AI analysis.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Throttling state
let lastRequestTime = 0;
const MIN_DELAY_MS = 2000; // 2 seconds between requests to avoid rate limits

// Prefer explicit override first, then try known model ids from newest to oldest.
const modelCandidates = [
  process.env.GEMINI_MODEL,
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.5-flash-latest',
].filter((m): m is string => typeof m === 'string' && m.trim().length > 0);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isModelNotFoundError(message: string): boolean {
  const m = message.toLowerCase();
  return m.includes('404') && (m.includes('not found') || m.includes('is not found'));
}

export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotaExceededError';
  }
}

/**
 * Send a prompt to Gemini and get a text response.
 * Includes retry logic, rate limit handling, and model fallback on 404s.
 */
export async function askGemini(prompt: string, retries = 3): Promise<string> {
  if (!genAI) {
    throw new Error('GOOGLE_API_KEY is not configured. Please add it to your .env.local file.');
  }

  let lastError: unknown = null;

  for (const modelName of modelCandidates) {
    const model = genAI.getGenerativeModel({ model: modelName });

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Throttle requests strictly.
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < MIN_DELAY_MS) {
          await sleep(MIN_DELAY_MS - timeSinceLastRequest);
        }
        lastRequestTime = Date.now();

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
      } catch (error: unknown) {
        lastError = error;
        const message = getErrorMessage(error);
        console.error(`Gemini API Error (model=${modelName}, attempt ${attempt}/${retries}):`, message);

        const errorMessage = message.toLowerCase();
        const isQuotaExceeded = errorMessage.includes('429') && errorMessage.includes('quota');
        const isRateLimited = errorMessage.includes('429');
        const isModelMissing = isModelNotFoundError(message);

        if (isQuotaExceeded) {
          throw new QuotaExceededError('Gemini API quota exceeded. Please check your API key and billing details.');
        }

        // If this model is unavailable, move to next candidate immediately.
        if (isModelMissing) {
          break;
        }

        if (attempt === retries) {
          if (isRateLimited) {
            throw new QuotaExceededError('Gemini API rate limit reached after retries. Please wait and try again.');
          }
          // Try next model if available.
          break;
        }

        // Exponential backoff.
        const backoffMs = attempt * 2000;
        console.log(`Waiting ${backoffMs}ms before retrying...`);
        await sleep(backoffMs);
      }
    }
  }

  const finalMessage = getErrorMessage(lastError);
  throw new Error(
    `Failed to communicate with Gemini API using available models. Last error: ${finalMessage}`
  );
}
