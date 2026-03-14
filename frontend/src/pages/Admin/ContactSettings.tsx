import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

const ContactSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get('/settings');
        const data = response.data;
        form.setFieldsValue({
          contact_label: data.contact_label,
          contact_title: data.contact_title,
          contact_description: data.contact_description,
          contact_email: data.contact_email,
          contact_instagram: data.contact_instagram,
          contact_facebook: data.contact_facebook,
          contact_linkedin: data.contact_linkedin,
        });
      } catch (error) {
        message.error('Không thể tải cấu hình');
      }
    };
    fetchSettings();
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await apiClient.patch('/settings', values);
      message.success('Cập nhật cấu hình liên hệ thành công!');
    } catch (error) {
      message.error('Lỗi khi cập nhật cấu hình');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <Card 
        title="Cấu hình Mục Liên hệ" 
        extra={
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={() => form.submit()} 
            loading={loading}
          >
            Lưu thay đổi
          </Button>
        }
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Nhãn (Label)" name="contact_label">
            <Input placeholder="Ví dụ: LIÊN HỆ" />
          </Form.Item>
          <Form.Item label="Tiêu đề (Title)" name="contact_title">
            <Input placeholder="Ví dụ: Hãy cùng nhau hợp tác" />
          </Form.Item>
          <Form.Item label="Mô tả (Description)" name="contact_description">
            <Input.TextArea rows={4} placeholder="Mô tả ngắn về việc liên hệ..." />
          </Form.Item>
          <Form.Item label="Email liên hệ" name="contact_email">
            <Input placeholder="hello@example.com" />
          </Form.Item>
          <Form.Item label="Link Instagram" name="contact_instagram">
            <Input placeholder="https://instagram.com/..." />
          </Form.Item>
          <Form.Item label="Link Facebook" name="contact_facebook">
            <Input placeholder="https://facebook.com/..." />
          </Form.Item>
          <Form.Item label="Link LinkedIn" name="contact_linkedin">
            <Input placeholder="https://linkedin.com/..." />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ContactSettings;
