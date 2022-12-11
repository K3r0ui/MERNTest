import { useState, useContext } from 'react';
import { Popconfirm, Modal } from 'antd';
import { message } from 'antd';
import TaskForm from './TaskForm';
import moment from 'moment'
const Task = (props) => {
   const { task, handleDeleteTaskById, handleUpdateTask, setData } = props;
   const [visible, setVisible] = useState(false);
   const [updateos,setUpdateos]= useState(true)
   //fonctions pour formulaire

   //faire la mise a jour
   const finish = (title, description, finished) => {
      handleUpdateTask(task._id, title, description, finished);

      setVisible(false);
   };

   const onFinishFailed = () => {
      message.error('Submit failed!');
   };
   //--fonctions pour confirmer la ssuppression
   const confirm = () =>
      new Promise((resolve) => {
         setTimeout(() => resolve(), 2000);
         const result = handleDeleteTaskById(task._id);
         console.log(result);
      });

   // fonction pour popup
   const modifier = () => {
      setVisible(true);
   };
   const handleOk = () => {
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   return (
      <>
         <tr>
            <th scope='row'>1</th>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td> {task.finished?<>Task is Done</>:<>Not Done Yet</>}</td>
            <td> {moment(task.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td> {task.finished_at?moment(task.finished_at).format('MMMM Do YYYY, h:mm:ss a'):<>Task still running</>}</td>
            
            <td> {moment(task.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>

                  <div
                     class='btn-group'
                     role='group'
                     aria-label='Basic mixed styles example'>
                     <button
                        type='button'
                        onClick={modifier}
                        class='btn btn-secondary'>
                        modifier
                     </button>
                     <Popconfirm
                        title='Title'
                        onConfirm={confirm}
                        onVisibleChange={() => console.log('visible change')}>
                        <button type='button' class='btn btn-danger'>
                           supprimer
                        </button>
                     </Popconfirm>
                  </div>
               
            </td>
         </tr>

         <Modal
            title='Modifier un Task'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            <TaskForm
               updateos={updateos}
               finish={finish}
               initialValues={{
                  title: task.title,
                  description: task.description,
                  finished: task.finished,
               }}
            />
         </Modal>
      </>
   );
};

export default Task;