import React, { useContext, useState, useEffect } from 'react';
// context import 
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const FormTask = () => {
  // using the context
  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;

  // using the task context
  const taskContext = useContext(TaskContext);
  const { error_task,
    selected_task,
    getTasks,
    addTask,
    validateTask,
    updateTask,
    cleanTask
  } = taskContext;

  // effect that check if there's one task
  useEffect(() => {
    if (selected_task !== null) saveTask(selected_task);
    else saveTask({ name: '' });
  }, [selected_task]);

  // state
  const [task, saveTask] = useState({
    name: ''
  });

  const { name } = task;

  if (!project) return null;

  // array destructuring
  const [currentProject] = project;

  // functions
  const handleChange = e => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    // validate field
    if (name.trim() === '') {
      validateTask();
      return;
    }

    // validate if the user is editing the task or adding a task
    if (selected_task === null) {
      // add new task
      task.project = currentProject._id;
      addTask(task);

      // get the project tasks
      getTasks(currentProject._id);
      //restart the form
      saveTask({
        name: ''
      });

    } else {
      updateTask(task);
      // remove selected task from state
      cleanTask();
    }
  }

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task name"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={selected_task ? 'Edit Task' : 'Add Task'}
          />
        </div>
      </form>
      {error_task ? <p className="mensaje error">The task name is required</p> : null}
    </div>
  );
}

export default FormTask;