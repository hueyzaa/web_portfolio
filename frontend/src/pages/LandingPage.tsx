import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import SkillsSection from '../components/sections/SkillsSection';
import ServicesSection from '../components/sections/ServicesSection';
import LatestNewsSection from '../components/sections/LatestNewsSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const sectionId = path.substring(1); // remove leading '/'
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname]);

  return (
    <div style={{ backgroundColor: '#101622' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <SkillsSection />
      <ServicesSection />
      <LatestNewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
