import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
  const features = [
    {
      icon: '🔍',
      title: 'Detect Hallucinations',
      description: 'Identify factually incorrect or fabricated statements in AI-generated text with precision.',
    },
    {
      icon: '📊',
      title: 'Factual Accuracy Score',
      description: 'Get a quantified confidence score showing how reliable the AI response actually is.',
    },
    {
      icon: '⚠️',
      title: 'Hallucination Risk Score',
      description: 'Receive a risk rating (Low / Medium / High) for every AI response analyzed.',
    },
    {
      icon: '🖍️',
      title: 'Highlight Suspicious Lines',
      description: 'Suspicious claims are visually highlighted so you can spot problems instantly.',
    },
    {
      icon: '🌐',
      title: 'Works on AI Websites',
      description: 'The Chrome extension runs directly on ChatGPT, Gemini, Claude, and more.',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Powerful Features</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to verify AI-generated content and catch hallucinations before they cause damage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-white/[0.05] transition-all">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}