import axios from 'axios';
import { getUserDataFromToken } from './utils'; 

export const getPlaceStats = async (placeName) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error("🔴 No hay token en localStorage");
    throw new Error("No autenticado");
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/stats/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("🔴 Error al obtener estadísticas:", errorText);
      throw new Error('Error al obtener estadísticas');
    }

    const allStats = await res.json();

    console.log("🟡 Buscando estadísticas del puesto:", placeName);
    console.log("📋 Lista de puestos disponibles:");
    allStats[0]?.place_statistics?.forEach(place => {
      console.log("➡️", place.place_name.toLowerCase().trim());
    });

    const matchedPlace = allStats[0]?.place_statistics?.find(
      (place) => place.place_name.toLowerCase().trim() === placeName.toLowerCase().trim()
    );

    if (!matchedPlace) {
      throw new Error("No se encontró el puesto solicitado.");
    }

    return matchedPlace;

  } catch (error) {
    console.error("🔴 Error en getPlaceStats:", error.message);
    throw error;
  }
};
