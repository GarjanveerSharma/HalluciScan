'use client';


export default function Hero() {
  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content">
          <h1 className="fade-in-up">
            Detect AI Hallucinations with
            <span className="gradient-text"> Precision</span>
          </h1>
          <p className="hero-subtitle fade-in-up">
            HalluciScan analyzes AI-generated text in real time — extracting claims,
            cross-referencing trusted sources, and scoring factual reliability
            with evidence-backed confidence.
          </p>
          <div className="hero-actions fade-in-up">
            <a href="#demo" className="btn btn-primary">
              🔍 Try Analyzer
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              Learn More →
            </a>
          </div>
        </div>
        <div className="hero-visual fade-in-up">
          <div className="demo-preview">
            <div className="demo-header">
              <div className="demo-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="demo-title">HalluciScan Analysis</span>
            </div>
            <div className="demo-content">
              <div className="demo-text">
                &quot;The Eiffel Tower was built in 1889 and stands at 324 meters tall...&quot;
              </div>
              <div className="demo-result">
                <div className="demo-score">
                  <span className="score-number">15.7%</span>
                  <span className="score-label">Hallucination Risk</span>
                </div>
                <div className="demo-highlight">
                  <span className="highlight-text">stands at 324 meters</span>
                  <span className="highlight-badge low">✅ Low Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}