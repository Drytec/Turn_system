import axios from 'axios';

const statsApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

statsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getGlobalStats = async () => {
  try {
    const res = await statsApi.get('/stats/');
    const stats = res.data[0];

    
    console.log("Demografía recibida:", stats.attended_users_demographic_distribution);
    console.log("Prioridades recibidas:", stats.attended_users_priority_distribution);
    console.log("Estadísticas por lugar recibidas:", stats.place_statistics);

    return {
      userDemographics: stats.attended_users_demographic_distribution,
      priorityDistribution: stats.attended_users_priority_distribution,
      placeStatistics: stats.place_statistics,
    };
  } catch (error) {
    console.error("Error en getGlobalStats:", error.response?.data || error.message);
    throw error;
  }
};
