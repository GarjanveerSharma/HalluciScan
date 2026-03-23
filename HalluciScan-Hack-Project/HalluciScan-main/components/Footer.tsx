export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-4 bg-dark-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-bold gradient-text mb-3">🛡️ HalluciScan</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI Hallucination Detection System. Verify AI-generated content with real-time fact-checking.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <div className="space-y-3">
              <a href="/#features" className="block text-gray-500 text-sm hover:text-white transition-colors">Features</a>
              <a href="/#platforms" className="block text-gray-500 text-sm hover:text-white transition-colors">Platforms</a>
              <a href="/#how-it-works" className="block text-gray-500 text-sm hover:text-white transition-colors">How It Works</a>
              <a href="/#download" className="block text-gray-500 text-sm hover:text-white transition-colors">Download</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <div className="space-y-3">
              <a href="/analyzer" className="block text-gray-500 text-sm hover:text-white transition-colors">Live Analyzer</a>
              <a href="/#faq" className="block text-gray-500 text-sm hover:text-white transition-colors">FAQ</a>
              <a href="/#about" className="block text-gray-500 text-sm hover:text-white transition-colors">About</a>
              <a href="/#status" className="block text-gray-500 text-sm hover:text-white transition-colors">Status</a>
            </div>
          </div>

          {/* Extension */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Chrome Extension</h4>
            <div className="space-y-3">
              <a href="/halluciscan-extension.zip" download className="block text-gray-500 text-sm hover:text-white transition-colors">⬇ Download Extension</a>
              <span className="block text-gray-600 text-xs">Supports: ChatGPT, Gemini, Claude</span>
              <span className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
                <span className="text-gray-500">Extension Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} HalluciScan. Built for hackathon. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <span>Made by Team Paradox 🚀</span>
            <span>•</span>
            <span>Powered by Gemini + Wikipedia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}