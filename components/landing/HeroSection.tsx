'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 opacity-90">
        <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-purple-600/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/15 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-[90px] animate-pulse delay-500" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-xl opacity-70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          Detect AI{' '}
          <span className="gradient-text">Hallucinations</span>
          <br />Instantly
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1], textShadow: ["0px 0px 10px #00f5ff", "0px 0px 40px #00f5ff", "0px 0px 10px #00f5ff"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-white"
          >
            GHOST
          </motion.div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-purple-300">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            Advanced AI Detection — Live
          </div>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Ghost analyzes AI responses in real-time to identify factual inaccuracies,
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
            className="cyber-btn px-8 py-4 rounded-none text-white font-semibold text-lg transition-all duration-300"
          >
            <span>⬇ Download Extension</span>
          </a>
          <a
            href="/analyzer"
            className="cyber-btn px-8 py-4 rounded-none text-white font-semibold text-lg transition-all duration-300"
          >
            <span>🔍 View Demo</span>
          </a>
        </motion.div>

        {/* Floating mockup */}
        <motion.div
          className="mt-16 glass-strong rounded-3xl p-6 max-w-2xl mx-auto border border-white/10 shadow-[0_30px_120px_rgba(8,15,42,0.18)]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500 ml-2">Ghost Analysis</span>
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

      <div className="hero-scroll-tip">
        <span>Scroll</span>
        <span className="text-sm">↓</span>
      </div>
    </section>
  );
}
