
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  LOGIN_SUCCESSFUL,
  GET_USER,
  LOGIN_ERROR,
  LOG_OUT
} from '../../types/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTRATION:
    case LOGIN_SUCCESSFUL:
      // save token in the localstorage, it's safe!
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null
      }

    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        authenticated: true
      }

    case LOGIN_ERROR:
    case ERROR_REGISTRATION:
      // delete token only if it exits
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        message: action.payload,
      }

    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: null
      }

    default:
      return state;
  }
}