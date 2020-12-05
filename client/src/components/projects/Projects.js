import React from 'react';
// Components
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import TasksList from '../tasks/TasksList';

const Projects = () => {
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