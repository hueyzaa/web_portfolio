import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Upload, Select, Tag, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, GlobalOutlined, StopOutlined } from '@ant-design/icons';
import apiClient, { API_URL } from '../../api/apiClient';

const PostsManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/admin/posts');
      setPosts(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách bài viết');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (values: any) => {
    try {
      const payload = { 
        ...values, 
        image: imageUrl,
      };
      
      if (editingPost) {
        await apiClient.patch(`/admin/posts/${editingPost.id}`, payload);
        message.success('Cập nhật bài viết thành công');
      } else {
        await apiClient.post('/admin/posts', payload);
        message.success('Tạo bài viết mới thành công');
      }
      
      setIsModalOpen(false);
      form.resetFields();
      setImageUrl('');
      setEditingPost(null);
      fetchData();
    } catch (error: any) {
      message.error(`Thao tác thất bại: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa bài viết này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        await apiClient.delete(`/admin/posts/${id}`);
        message.success('Xóa bài viết thành công');
        fetchData();
      }
    });
  };

  const togglePublish = async (record: any) => {
    try {
      const endpoint = record.status === 'published' ? 'unpublish' : 'publish';
      await apiClient.patch(`/admin/posts/${record.id}/${endpoint}`);
      message.success(record.status === 'published' ? 'Đã gỡ bài viết' : 'Đã xuất bản bài viết');
      fetchData();
    } catch (error) {
      message.error('Thao tác thất bại');
    }
  };

  const toggleFeatured = async (record: any) => {
    try {
      await apiClient.patch(`/admin/posts/${record.id}`, { is_featured: !record.is_featured });
      message.success('Đã cập nhật trạng thái nổi bật');
      fetchData();
    } catch (error) {
      message.error('Thao tác thất bại');
    }
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { 
      title: 'Nguồn', 
      dataIndex: 'source', 
      key: 'source',
      render: (source: string) => source || 'Thủ công'
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'gray'}>
          {status === 'published' ? 'Đã xuất bản' : 'Nháp'}
        </Tag>
      )
    },
    { 
      title: 'Nổi bật', 
      dataIndex: 'is_featured', 
      key: 'is_featured',
      render: (featured: boolean, record: any) => (
        <Switch checked={featured} onChange={() => toggleFeatured(record)} />
      )
    },
    { 
      title: 'Ngày tạo', 
      dataIndex: 'created_at', 
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            title={record.status === 'published' ? 'Gỡ bài' : 'Xuất bản'}
            icon={record.status === 'published' ? <StopOutlined /> : <GlobalOutlined />} 
            onClick={() => togglePublish(record)} 
          />
          <Button icon={<EditOutlined />} onClick={() => {
            setEditingPost(record);
            form.setFieldsValue(record);
            setImageUrl(record.image || '');
            setIsModalOpen(true);
          }} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>Quản lý Tin tức & Blog</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
          setEditingPost(null);
          form.resetFields();
          setImageUrl('');
          setIsModalOpen(true);
        }}>Thêm Bài viết</Button>
      </div>
      <Table columns={columns} dataSource={posts} rowKey="id" />

      <Modal
        title={editingPost ? 'Chỉnh sửa Bài viết' : 'Thêm Bài viết'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={1000}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="summary" label="Tóm tắt">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
            <Input.TextArea rows={10} />
          </Form.Item>
          
          <Form.Item label="Hình ảnh">
            <div style={{ marginBottom: 8 }}>
              {imageUrl && <img src={imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`} alt="Preview" style={{ width: 200, borderRadius: 4 }} />}
            </div>
            <Upload
              name="image"
              action={`${API_URL}/upload/image`}
              showUploadList={false}
              onChange={(info) => {
                if (info.file.status === 'done') {
                  setImageUrl(info.file.response.url);
                  message.success('Tải lên hình ảnh thành công');
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL hình ảnh" style={{ marginTop: 8 }} />
          </Form.Item>

          <Form.Item name="source" label="Nguồn (tùy chọn)">
            <Input placeholder="Ví dụ: Creative Bloq" />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Form.Item name="meta_title" label="SEO Title">
              <Input />
            </Form.Item>
            <Form.Item name="meta_description" label="SEO Description">
              <Input.TextArea rows={2} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsManager;
