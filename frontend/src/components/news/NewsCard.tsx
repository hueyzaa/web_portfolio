import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.02)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(var(--primary-rgb), 0.5);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.1);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent);
  }
`;

const SourceBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
`;

const ContentPanel = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  color: #94a3b8;
`;

const CategoryTag = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const TitleText = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: var(--primary-color);
  }
`;

const SummaryText = styled.p`
  font-size: 0.9375rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActionFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExternalLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
    gap: 0.75rem;
  }
`;

interface NewsCardProps {
  news: any;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, index }) => {
  const publishedDate = news.published_at
    ? new Date(news.published_at).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Chưa rõ ngày";

  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <ImageContainer>
        <SourceBadge>{news.source}</SourceBadge>
        <img
          src={
            news.thumbnail ||
            "https://via.placeholder.com/600x400?text=PGM+News"
          }
          alt={news.title}
          loading="lazy"
        />
      </ImageContainer>

      <ContentPanel>
        <HeaderMeta>
          <CategoryTag>{news.category || "Chung"}</CategoryTag>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>{publishedDate}</span>
        </HeaderMeta>

        <TitleText>{news.title}</TitleText>
        <SummaryText>{news.description}</SummaryText>

        <ActionFooter>
          <ExternalLink
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem chi tiết
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </ExternalLink>
        </ActionFooter>
      </ContentPanel>
    </Card>
  );
};

export default NewsCard;
