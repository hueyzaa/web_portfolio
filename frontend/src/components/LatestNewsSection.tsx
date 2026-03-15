import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import NewsCard from './news/NewsCard';
import NewsFilterTabs from './news/NewsFilterTabs';

const SectionWrapper = styled.section`
  padding: 8rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
  text-align: center;
  align-items: center;
`;

const Label = styled.span`
  color: var(--primary-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  background: rgba(var(--primary-rgb), 0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-top: 0.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: #94a3b8;
  max-width: 600px;
  line-height: 1.6;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ViewMoreBtn = styled(Link)`
  background: white;
  color: #0f172a;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.4);
  }
`;

const LatestNewsSection = () => {
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Technology', 'Design', 'Branding'];

  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'All' 
          ? '/news?limit=3' 
          : `/news?category=${activeCategory}&limit=3`;
        const response = await apiClient.get(url);
        // On landing page we might want more than 3 if they filter? 
        // User screenshot shows 3 categories visible. 
        // Let's keep it consistent with the "Latest" concept but maybe show up to 6 if filtered?
        // Actually, let's keep it to 3 or 6 to fill the grid.
        setLatestNews(response.data.slice(0, 6)); 
      } catch (error) {
        console.error('Failed to fetch latest news');
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, [activeCategory]);

  return (
    <SectionWrapper id="blog">
      <Header>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <Label>TIN TỨC & CẢM HỨNG</Label>
          <Title>Cập nhật mới nhất</Title>
          <Subtitle>
            Những xu hướng công nghệ, thiết kế và câu chuyện sáng tạo được tổng hợp tự động hàng ngày.
          </Subtitle>
        </motion.div>
      </Header>

      <FilterContainer>
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <NewsFilterTabs 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </motion.div>
      </FilterContainer>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Grid>
            {latestNews.map((news, index) => (
              <NewsCard key={news.id} news={news} index={index} />
            ))}
            {latestNews.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-500">
                Chưa có tin tức nào trong danh mục này.
              </div>
            )}
          </Grid>
        </>
      )}
    </SectionWrapper>
  );
};

export default LatestNewsSection;
