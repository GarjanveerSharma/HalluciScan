'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import TextAnalyzer from '../../components/TextAnalyzer';
import ResultPanel from '../../components/ResultPanel';
import Footer from '../../components/Footer';
import { AnalysisResult } from '../../lib/mockData';

export default function AnalyzerPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const backendResult = await res.json();
      setResult(backendResult as AnalysisResult);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      console.error(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `halluciscan-report-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 px-4">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              AI Hallucination <span className="gradient-text">Analyzer</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Paste your AI-generated text and get instant verification with evidence-backed analysis.
            </p>
          </motion.div>

          {/* Layout — single column: input on top, results below */}
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Input — narrower */}
            <div className="max-w-3xl mx-auto">
              <TextAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {error && (
              <motion.div
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Quick tips — only when no results */}
            {!result && !isLoading && (
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-gray-400 mb-3">💡 Try these examples:</h3>
                <div className="space-y-2">
                  {[
                    'Albert Einstein was born in 1985 in Tokyo, Japan. He invented the telephone.',
                    'The Great Wall of China is located in Australia. It was built during the Ming Dynasty.',
                    'Python was created by James Gosling in 2005. It runs only on Windows.',
                  ].map((example, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnalyze(example)}
                      className="w-full text-left p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-xs text-gray-400 transition-colors"
                    >
                      &quot;{example}&quot;
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Loading */}
            {isLoading && (
              <motion.div
                className="glass rounded-2xl p-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
                <div className="text-gray-400 text-sm">Analyzing your text...</div>
                <div className="text-gray-500 text-xs mt-1">Extracting claims • Searching evidence • Verifying facts</div>
              </motion.div>
            )}

            {/* Results — appear below input after analysis */}
            {result && !isLoading && (
              <ResultPanel result={result} onSave={handleSave} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}