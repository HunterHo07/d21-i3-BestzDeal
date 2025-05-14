import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ComparisonSection from '@/components/sections/ComparisonSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ParticleField from '@/components/animations/ParticleField';
import AuroraEffect from '@/components/animations/AuroraEffect';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Background effects */}
      <ParticleField count={50} color="#4F46E5" />
      <AuroraEffect />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <ProcessSteps />
        <ComparisonSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
