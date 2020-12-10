import React, { useContext, useEffect } from 'react';

// auth context
import AuthContext from '../../context/auth/AuthContext';

// helper capitalLetter
import { capitalLetter } from '../../helpers/capitalLetter';

const Bar = () => {

  // usuing auth context
  const authContext = useContext(AuthContext);
  const { user, userAuthenticated, logOut } = authContext;

  // this method I think that it is useless, because user is get in the projects component
  //useEffect(() => {
  //  userAuthenticated();
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, []);

  return (
    <header className="app-header">
      {user ? <p className="nombre-usuario">Hello <span>{capitalLetter(user.name)}!</span></p> : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion btn-primario"
          onClick={() => logOut()}
        >Log Out</button>
      </nav>
    </header>
  );
}

export default Bar;