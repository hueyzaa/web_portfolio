import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowLeftOutlined } from "@ant-design/icons";
import apiClient, { API_URL } from "../../api/apiClient";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #101622;
  color: white;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 2rem 4rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #94a3b8;
  transition: color 0.3s;
  &:hover {
    color: var(--primary-color);
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Content = styled.div`
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: white;
  }
  .category {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .description {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #94a3b8;
  }
`;

const ContentItem = styled.div`
  margin-top: 2rem;
  
  .text-block {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #cbd5e1;
    white-space: pre-wrap;
  }
  
  .image-block {
    width: 100%;
    margin: 2rem 0;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    apiClient
      .get(`/public/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!project)
    return (
      <PageWrapper>
        <Navbar />
        <ContentContainer>Loading...</ContentContainer>
      </PageWrapper>
    );

  const contentBlocks = project.content ? JSON.parse(project.content) : [];

  return (
    <PageWrapper>
      <Navbar />
      <ContentContainer>
        <BackLink to="/">
          <ArrowLeftOutlined /> Quay lại Danh mục
        </BackLink>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HeroImage src={project.image.startsWith('http') ? project.image : `${API_URL}${project.image}`} alt={project.title} />
          <Content>
            <h1>{project.title}</h1>
            <p className="category">{project.category?.name}</p>
            <div className="description">{project.description}</div>
            
            {contentBlocks.map((block: any, index: number) => (
              <ContentItem key={index}>
                {block.type === 'text' ? (
                  <div className="text-block">{block.value}</div>
                ) : (
                  <img 
                    className="image-block" 
                    src={block.value.startsWith('http') ? block.value : `${API_URL}${block.value}`} 
                    alt={`Content ${index}`} 
                  />
                )}
              </ContentItem>
            ))}
          </Content>
        </motion.div>
      </ContentContainer>
      <Footer />
    </PageWrapper>
  );
};

export default ProjectDetail;
