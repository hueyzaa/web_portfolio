import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Space, Divider, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import apiClient, { API_URL } from '../../api/apiClient';

const { TextArea } = Input;

interface Stat {
  number: string;
  label: string;
}

interface ProfileData {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  stats: Stat[];
}

const AboutSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/profile');
        if (response.data) {
          form.setFieldsValue(response.data);
          setImageUrl(response.data.imageUrl);
        }
      } catch (error) {
        message.error('Không thể tải dữ liệu giới thiệu');
      }
    };
    fetchProfile();
  }, [form]);

  const onFinish = async (values: ProfileData) => {
    setLoading(true);
    try {
      const payload = { ...values, imageUrl };
      await apiClient.patch('/profile', payload);
      message.success('Cập nhật thành công!');
    } catch (error) {
      message.error('Lỗi khi cập nhật dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <Card title="Cập nhật thông tin Giới thiệu" extra={<Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()} loading={loading}>Lưu thay đổi</Button>}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Nhãn phần (Label)"
            name="label"
            rules={[{ required: true, message: 'Vui lòng nhập nhãn!' }]}
          >
            <Input placeholder="Ví dụ: GIỚI THIỆU | TÔI" />
          </Form.Item>

          <Form.Item
            label="Tiêu đề chính"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input placeholder="Nhập tiêu đề giới thiệu" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={6} placeholder="Nhập nội dung giới thiệu chi tiết" />
          </Form.Item>

          <Form.Item label="Hình ảnh Profile">
            <div style={{ marginBottom: '1rem' }}>
              {imageUrl && (
                <img 
                  src={imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`} 
                  alt="Profile" 
                  style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem', border: '2px solid #eee' }} 
                />
              )}
              <Upload
                name="image"
                action={`${API_URL}/upload/image`}
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status === 'uploading') {
                    setLoading(true);
                    return;
                  }
                  if (info.file.status === 'done') {
                    setImageUrl(info.file.response.url);
                    message.success('Tải lên hình ảnh thành công');
                    setLoading(false);
                  } else if (info.file.status === 'error') {
                    message.error('Tải lên hình ảnh thất bại');
                    setLoading(false);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Thay đổi ảnh đại diện</Button>
              </Upload>
            </div>
            <Input 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="Hoặc dán URL hình ảnh tại đây" 
            />
          </Form.Item>

          <Divider orientation="left">Thông số (Statistics)</Divider>
          
          <Form.List name="stats">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'number']}
                      rules={[{ required: true, message: 'Thiếu số!' }]}
                    >
                      <Input placeholder="Số (VD: 50+)" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'label']}
                      rules={[{ required: true, message: 'Thiếu nhãn!' }]}
                    >
                      <Input placeholder="Nhãn (VD: Dự án)" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm thông số
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

export default AboutSettings;
