import React, { useContext, useEffect } from 'react';
// Components
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import TasksList from '../tasks/TasksList';

// auth context
import AuthContext from '../../context/auth/AuthContext';

const Projects = () => {

  // auth context
  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext;

  useEffect(() => {
    // autoload when the page update
    userAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contenedor-app">
      {/* Aside */}
      <Sidebar />
      <div className="seccion-principal">
        {/* Component */}
        <Bar />
        <main>
          <FormTask />

          <div className="contenedor-tareas">
            <TasksList />
          </div>

        </main>

      </div>

    </div>
  );
}

export default Projects;