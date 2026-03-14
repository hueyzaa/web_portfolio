import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Card, Popconfirm } from 'antd';
import { UserAddOutlined, DeleteOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

const AccountManager: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách tài khoản');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      await apiClient.post('/users', values);
      message.success('Tạo tài khoản thành công');
      setIsModalOpen(false);
      form.resetFields();
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Lỗi khi tạo tài khoản');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/users/${id}`);
      message.success('Xóa tài khoản thành công');
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Lỗi khi xóa tài khoản');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
    { title: 'Tên hiển thị', dataIndex: 'fullName', key: 'fullName' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa tài khoản này?"
            description="Bạn sẽ không thể đăng nhập bằng tài khoản này nữa."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1>Quản lý tài khoản Admin</h1>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsModalOpen(true)}>
          Thêm tài khoản
        </Button>
      </div>

      <Table columns={columns} dataSource={users} rowKey="id" loading={loading} />

      <Modal
        title="Tạo tài khoản mới"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 3, message: 'Tối thiểu 3 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Tối thiểu 6 ký tự' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="fullName" label="Tên hiển thị (Tùy chọn)">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManager;
