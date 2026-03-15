import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import apiClient, { API_URL } from '../api/apiClient';

const SectionWrapper = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 4rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.25fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 1.5rem;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid rgba(13, 89, 242, 0.2);
    border-radius: 1.5rem;
    pointer-events: none;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.7s;
  
  &:hover {
    filter: grayscale(0%);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.span`
  color: var(--primary-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  color: white;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #94a3b8;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatNumber = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

const AboutSection = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/public/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <SectionWrapper id="about">
      <Grid>
        <ImageContainer>
          <ProfileImage 
            src={profile.imageUrl 
              ? (profile.imageUrl.startsWith('http') ? profile.imageUrl : `${API_URL}${profile.imageUrl}`)
              : ""
            } 
            alt="Profile" 
          />
        </ImageContainer>
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Label>{profile.label || 'GIỚI THIỆU | TÔI'}</Label>
            <Title>{profile.title || 'Làm chủ sự giao thoa giữa công nghệ và sự sáng tạo'}</Title>
            <Description>
              {profile.description || 'Tôi là một nghệ sĩ kỹ thuật số...'}
            </Description>
            <StatsGrid>
              {profile.stats?.map((stat: any, index: number) => (
                <StatItem key={index}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsGrid>
          </motion.div>
        </Content>
      </Grid>
    </SectionWrapper>
  );
};

export default AboutSection;
