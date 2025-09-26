import React, { useState } from "react";
import { Button, Form, Input, message, Space, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.jpg";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const Login = () => {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const key = "updatable";
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const { updateUser } = useAuth();

  const [api, contextHolderr] = notification.useNotification();
  const openNotificationWithIcon = (type, placement) => {
    api[type]({
      message: type === 'success' ? 'Login Successful' : 'Login Failed',
      description:
        type === 'success' 
          ? 'Welcome back! You have successfully logged in.'
          : 'Please check your email and password and try again.',
      placement,
    });
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const onFinish = async (value) => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/login", value);

      if (response.data.success) {
        console.log("Login response:", response.data);
        
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        updateUser();
        
        openNotificationWithIcon('success', 'bottomRight');

        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      openNotificationWithIcon('error', 'bottomRight');
      setIsLoading(false);
    }
  };
  
  
  

  const onFinishFailed = () => {
    message.error("Submit failed!");
    openNotificationWithIcon('error', 'bottomRight' )
  };

  return (
    <>
      {isLoading && <Loader />}
      {contextHolderr}
      <div className="form-container">
        <section id="header">
          <div className="">
            <h1 className="text-center">Log In</h1>
            <div className="container-fluid contact_div">
              <div className="row ">
                <div className="col-10 m-auto">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="order-1 order-lg-2 header-img">
                        <img
                          src={login}
                          alt="home img"
                          className="img-fluid animated"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 m-auto">
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          name="email"
                          label="E-mail"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!",
                            },
                          ]}
                        >
                          <Input
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                          />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                          />
                        </Form.Item>

                        <Form.Item>
                          <Space>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loadings[0]}
                              onClick={() => enterLoading(0)}
                            >
                              Submit
                            </Button>
                          </Space>
                        </Form.Item>
                      </Form>

                      <h6>Don't have an account? <Link className="navbar-button" to="/Signup">Sign Up</Link></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
