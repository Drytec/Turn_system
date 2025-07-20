import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Asegúrate que esta sea la URL correcta de tu backend
});

export const crearTurno = async (turnoData) => {
  try {
    const response = await api.post('/turn/create', turnoData);
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};
export const getTurnoActivo = async (userId) => {
  try {
    const response = await api.get(`/turn/user/active/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};
