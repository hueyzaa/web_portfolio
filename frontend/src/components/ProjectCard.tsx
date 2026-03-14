import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/apiClient';

const CardLink = styled(Link)<{ $offset?: boolean }>`
  position: relative;
  display: block;
  aspect-ratio: 4/5;
  border-radius: 1.5rem;
  overflow: hidden;
  background: #1e293b;
  cursor: pointer;
  
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
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary-color);
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
    </motion.div>
  );
};

export default ProjectCard;
