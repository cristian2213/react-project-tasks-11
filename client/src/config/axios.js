import axios from 'axios';

// create a new instance of axios with a custom config
const clientAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clientAxios;