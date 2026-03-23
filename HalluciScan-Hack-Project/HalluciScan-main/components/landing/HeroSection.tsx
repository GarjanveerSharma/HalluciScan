'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-purple-300">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            AI Hallucination Detection — Live
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Detect AI{' '}
          <span className="gradient-text">Hallucinations</span>
          <br />Instantly
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          HalluciScan analyzes AI responses in real-time to identify factual inaccuracies,
          unsupported claims, and hallucinated content — directly in your browser.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#download"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 glow-purple"
          >
            ⬇ Download Extension
          </a>
          <a
            href="/analyzer"
            className="px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
          >
            🔍 View Demo
          </a>
        </motion.div>

        {/* Floating mockup */}
        <motion.div
          className="mt-16 glass-strong rounded-2xl p-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500 ml-2">HalluciScan Analysis</span>
          </div>
          <div className="space-y-3 text-left text-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-gray-300">&quot;The Eiffel Tower was built in 1889&quot;</span>
              <span className="ml-auto text-green-400 text-xs font-mono">FACTUAL — 95%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-400">✗</span>
              <span className="text-gray-300">&quot;Einstein invented the telephone&quot;</span>
              <span className="ml-auto text-red-400 text-xs font-mono">HALLUCINATED — 12%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">?</span>
              <span className="text-gray-300">&quot;AI will surpass human intelligence by 2030&quot;</span>
              <span className="ml-auto text-yellow-400 text-xs font-mono">UNCERTAIN — 45%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
