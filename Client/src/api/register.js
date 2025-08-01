import axios from 'axios';
import { API_URL } from './api';


const api = axios.create({
  baseURL: API_URL, 
});

export const registerUser = async (formData) => {
  try {
    const response = await api.post('/user/', formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};