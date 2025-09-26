import React, { useState } from 'react';
import { Card, Avatar, Button, Form, Input, Select, InputNumber, Modal, notification } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Profile.css';
const { Option } = Select;
const { TextArea } = Input;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, placement) => {
    api[type]({
      message: type === 'success' ? 'Updated Successful' : 'Updated Failed',
      description:
        type === 'success' 
          ? 'Your profile has been updated successfully.'
          : 'Please check your profile and try again.',
      placement,
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age,
      phone: user.phone,
      address: user.address,
      bio: user.bio,
      occupation: user.occupation
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put('http://localhost:5000/update-profile', {
        id: user.id,
        ...values
      });

      if (response.data.success) {
        // Store the new token
        localStorage.setItem('token', response.data.token);
        
        // Update the user context
        updateUser();
        
        openNotificationWithIcon('success', 'bottomRight');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Update error:', error);
      openNotificationWithIcon('error', 'bottomRight');
    }
  };

  const ProfileDisplay = () => (
    <div className="profile-info">
      <div className="info-item">
        <UserOutlined className="info-icon" />
        <div>
          <h3>Name</h3>
          <p>{user.name}</p>
        </div>
      </div>
      
      <div className="info-item">
        <MailOutlined className="info-icon" />
        <div>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
      </div>

      {user.gender && (
        <div className="info-item">
          <UserOutlined className="info-icon" />
          <div>
            <h3>Gender</h3>
            <p>{user.gender}</p>
          </div>
        </div>
      )}

      {user.age && (
        <div className="info-item">
          <UserOutlined className="info-icon" />
          <div>
            <h3>Age</h3>
            <p>{user.age}</p>
          </div>
        </div>
      )}

      {user.phone && (
        <div className="info-item">
          <PhoneOutlined className="info-icon" />
          <div>
            <h3>Phone</h3>
            <p>{user.phone}</p>
          </div>
        </div>
      )}

      {user.address && (
        <div className="info-item">
          <HomeOutlined className="info-icon" />
          <div>
            <h3>Address</h3>
            <p>{user.address}</p>
          </div>
        </div>
      )}

      {user.occupation && (
        <div className="info-item">
          <UserOutlined className="info-icon" />
          <div>
            <h3>Occupation</h3>
            <p>{user.occupation}</p>
          </div>
        </div>
      )}

      {user.bio && (
        <div className="info-item">
          <UserOutlined className="info-icon" />
          <div>
            <h3>Bio</h3>
            <p>{user.bio}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {contextHolder}
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-header">
            <Avatar
              size={100}
              style={{
                backgroundColor: '#1890ff',
                marginBottom: '20px'
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <h1>{user.name}</h1>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={handleEdit}
              className="edit-button"
            >
              Edit Profile
            </Button>
          </div>
          
          <ProfileDisplay />

          <Modal
            title="Edit Profile"
            open={isEditing}
            onCancel={handleCancel}
            footer={null}
            width={600}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
              initialValues={user}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item name="gender" label="Gender">
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="age" label="Age">
                <InputNumber min={1} max={150} />
              </Form.Item>

              <Form.Item name="phone" label="Phone">
                <Input />
              </Form.Item>

              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>

              <Form.Item name="occupation" label="Occupation">
                <Input />
              </Form.Item>

              <Form.Item name="bio" label="Bio">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
                <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </>
  );
};

export default Profile; 