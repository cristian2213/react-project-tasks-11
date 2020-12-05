import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/ProjectContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ProjectsList = () => {

  // using context and destructuring it
  const projectContext = useContext(ProjectContext);
  const { projects, getProjects } = projectContext;

  // get project when the component has been loaded
  useEffect(() => {
    getProjects();
  }, []);

  // if there aren't projects, so return null
  if (projects.length === 0) return <p>There are no projects, start by creating one</p>;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition
            key={project.id}
            timeout={200}
            classNames="proyecto"
          >
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default ProjectsList;