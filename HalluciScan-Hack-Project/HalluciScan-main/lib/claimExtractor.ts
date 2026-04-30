import { askLlama } from './llamaClient';
import { askGemini } from './geminiClient';

/**
 * Extract factual claims using Llama (via Groq) first, Gemini second, offline last.
 */
export async function extractClaims(text: string): Promise<string[]> {
  const prompt = `You are a fact-checking assistant. Analyze the following text and extract all factual, verifiable claims. 

Rules:
- Only extract claims that can be verified against real-world knowledge (dates, numbers, names, events, scientific facts, etc.)
- Ignore opinions, subjective statements, and vague generalities
- Each claim should be a self-contained, concise statement
- Return ONLY a valid JSON array of strings, nothing else

Text:
"""
${text}
"""

Return ONLY a JSON array like: ["claim 1", "claim 2", "claim 3"]`;

  // Try Llama first (via Groq)
  try {
    const response = await askLlama(prompt);
    const parsed = parseClaimsResponse(response);
    if (parsed.length > 0) return parsed;
  } catch (err) {
    console.warn('Llama claim extraction failed:', err instanceof Error ? err.message : err);
  }

  // Try Gemini second
  try {
    const response = await askGemini(prompt);
    const parsed = parseClaimsResponse(response);
    if (parsed.length > 0) return parsed;
  } catch (err) {
    console.warn('Gemini claim extraction failed:', err instanceof Error ? err.message : err);
  }

  // Offline fallback: split into sentences
  console.log('Using offline sentence splitting for claim extraction.');
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  return sentences
    .map((s) => s.trim().replace(/^[\d\-\*\.]+\s*/, ''))
    .filter((s) => s.length > 15);
}

function parseClaimsResponse(response: string): string[] {
  try {
    const jsonMatch = response.match(/\[[\s\S]*?\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (Array.isArray(parsed)) {
        return parsed.filter((item: unknown) => typeof item === 'string' && item.trim().length > 0);
      }
    }
  } catch {}
  return [];
}
