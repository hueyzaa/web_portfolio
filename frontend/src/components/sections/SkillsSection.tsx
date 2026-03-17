import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import apiClient from '../../api/apiClient';
import { useQuery } from '@tanstack/react-query';

const SectionWrapper = styled.section`
  padding: 8rem 2rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 6rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  gap: 5rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.span`
  background: var(--hologram-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.875rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  width: 100%;
  background: #1e293b;
  border-radius: 9999px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: var(--hologram-gradient);
  background-size: 200% auto;
  border-radius: 9999px;
  box-shadow: 0 0 10px rgba(0, 242, 255, 0.4);
  animation: shimmer 4s infinite linear;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceCard = styled.div`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: var(--primary-hologram);
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 242, 255, 0.15);
  }

  span {
    font-size: 2.5rem;
    background: var(--hologram-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    display: inline-block;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover span {
    transform: scale(1.15) rotate(5deg);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const ServiceDesc = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
`;

const ProfessionalServices = styled.div`
  margin-top: 8rem;
  text-align: center;
`;

const ServicesItems = styled.div`
  display: grid;
  gap: 2.5rem;
  margin-top: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceItemLarge = styled.div`
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(16px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: left;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-10px);
    border-color: var(--primary-hologram);
    box-shadow: 0 20px 40px rgba(0, 242, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  background: rgba(0, 242, 255, 0.05);
  border: 1px solid rgba(0, 242, 255, 0.1);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 242, 255, 0.1);

  span {
    font-size: 2.25rem;
    background: var(--hologram-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SkillsSection = () => {
  const { data: skills = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await apiClient.get('/public/skills');
      return res.data;
    },
  });

  const { data: services = [], isLoading: isLoadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await apiClient.get('/public/services');
      return res.data;
    },
  });

  const loading = isLoadingSkills || isLoadingServices;

  const gridServices = services.filter((s: any) => !s.isProfessional);
  const professionalServices = services.filter((s: any) => s.isProfessional);

  return (
    <SectionWrapper id="skills">
      <Container>
        <Grid>
          <Content>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Label>Kỹ Năng</Label>
              <Title>Kỹ năng chuyên môn</Title>
              <SkillsList>
                {loading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse h-12 bg-slate-800/50 rounded-lg w-full"></div>
                  ))
                ) : (
                  skills.map((skill: any) => (
                    <SkillItem key={skill.id}>
                      <SkillInfo>
                        <span>{skill.name}</span>
                        <span style={{ color: 'var(--primary-hologram)' }}>{skill.level}%</span>
                      </SkillInfo>
                      <ProgressBar>
                        <Progress width={skill.level} />
                      </ProgressBar>
                    </SkillItem>
                  ))
                )}
              </SkillsList>
            </motion.div>
          </Content>
          <ServicesGrid>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-800/50 rounded-2xl h-40 w-full border border-slate-700"></div>
              ))
            ) : (
              gridServices.map((service: any) => (
                <ServiceCard key={service.id}>
                  <span className="material-symbols-outlined">{service.icon}</span>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDesc>{service.description}</ServiceDesc>
                </ServiceCard>
              ))
            )}
          </ServicesGrid>
        </Grid>

        <ProfessionalServices>
          <Label>DỊCH VỤ</Label>
          <Title style={{ marginTop: '0.5rem' }}>Dịch vụ Chuyên nghiệp</Title>
          <ServicesItems>
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-800/50 rounded-2xl h-64 w-full border border-slate-700"></div>
              ))
            ) : (
              professionalServices.map((service: any) => (
                <ServiceItemLarge key={service.id}>
                  <IconWrapper>
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </IconWrapper>
                  <ServiceTitle style={{ fontSize: '1.5rem' }}>{service.title}</ServiceTitle>
                  <ServiceDesc style={{ fontSize: '1.125rem', marginTop: '1rem' }}>
                    {service.description}
                  </ServiceDesc>
                </ServiceItemLarge>
              ))
            )}
          </ServicesItems>
        </ProfessionalServices>
      </Container>
    </SectionWrapper>
  );
};

export default SkillsSection;
