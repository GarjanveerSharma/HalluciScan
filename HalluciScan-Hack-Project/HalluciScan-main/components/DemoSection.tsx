'use client';

import { useState } from 'react';
import TextAnalyzer from './TextAnalyzer';
import ResultPanel from './ResultPanel';
import { AnalysisResult } from '../lib/mockData';

export default function DemoSection() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }

      setResult(data as AnalysisResult);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="demo-section section" id="demo">
      <div className="container">
        <div className="section-header text-center">
          <h2>
            Try{' '}
            <span className="gradient-text">HalluciScan</span>{' '}
            Now
          </h2>
          <p>
            Paste any AI-generated text below and get real-time hallucination
            analysis powered by Gemini AI and Wikipedia.
          </p>
        </div>
        <div className="demo-container">
          <TextAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="error-banner fade-in-up">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {isLoading && (
            <div className="loading-state fade-in-up">
              <div className="loading-spinner"></div>
              <p className="loading-text">🔍 Analyzing with AI...</p>
              <p className="loading-subtext">
                Extracting claims → Searching evidence → Fact-checking...
              </p>
            </div>
          )}

          {result && !isLoading && (
            <div className="results-section fade-in-up">
              <ResultPanel result={result} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}