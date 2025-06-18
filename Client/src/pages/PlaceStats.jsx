import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlaceStats } from '../api/placeStats';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent } from '../components/card';

export default function PlaceStats() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Obteniendo estadísticas del puesto con nombre:", id);
    const fetchStats = async () => {
      try {
        const data = await getPlaceStats(id); 
        if (!data) {
          throw new Error("No se encontró el puesto solicitado.");
        }
        setStats(data);
      } catch (err) {
        console.error("Error al obtener estadísticas:", err);
        setError("No se pudo cargar estadísticas. Verificá que el nombre del puesto sea correcto.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Cargando estadísticas...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  const chartData = [
    { name: 'Atendidos', value: stats.attendedTurns },
    { name: 'Activos', value: stats.activeTurns },
    { name: 'Cancelados', value: stats.canceledTurns },
    { name: 'Prom. Atención', value: parseFloat(stats.averageTime) || 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Estadísticas del Puesto: {id}
      </h1>

      <Card>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
