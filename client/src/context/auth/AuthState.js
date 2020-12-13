import React, { useReducer } from 'react';

// context
import AuthContext from './AuthContext';

//reducer
import AuthReducer from './AuthReducer';

// client axios
import clientAxios from '../../config/axios';

// autenticated token
import tokenAuth from '../../config/tokenAuth';

// types
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  LOGIN_SUCCESSFUL,
  GET_USER,
  LOGIN_ERROR,
  LOG_OUT
} from '../../types/index';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: null,
    loading: true
  }

  // dispatch to execute the different actions
  const [state, dispatch] = useReducer(AuthReducer, initialState);


  // functions to execute

  const registerUser = async (userData) => {
    try {
      const answer = await clientAxios.post('/api/users', userData);

      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: answer.data
      });

      // get the user
      userAuthenticated();

    } catch (error) {
      // alert info
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_REGISTRATION,
        payload: alert
      })
    }
  }

  // return authenticated user
  const userAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // function to send the token for headers
      tokenAuth(token);
    }

    try {
      const answer = await clientAxios.get('/api/auth');
      dispatch({
        type: GET_USER,
        payload: answer.data
      });

    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: LOGIN_ERROR
      });
    }
  }


  // when user log in
  const logIn = async user => {

    try {
      const answer = await clientAxios.post('/api/auth', user);

      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: answer.data
      });

      // if the log in is success, so get the authenticated user
      userAuthenticated();

    } catch (error) {
      // alert info
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error'
      }

      dispatch({
        type: LOGIN_ERROR,
        payload: alert
      });
    }
  }

  // log out
  const logOut = () => {
    dispatch({
      type: LOG_OUT
    });
  }

  // provider
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        userAuthenticated,
        logIn,
        logOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;