import Navbar from '../../components/Header';
import FeatureCards from '../../components/FeatureCards';
import Footer from '../../components/Footer';

export default function FeaturesPage() {
  return (
    <main>
      <Navbar />
      <section className="features-page section">
        <div className="container">
          <div className="page-header text-center">
            <h1>Features</h1>
            <p>
              Discover the comprehensive suite of tools designed to detect
              and analyze AI hallucinations with precision.
            </p>
          </div>
          <FeatureCards />
        </div>
      </section>
      <Footer />
    </main>
  );
}