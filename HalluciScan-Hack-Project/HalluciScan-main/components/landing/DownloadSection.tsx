'use client';
import { motion } from 'framer-motion';

export default function DownloadSection() {
  return (
    <section id="download" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />

          <div className="relative z-10">
            <div className="text-6xl mb-6">🛡️</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Download <span className="gradient-text">HalluciScan</span> Extension
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Protect yourself from AI hallucinations. Install the Chrome extension and start verifying AI responses instantly.
            </p>

            <a
              href="/halluciscan-extension.zip"
              download
              className="inline-block px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 glow-purple"
            >
              ⬇ Download Extension
            </a>

            {/* Installation steps */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {[
                { step: '1', text: 'Open chrome://extensions' },
                { step: '2', text: 'Enable Developer Mode' },
                { step: '3', text: 'Click Load Unpacked' },
                { step: '4', text: 'Select extension folder' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl p-4 flex items-center gap-3 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center text-sm font-bold text-purple-300 shrink-0">
                    {s.step}
                  </span>
                  <span className="text-gray-300 text-sm min-w-0 break-words">{s.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
