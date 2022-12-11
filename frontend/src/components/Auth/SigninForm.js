import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
function SigninForm({ handleLoginChange, handleLoginSubmit }) {
   const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!"
      }
    };
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
   return (
      

   <>
   
   <Form
      {...layout}
      name="nest-messages"
      validateMessages={validateMessages}
      
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email"
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Put your email" onChange={handleLoginChange('email')}/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Put your password" onChange={handleLoginChange('password')} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={handleLoginSubmit} >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>);
}

export default SigninForm;
