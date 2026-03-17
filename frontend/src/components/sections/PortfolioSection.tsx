import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";
import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";

const SectionWrapper = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.3);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
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
  color: white;
  margin-top: 0.5rem;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const FilterBtn = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.active ? 'var(--primary-color)' : '#94a3b8'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  transition: all 0.3s;
  
  &:hover {
    color: ${props => props.active ? 'var(--primary-color)' : '#f1f5f9'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await apiClient.get("/public/projects");
      return res.data;
    },
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiClient.get("/public/categories");
      return res.data;
    },
  });

  const loading = isLoadingProjects || isLoadingCategories;

  const filteredProjects = activeCategory
    ? projects.filter((p: any) => p.category?.id === activeCategory)
    : projects;

  return (
    <SectionWrapper id="portfolio">
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Label>DỰ ÁN</Label>
          <Title>Các dự án tiêu biểu</Title>
        </motion.div>
        <FilterButtons>
          <FilterBtn 
            active={activeCategory === null} 
            onClick={() => setActiveCategory(null)}
          >
            Tất cả
          </FilterBtn>
          {categories.map((cat: any) => (
            <FilterBtn 
              key={cat.id} 
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </FilterBtn>
          ))}
        </FilterButtons>
      </Header>
      {loading ? (
        <Grid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-slate-800/50 rounded-2xl h-[400px] w-full border border-slate-700"></div>
          ))}
        </Grid>
      ) : (
        <Grid>
          {filteredProjects.map((project: any, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </Grid>
      )}
    </SectionWrapper>
  );
};

export default PortfolioSection;
