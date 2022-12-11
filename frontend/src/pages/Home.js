import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
function Home() {
  return (
    <Result
    icon={<SmileOutlined />}
    title="Welcome to my ToDoList"
    
  />
  )
}

export default Home