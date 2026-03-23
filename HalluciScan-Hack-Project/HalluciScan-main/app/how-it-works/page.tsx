import Navbar from '../../components/Header';
import HowItWorks from '../../components/HowItWorks';
import Footer from '../../components/Footer';

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar />
      <section className="how-it-works-page section">
        <div className="container">
          <div className="page-header text-center">
            <h1>How It Works</h1>
            <p>
              Learn about our comprehensive process for detecting AI hallucinations
              and ensuring content reliability.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>
      <Footer />
    </main>
  );
}