import axios from 'axios';

const statsApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const getTurnStats = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await statsApi.get('/api/turn/stats/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching turn stats:', {
      error: error.response?.data || error.message,
      status: error.response?.status,
    });
    throw error;
  }
};