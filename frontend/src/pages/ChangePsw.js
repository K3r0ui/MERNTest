import React, {useState } from 'react';
import { resetpsw } from '../services/auth.service';
import { useNavigate, useParams } from 'react-router-dom';
import {
   Button,
   Form,
   Input,
   message,
   Space,
} from 'antd';

export default function ChangePsw() {
   const [Data, setData] = useState("");
   const [form] = Form.useForm();

   
   const navigate = useNavigate();
   const {id , token } = useParams();

   const onFinish = async (values) => {
      try {
         const res = await resetpsw(id,token,values);
         console.log(res)
         message.success('Mot de passe changed successfully!');
         navigate('/');
      } catch (error) {
         console.error(error.message);
         message.error('submit failed!');
      }
   };

   const onFinishFailed = () => {
      message.error('Submit failed!');
   };

   return (
      <div className='container mt-5'>
         <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item
               name='password'
               label='Password'
               rules={[{ required: true, message: 'Entrer password' }]}>
               <Input.Password placeholder='input password' />
            </Form.Item>

            <br></br>
            <Form.Item>
               <center>
                  <Space>
                     <Button
                        type='primary'
                        className='btn btn-primary'
                        htmlType='submit'>
                        Submit
                     </Button>
                  </Space>
               </center>
            </Form.Item>
            <br></br>
         </Form>
      </div>
   );
}
