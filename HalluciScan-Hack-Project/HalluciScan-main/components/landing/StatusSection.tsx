'use client';
import { motion } from 'framer-motion';

const statuses = [
  { name: 'ChatGPT', status: 'Active', color: 'bg-green-400', glow: 'glow-green' },
  { name: 'Gemini', status: 'Active', color: 'bg-green-400', glow: 'glow-green' },
  { name: 'Claude', status: 'Beta', color: 'bg-orange-400', glow: 'glow-orange' },
  { name: 'Perplexity', status: 'Coming Soon', color: 'bg-blue-400', glow: 'glow-blue' },
];

export default function StatusSection() {
  return (
    <section id="status" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="gradient-text">Status</span>
          </h2>
          <p className="text-gray-400 text-lg">Real-time extension availability across platforms.</p>
        </motion.div>

        <div className="space-y-4">
          {statuses.map((s, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl px-6 py-5 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-white font-semibold text-lg">{s.name}</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${
                  s.status === 'Active' ? 'text-green-400' :
                  s.status === 'Beta' ? 'text-orange-400' : 'text-blue-400'
                }`}>
                  {s.status}
                </span>
                <span className={`w-3 h-3 rounded-full ${s.color} pulse-dot ${s.glow}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
