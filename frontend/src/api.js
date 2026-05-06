import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Pointing to your backend
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});
export const revalidate = (masterPassword) => API.post('/auth/revalidate', { masterPassword });
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const fetchPasswords = () => API.get('/passwords');
export const addPassword = (passwordData) => API.post('/passwords', passwordData);