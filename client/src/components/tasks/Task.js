import React, { useContext } from 'react';

// context 
import TaskContext from '../../context/tasks/TaskContext';

const Task = ({ task }) => {
  // using the task context
  const taskContext = useContext(TaskContext);
  const { getTasks,
    updateTask,
    deleteTask,
    saveCurrentTask,
    cleanTask,
  } = taskContext;

  const deleteTaskUi = (id, project) => {
    deleteTask(id, project);
    getTasks(task.project);
    cleanTask();
  }

  const handleClick = task => {
    // change the task state without uses the dispatch
    task.state ? task.state = false : task.state = true;
    updateTask(task);
  }

  // add a task when the user wants to edit it
  const selectTask = task => {
    saveCurrentTask(task);
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>

      <div className="estado">
        {task.state ?
          (
            <button
              type="button"
              className="completo"
              onClick={() => handleClick(task)}
            >Complete</button>
          )
          :
          (
            <button
              type="button"
              className="incompleto"
              onClick={() => handleClick(task)}
            >Incomplete</button>
          )
        }
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(task)}
        >Edit</button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => deleteTaskUi(task._id, task.project)}
        >Delete</button>
      </div>
    </li>
  );
}

export default Task;