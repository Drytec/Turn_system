import axios from 'axios';

// Configuración base de axios con interceptores
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Nota el /api/ para consistencia
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    // Token expirado o inválido
    console.error('Error de autenticación, redirigiendo a login...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export const fetchPuestos = async () => {
  try {
    console.log('Token actual:', localStorage.getItem('access_token') || localStorage.getItem('token'));
    
    const response = await api.get('/place/'); // Nota el plural para consistencia REST
    
    console.log('Puestos obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

export const crearPuesto = async (puestoData) => {
  try {
    console.log('Creando puesto con datos:', puestoData);
    
    const response = await api.post('/places/', puestoData);
    
    console.log('Puesto creado exitosamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear puesto:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Mensajes de error específicos
    if (error.response?.data?.service_id) {
      throw new Error('El servicio seleccionado no existe');
    }
    
    throw error;
  }
};

// Función adicional para obtener detalles de un puesto
export const fetchPuestoById = async (id) => {
  try {
    const response = await api.get(`/place/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener puesto ${id}:`, error);
    throw error;
  }
};
