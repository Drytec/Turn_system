import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const getLogin = async ({ username, password }) => {
  const response = await loginApi.post('/login', {
    username,
    password,
  });
  return response.data;
};
