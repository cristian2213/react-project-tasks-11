import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';

// task context
import TaskContext from '../../context/tasks/TaskContext';

const Project = ({ project }) => {

  // using the context
  const projectContext = useContext(ProjectContext);
  const { currentProject } = projectContext;
  // using task context
  const taskContext = useContext(TaskContext);
  const { getTasks } = taskContext;

  const handleClick = id => {
    currentProject(id);
    getTasks(id);
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => handleClick(project.id)}
      >{project.name}</button>
    </li>
  );
}

export default Project;
