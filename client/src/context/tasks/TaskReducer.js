/* eslint-disable import/no-anonymous-default-export */

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

export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTasks: state.tasks.filter(task => task.projectId === action.payload)
      }

    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        error_task: false
      }

    case VALIDATE_TASK:
      return {
        ...state,
        error_task: true
      }

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        selected_task: null
      }

    case STATE_TASK:
    case UPDATE_TASK:
      // mapea cada dato y cuando concuerde la id de la tarea con la tarea a modificar, entonces se rescribe la tarea existente con la entrante, y sino son iguales las tareas entonces retornar la tarea existente

      return {
        ...state,
        projectTasks: state.projectTasks.map(task => task.id === action.payload.id ? action.payload : task),
      }

    case CURRENT_TASK:
      return {
        ...state,
        selected_task: action.payload
      }

    case CLEAN_TASK:
      return {
        ...state,
        selected_task: null
      }

    default:
      return state;
  }
}