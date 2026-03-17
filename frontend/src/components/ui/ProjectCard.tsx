import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_URL } from '../../api/apiClient';
import TiltCard from '../common/TiltCard';

const CardLink = styled(Link)<{ $offset?: boolean }>`
  position: relative;
  display: block;
  aspect-ratio: 4/5;
  border-radius: 2rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 2rem;
    padding: 1px;
    background: var(--hologram-gradient);
    -webkit-mask: 
       linear-gradient(#fff 0 0) content-box, 
       linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: transparent;
    box-shadow: 0 20px 40px -15px rgba(0, 242, 255, 0.2);
    
    &::before {
      opacity: 0.6;
    }
  }
  
  @media (min-width: 1024px) {
    margin-top: ${props => props.$offset ? '3rem' : '0'};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
  
  ${CardLink}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(16, 22, 34, 0.8), transparent, transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  opacity: 1;
  transform: translateY(1rem);
  transition: transform 0.3s;

  ${CardLink}:hover & {
    transform: translateY(0);
  }
`;

const Category = styled.p`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  background: var(--hologram-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

interface ProjectProps {
  project: {
    id: string | number;
    title: string;
    category: { name: string } | string;
    image: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, index }) => {
  const isOffset = index % 3 === 1; // Offset middle items in a 3-column grid
  const categoryName = typeof project.category === 'string' ? project.category : project.category?.name;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard>
        <CardLink
          to={`/project/${project.id}`}
          $offset={isOffset}
        >
          <Image src={`${API_URL}${project.image}`} alt={project.title} />
          <Overlay>
            <Category>{categoryName}</Category>
            <Title>{project.title}</Title>
          </Overlay>
        </CardLink>
      </TiltCard>
    </motion.div>
  );
};

export default ProjectCard;
