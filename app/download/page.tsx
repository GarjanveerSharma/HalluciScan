import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DownloadPage() {
  const steps = [
    { num: '1', text: 'Open chrome://extensions' },
    { num: '2', text: 'Enable Developer Mode' },
    { num: '3', text: 'Click Load Unpacked' },
    { num: '4', text: 'Select extension folder' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-6xl mb-6">🛡️</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Download Ghost Extension</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Protect yourself from AI hallucinations. Install the Chrome extension and start verifying AI responses instantly.
            </p>
            
            <a
              href="/halluciscan-extension.zip"
              download
              className="cyber-btn inline-block px-10 py-5 rounded-none text-white font-bold text-xl transition-all duration-300 glow-cyan"
            >
              <span>⬇ Download Extension</span>
            </a>
          </div>

          <div className="glass rounded-2xl p-10 max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Installation Guide</h3>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-6 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold shrink-0">
                    {step.num}
                  </div>
                  <div className="text-lg text-gray-300 font-medium font-mono">
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
