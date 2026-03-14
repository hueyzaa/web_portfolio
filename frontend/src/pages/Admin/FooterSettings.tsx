import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import apiClient from '../../api/apiClient';

const FooterSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get('/settings');
        const data = response.data;
        form.setFieldsValue({
          footer_copyright: data.footer_copyright,
          footer_socials: JSON.parse(data.footer_socials || '[]'),
        });
      } catch (error) {
        message.error('Không thể tải cấu hình footer');
      }
    };
    fetchSettings();
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        footer_copyright: values.footer_copyright,
        footer_socials: JSON.stringify(values.footer_socials),
      };
      await apiClient.patch('/settings', payload);
      message.success('Cập nhật footer thành công!');
    } catch (error) {
      message.error('Lỗi khi cập nhật footer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <Card title="Cấu hình Footer" extra={<Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()} loading={loading}>Lưu thay đổi</Button>}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Bản quyền (Copyright)" name="footer_copyright" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          
          <Divider orientation="left">Mạng xã hội (Social Links)</Divider>
          <Form.List name="footer_socials">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'label']} rules={[{ required: true, message: 'Thiếu tên!' }]}>
                      <Input placeholder="Tên (VD: Facebook)" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'url']} rules={[{ required: true, message: 'Thiếu link!' }]}>
                      <Input placeholder="Link (URL)" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm mạng xã hội
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Card>
    </div>
  );
};

export default FooterSettings;
