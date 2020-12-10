import React, { useReducer } from 'react';

// context
import AlertContext from './AlertContext';

// reducer
import AlertReducer from './AlertReducer';

// types
import { SHOW_ALERT, HIDEN_ALERT } from '../../types/index';

const AlertState = props => {
  const initialState = {
    alert: null
  }

  // dispach to execute the actions
  const [state, dispatch] = useReducer(AlertReducer, initialState);


  // application functions
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category
      }
    });

    // hiden alert
    setTimeout(() => {
      dispatch({
        type: HIDEN_ALERT
      });
    }, 5000);
  }

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );

}

export default AlertState;