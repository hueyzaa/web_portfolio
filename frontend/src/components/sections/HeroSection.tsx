import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Hero = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 2rem;
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const PrimaryBtn = styled.button`
  padding: 0.8rem 2rem;
  background: #3b82f6;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  color: white;
`;

const SecondaryBtn = styled.button`
  padding: 0.8rem 2rem;
  background: transparent;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  color: #3b82f6;
`;

const HeroSection: React.FC = () => {
  return (
    <Hero>
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Phan Gia Mẫn
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Nghệ sĩ Kỹ thuật số & Nhà thiết kế Trực quan, tạo ra những trải nghiệm kỹ thuật số đắm chìm thông qua nghệ thuật và thiết kế.
      </Subtitle>
      <CTAContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <PrimaryBtn>Xem dự án</PrimaryBtn>
        <SecondaryBtn>Liên hệ với tôi</SecondaryBtn>
      </CTAContainer>
    </Hero>
  );
};

export default HeroSection;
