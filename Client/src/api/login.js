import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const getLogin = async ({ email, password }) => {
  console.log('Attempting login with:', { email, password: password });
  console.log('Request URL:', loginApi.defaults.baseURL + '/user/login');
  const response = await loginApi.post('/user/login', {
    email,
    password,
  });
  console.log('Datos de login:', response.data); 
  return response.data;
};
