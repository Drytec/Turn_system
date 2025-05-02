import axios from 'axios';

const placeApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const createPlace = async ({ place_name, service_id }) => {
  try {
    console.log('Attempting to create place with:', { place_name, service_id });
    console.log('Request URL:', placeApi.defaults.baseURL + '/api/places/');

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await placeApi.post(
      'place/',
      {
        place_name,
        service_id,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Place created successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error creating place:', {
      error: error.response?.data || error.message,
      status: error.response?.status,
    });
    throw error; // Propaga el error para manejarlo en el componente
  }
};