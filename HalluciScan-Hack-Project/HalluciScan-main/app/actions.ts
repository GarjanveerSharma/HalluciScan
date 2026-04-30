'use server';

import { askGemini } from '../lib/geminiClient';
import { extractClaims } from '../lib/claimExtractor';
import { searchEvidence } from '../lib/evidenceSearch';
import { checkFact } from '../lib/factChecker';
import { calculateScore } from '../lib/confidenceScore';

// Helper to prevent hitting rate limits
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function analyzeTextAction(text: string) {
  try {
    // 1. Extract claims using Gemini
    const claims = await extractClaims(text);
    
    // 2. Search for evidence for each claim
    const claimsWithEvidence = [];
    for (const claim of claims) {
      const evidence = await searchEvidence(typeof claim === 'string' ? claim : (claim as any).text);
      claimsWithEvidence.push({ ...(typeof claim === 'string' ? { text: claim } : claim), evidence });
      await sleep(300); // 300ms delay between evidence searches (which are mostly Wikipedia, but good practice)
    }
    
    // 3. Check facts against evidence
    const verifiedClaims = [];
    for (const c of claimsWithEvidence) {
      const result = await checkFact(c.text || (c as any).claim, c.evidence);
      verifiedClaims.push(result);
      await sleep(1500); // 1.5s delay between Gemini API calls to avoid 429 Too Many Requests
    }
    
    // 4. Calculate overall confidence score
    const result = calculateScore(verifiedClaims);
    
    return { success: true, result };
  } catch (error) {
    console.error('Analysis error:', error);
    return { success: false, error: 'Failed to analyze text. Please check your API key and try again.' };
  }
}
