import { FactCheckResult } from './factChecker';

export interface ScoredResult {
  overallScore: number; // 0-100 hallucination risk percentage
  riskLevel: 'low' | 'medium' | 'high';
  claims: FactCheckResult[];
}

/**
 * Calculate overall hallucination risk score from individual fact-check results.
 *
 * Score interpretation:
 *   0-30%  -> Low risk (mostly factual)
 *  30-70%  -> Medium risk (some issues)
 *  70-100% -> High risk (likely hallucinated)
 */
export function calculateScore(results: FactCheckResult[]): ScoredResult {
  if (results.length === 0) {
    return {
      overallScore: 0,
      riskLevel: 'low',
      claims: [],
    };
  }

  // Each claim contributes to the risk score.
  // hallucinated -> adds full risk weight
  // uncertain -> adds partial risk weight
  // factual -> adds little to no risk
  let totalRisk = 0;

  for (const result of results) {
    switch (result.verdict) {
      case 'hallucinated':
        // Higher risk contribution, inversely related to confidence.
        totalRisk += 100 - result.confidence * 0.2;
        break;
      case 'uncertain':
        // Moderate risk.
        totalRisk += 40;
        break;
      case 'factual':
        // Low risk, with a small bump if confidence isn't perfect.
        totalRisk += Math.max(0, 20 - result.confidence * 0.2);
        break;
    }
  }

  const overallScore = Math.round(
    Math.min(100, Math.max(0, totalRisk / results.length))
  );

  let riskLevel: 'low' | 'medium' | 'high';
  if (overallScore < 30) {
    riskLevel = 'low';
  } else if (overallScore < 70) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }

  return {
    overallScore,
    riskLevel,
    claims: results,
  };
}
