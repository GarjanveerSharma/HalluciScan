'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    q: 'What is AI hallucination?',
    a: 'AI hallucination refers to when a language model generates information that sounds confident and plausible but is actually incorrect, fabricated, or not supported by any real evidence. This is a known limitation of all current LLMs including ChatGPT, Gemini, and Claude.',
  },
  {
    q: 'How does HalluciScan detect hallucinations?',
    a: 'HalluciScan extracts individual factual claims from AI responses, searches for evidence from authoritative sources like Wikipedia, and uses advanced AI models to compare claims against evidence. Each claim receives a verdict (Factual, Hallucinated, or Uncertain) with a confidence score.',
  },
  {
    q: 'Does HalluciScan store my data?',
    a: 'No. HalluciScan processes all text in real-time and does not store any user queries, AI responses, or personal data. Your privacy is our priority. All analysis is performed per-session and discarded afterward.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'HalluciScan currently supports ChatGPT (chat.openai.com), Google Gemini, and Claude AI. Perplexity AI support is coming soon. The web analyzer at /analyzer works with any text input.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-white font-semibold pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className="text-purple-400 text-2xl shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
