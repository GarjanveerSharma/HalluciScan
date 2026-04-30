'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Platforms', href: '/#platforms' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Download', href: '/download' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'dark';
    setTheme(stored);
    if (stored === 'light') {
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-slate-950/80 border-b border-white/10 py-3 shadow-2xl shadow-purple-500/10'
          : 'py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold flex items-center gap-2 tracking-tight">
          <img src="/ghost_logo.png" alt="Ghost Logo" className="w-8 h-8 object-contain" />
          <span className="gradient-text">Ghost</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/analyzer"
            className="cyber-btn px-5 py-2 rounded-none text-white text-sm font-semibold transition-all duration-250"
          >
            <span>Try Demo</span>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <motion.div
          className="md:hidden glass-strong mt-2 mx-4 rounded-xl p-4 space-y-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-300 hover:text-white py-2 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/analyzer"
            className="cyber-btn block text-center px-5 py-2 rounded-none text-white text-sm font-semibold"
          >
            <span>Try Demo</span>
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}