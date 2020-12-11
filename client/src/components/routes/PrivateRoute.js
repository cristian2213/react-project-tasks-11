import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

// higher-order component, this private component is going to have another component inside
const PrivateRoute = ({ component: Component, ...props }) => {

  const authContext = useContext(AuthContext);
  const { authenticated, loading, userAuthenticated } = authContext;

  useEffect(() => {
    // autoload when the page update
    userAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log(!loading)
  return (
    <Route {...props} render={props => !authenticated && !loading ? (
      // if user isn't authenticated
      <Redirect to="/" />
    ) : (
        // if user is authenticated, send to the component
        <Component {...props} />
      )} />
  )
}

export default PrivateRoute;