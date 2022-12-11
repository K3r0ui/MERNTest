import Task from "./Task";
const TaskList = (props) => {
   const { handleDeleteTaskById, handleUpdateTask, data, setData } = props;

   return (
      <>
         <table class='table mt-3'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Nom du lieu</th>
                  <th scope='col'>description</th>
                  <th scope='col'>finished</th>
                  <th scope='col'>created_at</th>
                  <th scope='col'>finished_at</th>
                  <th scope='col'>updated_at</th>
                  <th scope='col'>Actions</th>
               </tr>
            </thead>
            <tbody>
               {data.map((task) => (
                  <>
                     <Task
                        key={task._id}
                        task={task}
                        handleDeleteTaskById={handleDeleteTaskById}
                        handleUpdateTask={handleUpdateTask}
                        setData={setData}
                     />
                  </>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default TaskList;

// import React from 'react'

// const TaskList = ({x})=> {
//     return (
//         <>
//         <tr>
//         <td>{x.title}</td>
//         <td>{x.description}</td>
//         { <td>{x.finished ? <>The task is finished at {x.finished_at}</>:<>En cours<button>Finish Task</button><button>Close Task</button></>} </td>}
//         {x.updated_at && <td><strong>Status Updated : </strong>{x.updated_at}</td> }
//         </tr>
//         </>
//     )
// }

// export default TaskList