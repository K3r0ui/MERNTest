import { Form, Input, message, Button, Space, Select } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
const TaskForm = (props) => {
   const [form] = Form.useForm();
   const { Option } = Select;
   
   const onFinish = (values) => {
      if(!props.updateos){
         props.finish(values.title,values.description);
         message.success('Submit success!');
      }else{
         if (values.finished == false){
            props.finish(values.title,values.description,values.finished);
            message.success('Submit update success!');
         }else{
            props.finish(values.title,values.description,values.finished);
         }
      }


   };
   function onSearch(val) {
      console.log('search:', val);
   }
//    function onChange(checked) {
//       setDone(checked)
//       console.log(done)
//   }
const handleChange = (value) => {
   console.log(`selected ${value}`);
 };
   const onFinishFailed = () => {
      message.error('Submit failed!');
   };

   return (
      <div class='container mt-5'>
         <Form
            initialValues={props.initialValues}
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item>
               <Form.Item
                  name='title'
                  label='Nom du Task'
                  rules={[
                     {
                        required: true,
                        message: 'Entrer un Task',
                     },

                     {
                        type: 'string',
                        min: 6,
                     },
                  ]}>
                  <Input placeholder='Titre du Task' />
               </Form.Item>
               <Form.Item
                  name='description'
                  label='description'
                  rules={[{ required: true, message: 'Entrer la description' }]}>
                  <Input.TextArea
                     showCount
                     maxLength={300}
                     placeholder='desc'
                  />
               </Form.Item>
               {props.updateos &&  <Form.Item name="finished" label="finished">
               <Select
      defaultValue={props.initialValues.finished}
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: true,
          label: 'Finished',
        },
        {
          value: false,
          label: 'Not Finished',
        }      ]}
        />
               </Form.Item>}
               <center>
                  <Space>
                     <Button
                        type='primary'
                        class='btn btn-primary'
                        htmlType='submit'>
                        Submit
                     </Button>
                  </Space>
               </center>
            </Form.Item>
         </Form>
      </div>
   );
};
export default TaskForm;

