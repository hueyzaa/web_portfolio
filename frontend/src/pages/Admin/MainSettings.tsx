import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import apiClient, { API_URL } from '../../api/apiClient';

const MainSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get('/settings');
        const data = response.data;
        form.setFieldsValue({
          site_name: data.site_name,
          hero_title: data.hero_title,
          hero_tagline: data.hero_tagline,
          hero_description: data.hero_description,
        });
        setImageUrl(data.hero_bg_image);
        setLogoUrl(data.site_logo);
      } catch (error) {
        message.error('Không thể tải cấu hình');
      }
    };
    fetchSettings();
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = { ...values, hero_bg_image: imageUrl, site_logo: logoUrl };
      await apiClient.patch('/settings', payload);
      message.success('Cập nhật cấu hình thành công!');
    } catch (error) {
      message.error('Lỗi khi cập nhật cấu hình');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <Card title="Cấu hình Thông tin chính & Hero" extra={<Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()} loading={loading}>Lưu thay đổi</Button>}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Tên trang web (Header)" name="site_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tiêu đề Hero" name="hero_title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tagline Hero" name="hero_tagline">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả Hero" name="hero_description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Logo trang web">
            <div style={{ marginBottom: '1rem' }}>
              {logoUrl && <img src={logoUrl.startsWith('http') ? logoUrl : `${API_URL}${logoUrl}`} alt="Logo" style={{ height: 40, objectFit: 'contain', marginBottom: '1rem' }} />}
              <Upload
                name="image"
                action={`${API_URL}/upload/image`}
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    setLogoUrl(info.file.response.url);
                    message.success('Tải logo thành công');
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Thay đổi Logo</Button>
              </Upload>
            </div>
            <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="URL Logo" />
          </Form.Item>
          <Form.Item label="Hình nền Hero">

            <div style={{ marginBottom: '1rem' }}>
              {imageUrl && <img src={imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`} alt="Hero BG" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8, marginBottom: '1rem' }} />}
              <Upload
                name="image"
                action={`${API_URL}/upload/image`}
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    setImageUrl(info.file.response.url);
                    message.success('Tải lên thành công');
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Thay đổi hình nền</Button>
              </Upload>
            </div>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL hình ảnh" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default MainSettings;
