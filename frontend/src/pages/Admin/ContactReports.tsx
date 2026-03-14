import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Card, Typography, Modal } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';
import dayjs from 'dayjs';

const { Paragraph } = Typography;

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const ContactReports: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/contact');
      setMessages(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách tin nhắn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/contact/${id}`);
      message.success('Xóa tin nhắn thành công');
      fetchMessages();
    } catch (error) {
      message.error('Lỗi khi xóa tin nhắn');
    }
  };

  const showMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsModalVisible(true);
  };

  const columns = [
    { 
      title: 'Ngày gửi', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
      sorter: (a: ContactMessage, b: ContactMessage) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Nội dung', 
      dataIndex: 'message', 
      key: 'message',
      ellipsis: true,
      render: (text: string) => text.length > 50 ? text.substring(0, 50) + '...' : text
    },
    { 
      title: 'Thao tác', 
      key: 'action', 
      render: (_: any, record: ContactMessage) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => showMessage(record)}>Xem</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý Liên hệ">
      <Table 
        columns={columns} 
        dataSource={messages} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Chi tiết tin nhắn"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>Đóng</Button>
        ]}
      >
        {selectedMessage && (
          <div>
            <p><strong>Người gửi:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
            <p><strong>Ngày gửi:</strong> {dayjs(selectedMessage.createdAt).format('DD/MM/YYYY HH:mm')}</p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <Paragraph>{selectedMessage.message}</Paragraph>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ContactReports;
