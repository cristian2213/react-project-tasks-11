import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// components
import Project from './Project';
// context 
import ProjectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/AlertContext';

const ProjectsList = () => {

  // prevent FindDOMNode
  const nodeRef = React.useRef(null);

  // using context and destructuring it
  const projectContext = useContext(ProjectContext);
  const { projects, message, getProjects } = projectContext;

  // alert context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // get project when the component has been loaded
  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }

    getProjects();
  }, [message]);

  // if there aren't projects, so return null
  if (projects.length === 0) return <p>There are no projects, start by creating one</p>;

  return (
    <ul className="listado-proyectos">
      {alert ? (<div className={`${alert.category} alert-position`}>{alert.msg}</div>) : null}

      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition
            key={project._id}
            timeout={200}
            classNames="proyecto"
            ref={nodeRef}
          >
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default ProjectsList;