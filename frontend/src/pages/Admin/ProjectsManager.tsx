import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Upload, Select, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import apiClient, { API_URL } from '../../api/apiClient';

const ProjectsManager = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        apiClient.get('/projects'),
        apiClient.get('/categories')
      ]);
      setProjects(projectsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      message.error('Không thể tải dữ liệu');
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
        content: JSON.stringify(values.contentBlocks || [])
      };
      console.log('Sending payload:', payload);
      if (editingProject) {
        await apiClient.put(`/projects/${editingProject.id}`, payload);
        message.success('Cập nhật dự án thành công');
      } else {
        await apiClient.post('/projects', payload);
        message.success('Tạo dự án mới thành công');
      }
      setIsModalOpen(false);
      form.resetFields();
      setImageUrl('');
      setEditingProject(null);
      fetchData();
    } catch (error: any) {
      console.error('Update failed:', error.response?.data || error.message);
      message.error(`Thao tác thất bại: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk: async () => {
        await apiClient.delete(`/projects/${id}`);
        message.success('Xóa dự án thành công');
        fetchData();
      }
    });
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { 
      title: 'Danh mục', 
      dataIndex: 'category', 
      key: 'category',
      render: (category: any) => category?.name || '-'
    },
    { 
      title: 'Hình ảnh', 
      dataIndex: 'image', 
      key: 'image',
      render: (text: string) => <img src={text.startsWith('http') ? text : `${API_URL}${text}`} alt="project" style={{ width: 50 }} />
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            setEditingProject(record);
            const contentBlocks = record.content ? JSON.parse(record.content) : [];
            form.setFieldsValue({
              ...record,
              categoryId: record.category?.id,
              contentBlocks
            });
            setImageUrl(record.image);
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
        <h1>Quản lý Dự án</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
          setEditingProject(null);
          form.resetFields();
          setImageUrl('');
          setIsModalOpen(true);
        }}>Thêm Dự án</Button>
      </div>
      <Table columns={columns} dataSource={projects} rowKey="id" />

      <Modal
        title={editingProject ? 'Chỉnh sửa Dự án' : 'Thêm Dự án'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categoryId" label="Danh mục">
            <Select placeholder="Chọn danh mục">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Mô tả ngắn">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Hình ảnh đại diện">
            <div style={{ marginBottom: 8 }}>
              {imageUrl && <img src={imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`} alt="Preview" style={{ width: 100, borderRadius: 4 }} />}
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

          <hr style={{ margin: '2rem 0', opacity: 0.1 }} />
          <h3>Chi tiết Nội dung</h3>
          <Form.List name="contentBlocks">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }} extra={<Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)} />}>
                    <Form.Item {...restField} name={[name, 'type']} label="Loại nội dung" rules={[{ required: true }]}>
                      <Select>
                        <Select.Option value="text">Văn bản</Select.Option>
                        <Select.Option value="image">Hình ảnh</Select.Option>
                      </Select>
                    </Form.Item>
                    
                    <Form.Item noStyle shouldUpdate={(prev, curr) => prev.contentBlocks?.[name]?.type !== curr.contentBlocks?.[name]?.type}>
                      {() => {
                        const type = form.getFieldValue(['contentBlocks', name, 'type']);
                        if (type === 'text') {
                          return (
                            <Form.Item {...restField} name={[name, 'value']} label="Nội dung văn bản">
                              <Input.TextArea rows={4} />
                            </Form.Item>
                          );
                        } else if (type === 'image') {
                          const currentImageUrl = form.getFieldValue(['contentBlocks', name, 'value']);
                          return (
                            <Form.Item label="Hình ảnh">
                              {currentImageUrl && <img src={currentImageUrl.startsWith('http') ? currentImageUrl : `${API_URL}${currentImageUrl}`} alt="Block" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: 8 }} />}
                              <Upload
                                name="image"
                                action={`${API_URL}/upload/image`}
                                showUploadList={false}
                                onChange={(info) => {
                                  if (info.file.status === 'done') {
                                    const newContentBlocks = [...form.getFieldValue('contentBlocks')];
                                    newContentBlocks[name].value = info.file.response.url;
                                    form.setFieldsValue({ contentBlocks: newContentBlocks });
                                    message.success('Tải ảnh thành công');
                                  }
                                }}
                              >
                                <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                              </Upload>
                              <Form.Item {...restField} name={[name, 'value']} noStyle>
                                <Input placeholder="URL hình ảnh" style={{ marginTop: 8 }} />
                              </Form.Item>
                            </Form.Item>
                          );
                        }
                        return null;
                      }}
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({ type: 'text', value: '' })} block icon={<PlusOutlined />}>Thêm khối nội dung</Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectsManager;
