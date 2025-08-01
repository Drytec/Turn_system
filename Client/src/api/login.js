import axios from 'axios';
import { API_URL } from './api';


const loginApi = axios.create({
  baseURL: API_URL,
});

export const getLogin = async ({ email, password }) => {
  console.log('Attempting login with:', { email, password: password });
  console.log('Request URL:', loginApi.defaults.baseURL + '/user/login');
  const response = await loginApi.post('/user/login', {
    email,
    password,
  });
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  localStorage.setItem('role_id', response.data.role_id);
  console.log('Datos de login:', response.data); 
  return response.data;
};
