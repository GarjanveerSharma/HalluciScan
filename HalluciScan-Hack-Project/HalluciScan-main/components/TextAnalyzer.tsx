'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextAnalyzerProps {
  onAnalyze?: (text: string) => void;
  isLoading?: boolean;
}

export default function TextAnalyzer({ onAnalyze, isLoading }: TextAnalyzerProps) {
  const [text, setText] = useState('');

  const handleAnalyze = () => {
    if (!text.trim()) return;
    if (onAnalyze) onAnalyze(text);
  };

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">📝 Input Text</h3>
      <textarea
        className="w-full h-48 bg-dark-900/50 border border-white/10 rounded-xl p-4 text-gray-200 text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
        placeholder="Paste your AI-generated text here to check for hallucinations...

Example: Albert Einstein was born in 1985 in Tokyo, Japan. He invented the telephone and won the Nobel Prize in Literature."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">
          {text.length} characters
        </span>
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !text.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed glow-purple flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            '🔍 Analyze Text'
          )}
        </button>
      </div>
    </motion.div>
  );
}