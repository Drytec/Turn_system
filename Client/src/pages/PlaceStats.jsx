import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlaceStats } from '../api/placeStats';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent } from '../components/card';
import { Loader2 } from 'lucide-react';

export default function PlaceStats() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPlaceStats(id); 
        if (!data) throw new Error("No se encontró el puesto solicitado.");
        setStats(data);
      } catch (err) {
        console.error("🔴 Error al obtener estadísticas:", err);
        setError("No se pudo cargar estadísticas. Verifica que el nombre del puesto sea correcto.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Cargando estadísticas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  const chartData = [
    { name: 'Atendidos', value: stats.attendedTurns },
    { name: 'Activos', value: stats.activeTurns },
    { name: 'Cancelados', value: stats.canceledTurns },
    { name: 'Prom. Atención (min)', value: parseFloat(stats.averageTime) || 0 },
  ];

  const statCards = [
    { label: 'Turnos Atendidos', value: stats.attendedTurns, color: 'bg-green-100 text-green-800' },
    { label: 'Turnos Activos', value: stats.activeTurns, color: 'bg-blue-100 text-blue-800' },
    { label: 'Turnos Cancelados', value: stats.canceledTurns, color: 'bg-red-100 text-red-800' },
    { label: 'Promedio Atención', value: `${stats.averageTime} min`, color: 'bg-yellow-100 text-yellow-800' },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Estadísticas del Puesto: <span className="text-indigo-600">{id}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className={`rounded-xl p-4 shadow-md ${card.color}`}>
            <p className="text-sm font-medium">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Gráfico de Datos</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
