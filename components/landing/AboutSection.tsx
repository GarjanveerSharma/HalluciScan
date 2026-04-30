'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Ghost</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Ghost is an AI hallucination detection system that verifies factual claims in
                AI-generated text. As large language models become ubiquitous, the risk of
                hallucinated content — fabricated facts presented as truth — grows exponentially.
              </p>
              <p>
                Our system extracts individual claims from AI responses, cross-references them
                against authoritative sources like Wikipedia, and uses advanced AI models to
                determine whether each claim is factual, hallucinated, or uncertain.
              </p>
              <p>
                Whether you are a researcher, student, journalist, or professional — Ghost
                helps you trust but verify AI-generated content.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2">
                <p className="text-white font-medium">Created by: <span className="text-purple-400">Garjanveer Sharma</span></p>
                <a href="https://github.com/GarjanveerSharma" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: 50000, suffix: '+', label: 'AI Responses Analyzed' },
              { value: 4, suffix: '', label: 'Platforms Supported' },
              { value: 97, suffix: '%', label: 'Accuracy Score' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
