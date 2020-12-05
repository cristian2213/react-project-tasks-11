import React from 'react';
/**
 * importing the router
 * Router: Router
 * Switch: enrutador
 * Route: ruta
 */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';

// Context provider
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';

function App() {
  return (
    <ProjectState>
      <TaskState>
        {/*  /* all to be inside the Switch will be to the will show in the pages different */}
        < Router >
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/new-account' component={NewAccount} />
            <Route exact path='/projects' component={Projects} />
          </Switch>
        </Router>
      </TaskState>
    </ProjectState >
  );
}

export default App;
