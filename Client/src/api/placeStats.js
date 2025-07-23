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

export const getPlaceStats = async (placeName) => {
  try {
    const res = await statsApi.get('/stats/');
    const allStats = res.data;

    console.log("Buscando estadísticas del puesto:", placeName);
    console.log("Lista de puestos disponibles:", allStats[0].place_statistics.map(p => p.place_name));

    const matchedPlace = allStats[0].place_statistics.find(
        (place) => place.place_name.toLowerCase().trim() === placeName.toLowerCase().trim()
    );

    if (!matchedPlace) {
      throw new Error("No se encontró el puesto solicitado.");
    }

    return { ...matchedPlace };
  } catch (error) {
    console.error("Error en getPlaceStats:", error.response?.data || error.message);
    throw error;
  }
};