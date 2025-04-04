import axios from 'axios';
import { getToken } from '../services/authService';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});
// interceptor to add the token to the request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(new Error(String(error))),
);

export default api;
