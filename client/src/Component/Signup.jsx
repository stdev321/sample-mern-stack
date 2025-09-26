import React, { useState, useEffect } from "react";
import { Button, Form, Input, notification, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import Loader from './Loader/Loader';

const Signup = () => {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const key = "updatable";
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const openNotificationWithIcon = (type, placement) => {
    api[type]({
      message: type === 'success' ? 'Signup Successful' : 'Signup Failed',
      description:
        type === 'success' 
          ? 'Welcome! You have successfully created an account.'
          : 'Please check your email and password and try again.',
      placement,
    });
  };
  const { updateUser } = useAuth();
  console.log(value);

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

  const onFinish = async (e) => {
    setIsLoading(true); 
    openNotificationWithIcon('success', 'bottomRight');  

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok) {
        openNotificationWithIcon('error', 'bottomRight');  
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      
      updateUser();

      openNotificationWithIcon('success', 'bottomRight');  

      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
     
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    openNotificationWithIcon('error', 'bottomRight');   
  };

  return (
    <>
      {isLoading && <Loader />}
      {contextHolder}
      <div className="form-container">
        <section id="header">
          <div className="">
            <h1 className="text-center">Sign Up</h1>
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
                          name="name"
                          label="Name"
                          onChange={handleChange}
                          value={value.name}
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input
                            name="name"
                            placeholder="Enter your name"
                            value=""
                          />
                        </Form.Item>

                        <Form.Item
                          name="email"
                          label="E-mail"
                          onChange={handleChange}
                          value={value.email}
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
                          <Input name="email" placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          label="Password"
                          onChange={handleChange}
                          value={value.password}
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input
                            name="password"
                            placeholder="Enter your password"
                            value=""
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

                      <h6>Already have an account? <Link className="navbar-button" to="/Login">Log In</Link></h6>
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

export default Signup;
