import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

interface Skill {
  id: number;
  name: string;
  icon: string;
  level: number;
}

const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/skills');
      setSkills(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách kỹ năng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    form.setFieldsValue(skill);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/skills/${id}`);
      message.success('Xóa kỹ năng thành công');
      fetchSkills();
    } catch (error) {
      message.error('Lỗi khi xóa kỹ năng');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await apiClient.put(`/skills/${editingId}`, values);
        message.success('Cập nhật kỹ năng thành công');
      } else {
        await apiClient.post('/skills', values);
        message.success('Thêm kỹ năng mới thành công');
      }
      setIsModalVisible(false);
      fetchSkills();
    } catch (error) {
      message.error('Lỗi khi lưu thông tin kỹ năng');
    }
  };

  const columns = [
    { title: 'Tên kỹ năng', dataIndex: 'name', key: 'name' },
    { title: 'Level (%)', dataIndex: 'level', key: 'level', render: (level: number) => `${level}%` },
    { 
      title: 'Thao tác', 
      key: 'action', 
      render: (_: any, record: Skill) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý Kỹ năng" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm Kỹ năng</Button>}>
      <Table 
        columns={columns} 
        dataSource={skills} 
        rowKey="id" 
        loading={loading} 
        pagination={false}
      />

      <Modal
        title={editingId ? 'Chỉnh sửa kỹ năng' : 'Thêm kỹ năng mới'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên kỹ năng"
            rules={[{ required: true, message: 'Vui lòng nhập tên kỹ năng!' }]}
          >
            <Input placeholder="Ví dụ: Photoshop, Blender, UI/UX" />
          </Form.Item>
          <Form.Item
            name="level"
            label="Mức độ (%)"
            rules={[{ required: true, message: 'Vui lòng nhập mức độ!' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="Nhập phần trăm (0-100)" />
          </Form.Item>
          {/* Note: Icon field exists in DB but is not currently used in the main SkillsSection display 
              (it uses hardcoded material icons for services but none for the skill bars).
              Keeping it simple for now as per the current UI. */}
        </Form>
      </Modal>
    </Card>
  );
};

export default SkillsManager;
