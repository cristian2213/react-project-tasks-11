import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  STATE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types/index';

const TaskState = props => {

  // create state
  const initialState = {
    tasks: [
      { id: 1, name: 'Choose1 Platform', state: false, projectId: 1 },
      { id: 2, name: 'Choose2 Colors', state: true, projectId: 2 },
      { id: 3, name: 'Choose3 Hosting', state: false, projectId: 3 },
      { id: 4, name: 'Choose4 pay Platform', state: true, projectId: 4 },
      { id: 5, name: 'Choose5 Platform', state: false, projectId: 1 },
      { id: 6, name: 'Choose6 Colors', state: true, projectId: 4 },
      { id: 7, name: 'Choose7 Hosting', state: false, projectId: 2 },
      { id: 8, name: 'Choose8 pay Platform', state: true, projectId: 3 },
      { id: 9, name: 'Choose9 Platform', state: false, projectId: 2 },
      { id: 10, name: 'Choose10 Colors', state: true, projectId: 3 },
      { id: 11, name: 'Choose11 Hosting', state: false, projectId: 1 },
      { id: 12, name: 'Choose12 pay Platform', state: true, projectId: 4 },
      { id: 13, name: 'Choose13 pay Platform', state: true, projectId: 3 },
      { id: 14, name: 'Choose14 Platform', state: false, projectId: 4 },
      { id: 15, name: 'Choose15 Colors', state: true, projectId: 3 },
      { id: 16, name: 'Choose16 Hosting', state: false, projectId: 2 },
      { id: 17, name: 'Choose17 pay Platform', state: true, projectId: 1 },
    ],
    projectTasks: null,
    error_task: false,
    selected_task: null
  }

  // creating the dispatch and the state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // create the functions

  // get to the tasks of a project
  const getTasks = projectId => {
    dispatch({
      type: PROJECT_TASKS,
      payload: projectId
    });
  }

  // add new task
  const addTask = task => {
    task.id = uuidv4();
    dispatch({
      type: ADD_TASK,
      payload: task
    });
  }

  // validate task
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  }

  // delete task
  const deleteTask = (projectId) => {
    dispatch({
      type: DELETE_TASK,
      payload: projectId
    })
  }

  // change the task state 
  const changeStateTask = task => {
    dispatch({
      type: STATE_TASK,
      payload: task
    })
  }

  // current task to edit
  const saveCurrentTask = task => {
    dispatch({
      type: CURRENT_TASK,
      payload: task
    })
  }

  const updateTask = task => {
    dispatch({
      type: UPDATE_TASK,
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
        changeStateTask,
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