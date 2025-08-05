import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import FeedbackSection from '@/components/FeedbackSection';
import Footer from '@/components/Footer';

const Verifact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <AboutSection />
        <ContactSection />
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
};

export default Verifact;