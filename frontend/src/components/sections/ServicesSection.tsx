import React from 'react';
import styled from 'styled-components';
import { AppstoreOutlined, BuildOutlined, RocketOutlined } from '@ant-design/icons';

const Services = styled.section`
  padding: 5rem 2rem;
  background: transparent;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const ServiceCard = styled.div`
  padding: 3rem;
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  text-align: left;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2.5rem;
    color: #3b82f6;
    margin-bottom: 1.5rem;
  }

  h3 {
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Minh họa kỹ thuật số',
      desc: 'Các tác phẩm minh họa 2D/3D chất lượng cao cho tạp chí, trang web và tài liệu quảng cáo với dấu ấn nghệ thuật độc đáo.',
      icon: <AppstoreOutlined />
    },
    {
      title: 'Nghệ thuật ý tưởng',
      desc: 'Xây dựng thế giới, thiết kế nhân vật và nghệ thuật ý tưởng môi trường cho các dự án game, hoạt hình và sản xuất phim.',
      icon: <BuildOutlined />
    },
    {
      title: 'Thương hiệu & Thiết kế thị giác',
      desc: 'Bản sắc thị giác hiện đại, logo và thiết kế UI/UX nâng tầm thương hiệu và thu hút khách hàng mục tiêu của bạn.',
      icon: <RocketOutlined />
    }
  ];

  return (
    <Services id="services">
      <Content>
        <span>TÔI LÀM GÌ</span>
        <h2 style={{ fontSize: '2.5rem' }}>Dịch vụ chuyên nghiệp</h2>
        <Grid>
          {services.map((service, i) => (
            <ServiceCard key={i}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </ServiceCard>
          ))}
        </Grid>
      </Content>
    </Services>
  );
};

export default ServicesSection;
