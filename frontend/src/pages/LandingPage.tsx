import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import SkillsSection from '../components/SkillsSection';
import ServicesSection from '../components/sections/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#101622' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <SkillsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
