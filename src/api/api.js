import axios from 'axios';

const requestApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default requestApi;