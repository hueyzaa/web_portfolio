import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import apiClient, { API_URL } from '../api/apiClient';

const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  overflow: hidden;
  background-color: var(--bg-color);
`;

const BackgroundImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url(${props => props.$imageUrl || ''});
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, var(--bg-color) 90%);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 896px;
  padding: 0 1.5rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: -0.05em;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 500;
  color: #cbd5e1;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.a`
  width: 100%;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1.125rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
    color: white;
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const SecondaryButton = styled.a`
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(12px);
  color: white;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1.125rem;
  transition: background 0.3s;
  
  &:hover {
    background: #1e293b;
    color: white;
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const HeroSection = () => {
  const [settings, setSettings] = React.useState<any>({});

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get('/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch settings', error);
      }
    };
    fetchSettings();
  }, []);

  const fullImageUrl = settings.hero_bg_image 
    ? (settings.hero_bg_image.startsWith('http') ? settings.hero_bg_image : `${API_URL}${settings.hero_bg_image}`)
    : undefined;

  return (
    <HeroWrapper id="hero">
      <BackgroundImage $imageUrl={fullImageUrl} />
      <HeroContent>
        <Title
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {settings.hero_title || 'Phan Gia Mẫn'}
        </Title>
        <Tagline
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {settings.hero_tagline || 'Nghệ sĩ Kỹ thuật số & Nhà thiết kế Thị giác'}
        </Tagline>
        <Description
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {settings.hero_description || 'Tạo ra những trải nghiệm kỹ thuật số đắm chìm thông qua nghệ thuật và thiết kế.'}
        </Description>
        <ButtonGroup>
          <PrimaryButton href="#portfolio">Xem Dự án</PrimaryButton>
          <SecondaryButton href="#contact">Liên hệ với tôi</SecondaryButton>
        </ButtonGroup>
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;
