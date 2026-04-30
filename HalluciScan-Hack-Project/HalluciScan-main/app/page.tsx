import Header from '@/components/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PlatformsSection from '@/components/landing/PlatformsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DownloadSection from '@/components/landing/DownloadSection';
import AboutSection from '@/components/landing/AboutSection';
import StatusSection from '@/components/landing/StatusSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PlatformsSection />
        <HowItWorksSection />
        <DownloadSection />
        <AboutSection />
        <StatusSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}