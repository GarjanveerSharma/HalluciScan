import Header from '@/components/Header';
import HeroSection from '@/components/landing/HeroSection';
import PlatformsSection from '@/components/landing/PlatformsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import StatusSection from '@/components/landing/StatusSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PlatformsSection />
        <HowItWorksSection />
        <StatusSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}