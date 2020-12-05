import React, { useState, useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

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

    // send to the action
  }

  return (
    <div className="form-usuario">
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
          Sing in
        </Link>
      </div>
    </div>
  );
}

export default Login;