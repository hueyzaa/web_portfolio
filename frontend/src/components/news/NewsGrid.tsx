import React from 'react';
import styled from 'styled-components';
import NewsCard from './NewsCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

interface NewsGridProps {
  newsList: any[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ newsList }) => {
  if (!newsList || newsList.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0', color: '#94a3b8' }}>
        <p className="text-lg">Không tìm thấy bài viết nào trong danh mục này.</p>
      </div>
    );
  }

  return (
    <Grid>
      {newsList.map((news, index) => (
        <NewsCard key={news.id || news.url} news={news} index={index} />
      ))}
    </Grid>
  );
};

export default NewsGrid;

