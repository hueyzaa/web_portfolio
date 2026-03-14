import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ProjectOutlined, MessageOutlined, CrownOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, s, m] = await Promise.all([
          apiClient.get('/projects'),
          apiClient.get('/skills'),
          apiClient.get('/contact')
        ]);
        setStats({
          projects: p.data.length,
          skills: s.data.length,
          messages: m.data.length
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Tổng quan</h1>
      <Row gutter={16} style={{ marginTop: '2rem' }}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng dự án" value={stats.projects} prefix={<ProjectOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Kỹ năng" value={stats.skills} prefix={<CrownOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Tin nhắn mới" value={stats.messages} prefix={<MessageOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
