import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// context import
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

// cuando se usa react-router-dom se tiene accesso a props.history
const NewAccount = (props) => {

  // alert context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  // auth context
  const authContext = useContext(AuthContext);
  const { message, authenticated, registerUser } = authContext;

  // at case that exists an authentication, register or register error
  useEffect(() => {
    if (authenticated) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, authenticated, props.history]);

  // state to log in
  const [user, saveUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  // extract user
  const { name, email, password, confirm } = user;

  const handleChange = (e) => {
    saveUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate all fields
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
      showAlert('All fields are required', 'alerta-error');
      return;
    }

    // both passwords with minimum six characters
    if (password.length < 6) {
      showAlert('The password must be at least 6 characters', 'alerta-error');
      return;
    }

    // validate if both fields are equal
    if (password !== confirm) {
      showAlert('The password must be equal', 'alerta-error');
      return;
    }

    // send to the action, this a function that will communicate with our API
    registerUser({
      name,
      email,
      password
    });

  }

  return (
    <div className="form-usuario">
      {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              onChange={handleChange}
              value={name}
            />
          </div>


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
            <label htmlFor="confirm">Confirm password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repeat your password"
              onChange={handleChange}
              value={confirm}
            />
          </div>

          <div className="campo-form">
            <input type="submit"
              className="btn btn-primario btn-block"
              value="Sing in"
            />

          </div>
        </form>
        <Link to='/' className="enlace-cuenta">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default NewAccount;