import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.4rem;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: fit-content;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabItem = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.3s ease;
  color: ${props => props.$active ? 'white' : '#94a3b8'};
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: white;
  }
`;

const ActiveHighlight = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: var(--primary-color);
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
  z-index: -1;
`;

interface NewsFilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryMnemonics: { [key: string]: string } = {
  All: 'Tất cả',
  Technology: 'Công nghệ',
  Design: 'Thiết kế',
  Branding: 'Thương hiệu'
};

const NewsFilterTabs: React.FC<NewsFilterTabsProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <TabsContainer>
      {categories.map(cat => (
        <TabItem 
          key={cat} 
          $active={activeCategory === cat}
          onClick={() => onCategoryChange(cat)}
        >
          {categoryMnemonics[cat] || cat}
          {activeCategory === cat && (
            <ActiveHighlight 
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </TabItem>
      ))}
    </TabsContainer>
  );
};

export default NewsFilterTabs;

