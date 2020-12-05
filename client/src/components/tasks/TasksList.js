import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// context import 
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

// Components
import Task from '../tasks/Task';

const TasksList = () => {
  // using the project context
  const projectContext = useContext(ProjectContext);
  const { project, deleteProject } = projectContext;

  // using the task context
  const taskContext = useContext(TaskContext);
  const { project_tasks } = taskContext;

  // check if exist some project
  if (!project) return <h1>Select a Project</h1>;
  // array destructuring, current project
  const [currentProject] = project;

  return (
    <Fragment>
      <h2>PROJECT: {currentProject.name}</h2>

      <ul className="listado-tareas">
        {project_tasks.length === 0 ? <li className="tarea">There aren't tasks</li>
          :
          <TransitionGroup>
            {project_tasks.map(task => (
              <CSSTransition
                key={task.id}
                timeout={200}
                classNames="tarea"
              >
                <Task
                  task={task}
                />
              </CSSTransition>
            ))}

          </TransitionGroup>
        }
      </ul>

      <button
        to='/projects'
        type="button"
        className="btn btn-eliminar"
        onClick={() => deleteProject(currentProject.id)}
      >Delete Project &times;</button>

    </Fragment>
  );
}

export default TasksList;