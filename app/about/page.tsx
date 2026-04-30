import Header from '@/components/Header';
import AboutSection from '@/components/landing/AboutSection';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
