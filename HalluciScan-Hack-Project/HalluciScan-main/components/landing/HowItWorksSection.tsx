'use client';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Install Extension', desc: 'Download and add HalluciScan to your Chrome browser.', icon: '⬇️' },
  { num: '02', title: 'Ask AI a Question', desc: 'Use ChatGPT, Gemini, or Claude as you normally would.', icon: '💬' },
  { num: '03', title: 'Response Captured', desc: 'The extension automatically captures the AI response text.', icon: '📋' },
  { num: '04', title: 'AI Analysis', desc: 'Response is sent to HalluciScan analyzer for verification.', icon: '🧠' },
  { num: '05', title: 'Score Calculated', desc: 'Hallucination probability is calculated using multiple sources.', icon: '📊' },
  { num: '06', title: 'Results Displayed', desc: 'A floating panel shows risk score and highlighted lines.', icon: '✅' },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg">Six simple steps from install to results.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="relative glass rounded-2xl p-6 group hover:bg-white/[0.08] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                {s.num}
              </div>
              <div className="text-3xl mb-3 mt-2">{s.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
