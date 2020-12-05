import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewAccount = () => {

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

    // validate both fields

    // both passwords with minimum six characters

    // send to the action
  }

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Sing in</h1>

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