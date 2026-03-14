import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

interface Category {
  id: number;
  name: string;
}

const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async (values: { name: string }) => {
    try {
      if (editingCategory) {
        await apiClient.put(`/categories/${editingCategory.id}`, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        await apiClient.post('/categories', values);
        message.success('Thêm danh mục thành công');
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      message.error('Thao tác thất bại');
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      content: 'Điều này có thể ảnh hưởng đến các dự án đang thuộc danh mục này.',
      onOk: async () => {
        try {
          await apiClient.delete(`/categories/${id}`);
          message.success('Xóa danh mục thành công');
          fetchCategories();
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingCategory(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }} 
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>Quản lý Danh mục</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            setEditingCategory(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Thêm Danh mục
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={categories} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title={editingCategory ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item 
            name="name" 
            label="Tên danh mục" 
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input placeholder="Ví dụ: Minh họa, 3D Art, ..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesManager;
