import clientAxios from './axios';

const tokenAuth = token => {
  if (token) {
    // if there is a token, so it sends for headers
    clientAxios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // if there is not a token, so it will be deleted
    delete clientAxios.defaults.headers.common['x-auth-token'];
  }
}

export default tokenAuth;