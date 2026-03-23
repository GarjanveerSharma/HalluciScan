'use client';
import { motion } from 'framer-motion';

const platforms = [
  { name: 'ChatGPT', icon: '💬', color: 'from-green-500/20 to-green-600/5', status: 'Active' },
  { name: 'Gemini', icon: '✨', color: 'from-blue-500/20 to-blue-600/5', status: 'Active' },
  { name: 'Claude', icon: '🧠', color: 'from-orange-500/20 to-orange-600/5', status: 'Beta' },
  { name: 'Perplexity', icon: '🔎', color: 'from-purple-500/20 to-purple-600/5', status: 'Coming Soon' },
];

export default function PlatformsSection() {
  return (
    <section id="platforms" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Works on Your Favorite <span className="gradient-text">AI Platforms</span>
          </h2>
          <p className="text-gray-400 text-lg">Seamlessly integrates with the tools you already use.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p, i) => (
            <motion.div
              key={i}
              className={`glass rounded-2xl p-8 text-center relative overflow-hidden group cursor-default`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-5xl mb-4">{p.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  p.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  p.status === 'Beta' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {p.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
