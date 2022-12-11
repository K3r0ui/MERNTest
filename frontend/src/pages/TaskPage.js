import React from 'react';
import { useEffect, useState } from 'react';
import { Spin, Space, Modal, Empty } from 'antd';
import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';
import { getTasks,postTask,updateTask,deleteTask } from '../services/task.service';

const TaskPage = () => {
   const [data, setData] = useState('');
   const [loading, setLoading] = useState(false);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const data2 = await getTasks();
         if (data2) {
            setData(data2);
            console.log(data2);
         }
         setLoading(false);
      };
      fetchData();
   }, []);

   //fonction pour la supprission
   const handleDeleteTaskById = (id) => {
      deleteTask(id);
      setData(data.filter((task) => task._id !== id));
   };

   // fonction pour fair l'appdate
   const handleUpdateTask = async (id, title,description,  finished) => {
      const src = await updateTask(id, title, description, finished);
      console.log(src)
      const newData = data.map((x) => {
         if (x._id === id) {
            x.title = src.title;
            x.description = src.description;
            x.finished = src.finished;
            x.finished_at = src.finished_at;
            x.updated_at=src.updated_at
         }
         return x;
      });
      console.log(newData)
      setData(newData);
   };

   //-------------fonction pour poupup-----

   const ajouter = () => {
      setVisible(true);
   };

   const handleOk = () => {
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   const finish = async (title,description) => {
      const response = await postTask({title,description});
      console.log(response)
      setVisible(false);
      
      if (response) {
         setData([...data, response]);
      }
   };

   //-----------

   return (
      <>
         <div class='container mt-5 '>
            {' '}
            <button type='button' onClick={ajouter} class='btn btn-primary'>
               Ajouter un Task
            </button>
            {loading && (
               <>
                  <div class='d-flex justify-content-center'>
                     <Space size='middle'>
                        <Spin size='large' />
                     </Space>
                  </div>
               </>
            )}
            {data.length == 0 && !loading && (
               <>
                  <Empty />
               </>
            )}
            {data.length != 0 && !loading && (
               <>
                  <TaskList
                     handleUpdateTask={handleUpdateTask}
                     handleDeleteTaskById={handleDeleteTaskById}
                     data={data}
                     setData={setData}
                  />
               </>
            )}
         </div>

         <Modal
            title='Ajouter un Task'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            <TaskForm finish={finish} />
         </Modal>
      </>
   );
};

export default TaskPage;