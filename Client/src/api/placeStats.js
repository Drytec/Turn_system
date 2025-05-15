import { fetchWithToken } from '../helpers/fetch';

export const getPlaceEfficiencyStats = async () => {
  try {
    const response = await fetchWithToken('turn/stats/place-efficiency/');
    if (!response.ok) {
      throw new Error('Error al obtener estadísticas de eficiencia');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return null;






    
  }
};
