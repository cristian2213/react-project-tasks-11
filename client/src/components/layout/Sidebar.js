import React from 'react';
import NewProject from '../projects/NewProject';
import ProjectsList from '../projects/ProjectsList';

const Sidebar = () => {
  return (
    <aside>
      <h1>MERM <span>Tasks</span></h1>

      {/* Component */}
      <NewProject />

      <div className="proyectos">
        <h2>Your projects</h2>
        {/* component list */}
        <ProjectsList />
      </div>
    </aside>
  );
}

export default Sidebar;