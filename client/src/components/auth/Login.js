import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = props => {

  // alert context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // auth context
  const authContext = useContext(AuthContext);
  const { authenticated, message, logIn } = authContext;

  useEffect(() => {
    if (authenticated) {
      // redirect
      props.history.push('/projects');
    }

    if (message) {
      showAlert(message.msg, message.category);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, message, props.history]);

  // state to log in
  const [user, saveUser] = useState({ email: '', password: '' });

  // extract user
  const { email, password } = user;

  const handleChange = (e) => {
    saveUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate both fields
    if (email.trim() === '' || password.trim() === '') {
      showAlert('All fields are required', 'alerta-error');
      return;
    }

    // send to the action
    logIn({ email, password });
  }

  return (
    <div className="form-usuario">
      {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Log in</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              onChange={handleChange}
              value={email}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <input type="submit"
              className="btn btn-primario btn-block"
              value="Log in"
            />

          </div>
        </form>
        <Link to='/new-account' className="enlace-cuenta">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Login;