import React from 'react';
import styled from 'styled-components';

const About = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid #3b82f6;
    z-index: -1;
    border-radius: 12px;
  }
`;

const Img = styled.div`
  width: 100%;
  aspect-ratio: 4/5;
  background: #1e293b;
  border-radius: 12px;
  background-image: url('');
  background-size: cover;
  background-position: center;
`;

const Info = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    line-height: 1.2;
  }
  p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 3rem;
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  h3 {
    font-size: 2rem;
    color: #3b82f6;
  }
  span {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
`;

const AboutSection: React.FC = () => {
  return (
    <About id="about">
      <ImageContainer>
        <Img />
      </ImageContainer>
      <Info>
        <span>GIỚI THIỆU</span>
        <h2>Sự giao thoa giữa công nghệ và sáng tạo</h2>
        <p>
          Tôi là một nghệ sĩ kỹ thuật số sống tại Việt Nam với hơn 5 năm kinh nghiệm trong ngành sáng tạo. 
          Công việc của tôi tập trung vào minh họa kỹ thuật số, nghệ thuật ý tưởng chất lượng cao và thiết kế thị giác hiện đại. 
          Tôi tin vào sức mạnh của việc kể chuyện bằng hình ảnh để tạo ra những kết nối cảm xúc và trải nghiệm thương hiệu khó quên.
        </p>
        <Stats>
          <StatItem>
            <h3>50+</h3>
            <span>Dự án hoàn thành</span>
          </StatItem>
          <StatItem>
            <h3>12+</h3>
            <span>Giải thưởng quốc tế</span>
          </StatItem>
        </Stats>
      </Info>
    </About>
  );
};

export default AboutSection;
