import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Card, Select, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  isProfessional: boolean;
}

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/services');
      setServices(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/services/${id}`);
      message.success('Xóa dịch vụ thành công');
      fetchServices();
    } catch (error) {
      message.error('Lỗi khi xóa dịch vụ');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await apiClient.put(`/services/${editingId}`, values);
        message.success('Cập nhật dịch vụ thành công');
      } else {
        await apiClient.post('/services', values);
        message.success('Thêm dịch vụ mới thành công');
      }
      setIsModalVisible(false);
      fetchServices();
    } catch (error) {
      message.error('Lỗi khi lưu thông tin dịch vụ');
    }
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { 
      title: 'Loại', 
      dataIndex: 'isProfessional', 
      key: 'isProfessional',
      render: (isProf: boolean) => isProf ? 'Chuyên nghiệp (Lớn)' : 'Lưới (Nhỏ)'
    },
    { title: 'Icon', dataIndex: 'icon', key: 'icon' },
    { 
      title: 'Thao tác', 
      key: 'action', 
      render: (_: any, record: Service) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý Dịch vụ" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm Dịch vụ</Button>}>
      <Table 
        columns={columns} 
        dataSource={services} 
        rowKey="id" 
        loading={loading} 
        pagination={false}
      />

      <Modal
        title={editingId ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề dịch vụ"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input placeholder="Ví dụ: Thiết kế UI, Điêu khắc 3D" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea rows={4} placeholder="Mô tả ngắn gọn về dịch vụ" />
          </Form.Item>
          <Form.Item
            name="icon"
            label="Icon (Material Symbol name)"
            rules={[{ required: true, message: 'Vui lòng nhập tên icon!' }]}
          >
            <Input placeholder="Ví dụ: brush, layers, palette, draw" />
          </Form.Item>
          <Form.Item
            name="isProfessional"
            label="Dịch vụ chuyên nghiệp (hiển thị phần dưới)"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ServicesManager;
