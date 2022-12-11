import React from 'react';
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
function RegisterForm({ handleRegisterChange, handleRegisterSubmit }) {

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
      <br></br>
      <Form
      {...layout}
      name="nest-messages"
      validateMessages={validateMessages}
      
    >
      <Form.Item
          name="firstName"
          label='Nom'
          rules={[{ required: true, message: 'Enter user firstname' }]}>
          <Input placeholder='Family Name' onChange={handleRegisterChange('firstName')} />
      </Form.Item>
      <Form.Item
          name="lastName"
          label="Prenom"
          rules={[
              { required: true, message: 'Enter user lastname' },
          ]}>
          <Input placeholder='First Name' onChange={handleRegisterChange('lastName')} />
      </Form.Item>

      <Form.Item name="phonenumber" label="PHONE"
              rules={[
                {
                  required: true,
                   message: 'Enter user phonenumber',
                }
              ]}>
          <Input  placeholder='Number 'onChange={handleRegisterChange("phonenumber")}/>
      </Form.Item>
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Put your email" onChange={handleRegisterChange('email')}/>
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
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Put your password" onChange={handleRegisterChange('password')} />
      </Form.Item>
      <Form.Item
                    name="confirm"
                    label="Confirmer mot de passe"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Confirm your password' />
                </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={handleRegisterSubmit} >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </> );
   
}

export default RegisterForm;
