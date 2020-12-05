import React, { Fragment, useState, useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';

const NewProject = () => {

  // using context and destructuring it
  const projectContext = useContext(ProjectContext);
  const { form,
    showForm,
    form_error,
    addProject,
    showError
  } = projectContext;

  const [project, saveProject] = useState({
    name: '',
  });

  // destructuring object
  const { name } = project;

  const handleChange = (e) => {
    saveProject({
      ...project,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate project
    if (name === '') {
      showError();
      return;
    }

    // add to the state
    addProject(project);

    // restart the form
    saveProject({
      name: ''
    });

  }
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >New project</button>

      {form ?
        (
          <form
            className="formulario-nuevo-proyecto"
            onClick={handleSubmit}
          >

            <input
              type="text"
              className="input-text"
              placeholder="Project Name"
              name="name"
              value={name}
              onChange={handleChange}
            />

            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Add Project"
            />
          </form>
        )
        : null
      }

      {form_error ? <p className="mensaje error">The name is required</p> : null}

    </Fragment>
  );
}

export default NewProject;