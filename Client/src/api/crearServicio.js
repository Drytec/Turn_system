import axios from 'axios';

const serviceApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const createService = async ({ service_name, service_desc }) => {
  try {
    console.log('Attempting to create service with:', { service_name, service_desc });
    console.log('Request URL:', serviceApi.defaults.baseURL + '/api/services/');

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await serviceApi.post(
      'service/',
      {
        service_name,  // Campo obligatorio (unique, max_length=50)
        service_desc,  // Campo obligatorio (TextField)
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Service created successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error creating service:', {
      error: error.response?.data || error.message,
      status: error.response?.status,
    });
    throw error; // Propaga el error para manejarlo en el componente
  }
};