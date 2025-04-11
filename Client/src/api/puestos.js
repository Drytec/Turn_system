import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const getPuestos = async () => {
  try {
    const response = await api.get('/place/');  // Usa la ruta correcta del backend
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos:', error);
    throw error;
  }
};
