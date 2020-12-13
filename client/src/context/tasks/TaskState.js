import React, { useReducer } from 'react';
//import { v4 as uuidv4 } from 'uuid';
// import context
import TaskContext from './TaskContext';
// import reducer
import TaskReducer from './TaskReducer';
// types import
import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types/index';

// clientAxios
import clientAxios from '../../config/axios';

const TaskState = props => {

  // create state
  const initialState = {
    projectTasks: [],
    error_task: false,
    selected_task: null
  }

  // creating the dispatch and the state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // create the functions

  // get to the tasks of a project
  const getTasks = async project => {

    try {
      const responseApi = await clientAxios.get('/api/tasks', { params: { project: project } });

      dispatch({
        type: PROJECT_TASKS,
        payload: responseApi.data.tasks
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  // add new task
  const addTask = async task => {
    //task.id = uuidv4();

    try {
      const response = await clientAxios.post('/api/tasks', task);
      dispatch({
        type: ADD_TASK,
        payload: response.data.task
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  // validate task
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  }

  const updateTask = async task => {
    try {
      const responseApi = await clientAxios.put(`/api/tasks/${task._id}`, task);
      console.log(responseApi);

      dispatch({
        type: UPDATE_TASK,
        payload: task
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  // delete task
  const deleteTask = async (id, project) => {
    try {
      await clientAxios.delete(`/api/tasks/${id}`, { params: { project } });

      dispatch({
        type: DELETE_TASK,
        payload: id
      });

    } catch (error) {
      console.log(error.response)
    }
  }

  // current task to edit
  const saveCurrentTask = task => {
    dispatch({
      type: CURRENT_TASK,
      payload: task
    });
  }

  // clean task
  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK
    });
  }

  // creating the provider
  return (
    <TaskContext.Provider
      value={{
        project_tasks: state.projectTasks,
        error_task: state.error_task,
        selected_task: state.selected_task,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveCurrentTask,
        updateTask,
        cleanTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );

}

export default TaskState;