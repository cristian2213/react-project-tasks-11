import React, { useReducer } from 'react';

// axios client
import clientAxios from '../../config/axios';

// context
import ProjectContext from './ProjectContext';
// reducer
import ProjectReducer from './ProjectReducer';
// types import
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  FORM_VALIDATE,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT
} from '../../types/index';

// generate id for each item
//import uuid from 'uuid/dist/v4';

// this is the status manager for all Project components 
const ProjectState = props => {

  /* const projects = [
    { id: 1, name: 'Virtual store' },
    { id: 2, name: 'Intranet' },
    { id: 3, name: 'Webside design' },
    { id: 4, name: 'Webside design two' },
  ]; */

  const initialState = {
    projects: [],
    form: false,
    form_error: false,
    project: null,
    message: null
  }

  // dispach to execute the actions, Reducer is the same a useState
  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  // actions to the CRUD
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT
    })
  }

  // payload: carga útil:
  const getProjects = async () => {
    try {
      const responseApi = await clientAxios.get('/api/projects');

      dispatch({
        type: GET_PROJECTS,
        payload: responseApi.data.projects
      });

    } catch (error) {
      console.log(error);
      const alert = {
        msg: 'There was an error',
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      });
    }
  }

  // add new project 
  const addProject = async project => {
    // when a new project has been created, so add id, this is for dev
    //project.id = uuid();

    try {
      const responseApi = await clientAxios.post('/api/projects', project);

      // insert project in the state with a dispactch
      dispatch({
        type: ADD_PROJECT,
        payload: responseApi.data.project
      });

    } catch (error) {
      console.log(error);
      const alert = {
        msg: 'There was an error',
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      });
    }
  }

  // validate form by erros
  const showError = () => {
    dispatch({
      type: FORM_VALIDATE
    });
  }

  // select to the project that user gived click
  const currentProject = projectId => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId
    })
  }

  // delete project 
  const deleteProject = async (projectId) => {
    try {
      await clientAxios.delete(`/api/projects/${projectId}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: projectId
      });

    } catch (error) {
      console.log(error);
      const alert = {
        msg: 'There was an error',
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      });
    }
  }

  return (
    <ProjectContext.Provider
      /* recomendation, nombrar el state en minuscula y las function in mayuscula */
      value={{
        projects: state.projects,
        form: state.form,
        form_error: state.form_error,
        project: state.project,
        message: state.message,
        showForm,
        getProjects,
        addProject,
        showError,
        currentProject,
        deleteProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectState;