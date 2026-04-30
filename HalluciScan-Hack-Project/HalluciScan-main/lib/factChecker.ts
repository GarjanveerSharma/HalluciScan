import { askLlama } from './llamaClient';
import { askGemini } from './geminiClient';
import { EvidenceItem } from './evidenceSearch';

export interface FactCheckResult {
  claim: string;
  verdict: 'factual' | 'hallucinated' | 'uncertain';
  confidence: number;
  explanation: string;
  evidence: EvidenceItem[];
  source: 'llama' | 'gemini' | 'wikipedia-match';
}

/**
 * Fact-check a claim against Wikipedia evidence.
 * Uses Llama (Groq) first, Gemini second, offline keyword-matching third.
 */
export async function checkFact(
  claim: string,
  evidence: EvidenceItem[]
): Promise<FactCheckResult> {
  if (evidence.length === 0) {
    return {
      claim,
      verdict: 'uncertain',
      confidence: 50,
      explanation: 'No evidence found to verify or refute this claim.',
      evidence: [],
      source: 'wikipedia-match',
    };
  }

  const evidenceText = evidence
    .map((e, i) => `[Source ${i + 1}: ${e.source}]\n${e.snippet}`)
    .join('\n\n');

  const prompt = `You are a precise fact-checking AI. Compare the following CLAIM against the provided EVIDENCE and determine its accuracy.

CLAIM:
"${claim}"

EVIDENCE:
${evidenceText}

Respond with ONLY a valid JSON object (no markdown, no code fences):
{
  "verdict": "factual" | "hallucinated" | "uncertain",
  "confidence": <number 0-100>,
  "explanation": "<brief explanation>"
}

Rules:
- "factual": The claim is fully supported by the evidence
- "hallucinated": The claim contradicts the evidence
- "uncertain": The evidence doesn't clearly confirm or deny the claim`;

  // Try Llama first
  try {
    const response = await askLlama(prompt);
    const result = parseFactCheckResponse(response);
    if (result) return { ...result, claim, evidence, source: 'llama' };
  } catch (err) {
    console.warn('Llama fact-check failed:', err instanceof Error ? err.message : err);
  }

  // Try Gemini second
  try {
    const response = await askGemini(prompt);
    const result = parseFactCheckResponse(response);
    if (result) return { ...result, claim, evidence, source: 'gemini' };
  } catch (err) {
    console.warn('Gemini fact-check failed:', err instanceof Error ? err.message : err);
  }

  // Offline fallback
  return offlineFactCheck(claim, evidence);
}

function parseFactCheckResponse(response: string): { verdict: 'factual' | 'hallucinated' | 'uncertain'; confidence: number; explanation: string } | null {
  try {
    const jsonMatch = response.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        verdict: parsed.verdict || 'uncertain',
        confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 50)),
        explanation: parsed.explanation || 'Unable to determine.',
      };
    }
  } catch {}
  return null;
}

function offlineFactCheck(claim: string, evidence: EvidenceItem[]): FactCheckResult {
  const stopWords = new Set(['the','is','in','and','to','a','of','for','on','with','as','by','at','it','was','that','are','were','be','has','have','an','or','but','not','from','also']);
  const claimWords = claim.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
  const meaningful = claimWords.filter(w => !stopWords.has(w) && w.length > 2);
  if (meaningful.length === 0) {
    return { claim, verdict: 'uncertain', confidence: 50, explanation: 'Not enough keywords to verify.', evidence, source: 'wikipedia-match' };
  }
  const allText = evidence.map(e => e.snippet).join(' ').toLowerCase();
  let matches = 0;
  for (const w of meaningful) { if (allText.includes(w)) matches++; }
  const pct = (matches / meaningful.length) * 100;
  const verdict = pct >= 50 ? 'factual' : pct <= 15 ? 'hallucinated' : 'uncertain';
  const explanation = `Wikipedia keyword overlap: ${pct.toFixed(0)}%. ${verdict === 'factual' ? 'Claim supported.' : verdict === 'hallucinated' ? 'Claim not verified.' : 'Manual check needed.'}`;
  return { claim, verdict, confidence: Math.round(pct), explanation, evidence, source: 'wikipedia-match' };
}
