'use client';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🔍',
    title: 'Detect Hallucinations',
    desc: 'Identify factually incorrect or fabricated statements in AI-generated text with precision.',
  },
  {
    icon: '📊',
    title: 'Factual Accuracy Score',
    desc: 'Get a quantified confidence score showing how reliable the AI response actually is.',
  },
  {
    icon: '⚠️',
    title: 'Hallucination Risk Score',
    desc: 'Receive a risk rating (Low / Medium / High) for every AI response analyzed.',
  },
  {
    icon: '🖍️',
    title: 'Highlight Suspicious Lines',
    desc: 'Suspicious claims are visually highlighted so you can spot problems instantly.',
  },
  {
    icon: '🌐',
    title: 'Works on AI Websites',
    desc: 'The Chrome extension runs directly on ChatGPT, Gemini, Claude, and more.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to verify AI-generated content and catch hallucinations before they cause damage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300 group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
