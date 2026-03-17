import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import apiClient, { API_URL } from '../../api/apiClient';
import { useQuery } from '@tanstack/react-query';
import LiquidEther from '../common/LiquidEther';

const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  overflow: hidden;
  background-color: transparent;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, var(--bg-color) 90%);
    z-index: 2;
  }
`;

const BackgroundImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url(${props => props.$imageUrl || ''});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  filter: saturate(1.5) contrast(1.1);
  mix-blend-mode: color-dodge;
`;

const HologramAura = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 60%;
  background: radial-gradient(circle at center, rgba(0, 242, 255, 0.1) 0%, transparent 60%);
  filter: blur(100px);
  z-index: 1;
  pointer-events: none;
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
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
               0 0 40px rgba(0, 242, 255, 0.1);

  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--hologram-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

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
  padding: 1.25rem 2.5rem;
  background: var(--hologram-gradient);
  background-size: 200% auto;
  color: white;
  border-radius: 1rem;
  font-weight: 800;
  font-size: 1.125rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 25px rgba(0, 242, 255, 0.3);
  
  &:hover {
    background-position: right center;
    transform: scale(1.05) translateY(-4px);
    box-shadow: 0 12px 35px rgba(189, 0, 255, 0.5);
    color: white;
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const SecondaryButton = styled.a`
  width: 100%;
  padding: 1.25rem 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  font-weight: 800;
  font-size: 1.125rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--primary-hologram);
    transform: translateY(-2px);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 242, 255, 0.2);
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const HeroSection = () => {
  const { data: settings = {} } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await apiClient.get('/public/settings');
      return response.data;
    },
  });

  const fullImageUrl = settings.hero_bg_image 
    ? (settings.hero_bg_image.startsWith('http') ? settings.hero_bg_image : `${API_URL}${settings.hero_bg_image}`)
    : undefined;

  return (
    <HeroWrapper id="hero">
      <BackgroundContainer>
        <BackgroundImage $imageUrl={fullImageUrl} />
        <HologramAura />
      </BackgroundContainer>
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
