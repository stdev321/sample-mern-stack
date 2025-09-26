import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Space, Select } from "antd";
import contact from "../../assets/contact.jpg";
const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("tewste");
  message.success("Submit success!");

  alert(
    `Name: ${values.name}, Email: ${values.email}, Gender: ${values.gender}`
  );

  // reset form if you want
  form.resetFields();
};

  const onFinishFailed = (errorInfo) => {
    message.error("Submit failed!");
    console.log("Failed:", errorInfo);
  };

  const { Option } = Select;


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <section id="header">
      <div className="">
        <h1 className="text-center">Contact US</h1>
        <div className="container-fluid contact_div">
          <div className="row ">
            <div className="col-10 m-auto">
              <div className="row">
                <div className="col-lg-6">
                    <div className="order-1 order-lg-2 header-img">
                      <img
                        src={contact}
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
                        label="NAME"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input placeholder="Enter your name" />
                      </Form.Item>

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
                        <Input placeholder="Enter your email" />
                      </Form.Item>

                      <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                          { required: true, message: "Please select gender!" },
                        ]}
                      >
                        <Select placeholder="select your gender">
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item>
                        <Space>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
