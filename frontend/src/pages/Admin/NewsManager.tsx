import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Switch, message, Modal, Spin } from 'antd';
import { SyncOutlined, StarOutlined, StarFilled, EyeInvisibleOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

const NewsManager = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/news/admin');
      setNews(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách tin tức');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await apiClient.post('/news/refresh');
      message.success('Đã cập nhật tin tức mới từ RSS');
      fetchNews();
    } catch (error) {
      message.error('Lỗi khi cập nhật tin tức');
    } finally {
      setRefreshing(false);
    }
  };

  const toggleFeature = async (id: number) => {
    try {
      await apiClient.patch(`/news/${id}/feature`);
      message.success('Đã cập nhật trạng thái nổi bật');
      setNews(news.map(n => n.id === id ? { ...n, is_featured: !n.is_featured } : n));
    } catch (error) {
      message.error('Lỗi cập nhật');
    }
  };

  const toggleHide = async (id: number) => {
    try {
      await apiClient.patch(`/news/${id}/hide`);
      message.success('Đã cập nhật trạng thái hiển thị');
      setNews(news.map(n => n.id === id ? { ...n, is_hidden: !n.is_hidden } : n));
    } catch (error) {
      message.error('Lỗi cập nhật');
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa tin tức này?',
      content: 'Hành động này không thể hoàn tác.',
      onOk: async () => {
        try {
          await apiClient.delete(`/news/${id}`);
          message.success('Đã xóa tin tức');
          setNews(news.filter(n => n.id !== id));
        } catch (error) {
          message.error('Lỗi khi xóa');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 100,
      render: (url: string) => (
        <div style={{ width: '80px', height: '50px', borderRadius: '4px', overflow: 'hidden', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {url ? (
            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center' }}>No Image</span>
          )}
        </div>
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="max-w-md">
          <a href={record.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-800">
            {text}
          </a>
        </div>
      ),
    },
    {
      title: 'Nguồn',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Phân loại',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag color="blue">{cat}</Tag>
    },
    {
      title: 'Nổi bật',
      dataIndex: 'is_featured',
      key: 'is_featured',
      render: (featured: boolean, record: any) => (
        <Switch 
          checked={featured} 
          onChange={() => toggleFeature(record.id)} 
          checkedChildren={<StarFilled />} 
          unCheckedChildren={<StarOutlined />}
        />
      ),
    },
    {
      title: 'Hiển thị',
      dataIndex: 'is_hidden',
      key: 'is_hidden',
      render: (hidden: boolean, record: any) => (
        <Switch 
          checked={!hidden} 
          onChange={() => toggleHide(record.id)} 
          checkedChildren={<EyeOutlined />} 
          unCheckedChildren={<EyeInvisibleOutlined />}
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Tin tức Aggregator</h1>
        <Button 
          type="primary" 
          icon={<SyncOutlined spin={refreshing} />} 
          onClick={handleRefresh}
          loading={refreshing}
        >
          Làm mới từ RSS
        </Button>
      </div>

      <Table 
        dataSource={news} 
        columns={columns} 
        rowKey="id" 
        loading={loading}
      />
    </div>
  );
};

export default NewsManager;
