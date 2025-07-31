import { useEffect, useState } from 'react';
import { getGlobalStats } from '../api/placeStats';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Loader2 } from 'lucide-react';

const COLORS = ['#4ade80', '#60a5fa', '#f87171', '#facc15', '#a78bfa'];

export default function PlaceStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getGlobalStats();
        setStats(data);
      } catch (err) {
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Cargando estadísticas...
      </div>
    );
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

const demographicData = stats.userDemographics
  ? [
      {
        name: 'Adultos mayores',
        value: stats.userDemographics.older_adults_attended || 0,
      },
      {
        name: 'Con discapacidad',
        value: stats.userDemographics.discapacity_attended || 0,
      },
      {
        name: 'Usuarios normales',
        value: stats.userDemographics.normal_attended || 0,
      }
    ]
  : [];

const priorityData = stats.priorityDistribution
  ? [
      {
        name: 'Prioridad Alta',
        value: stats.priorityDistribution.h_priority_attended || 0,
      },
      {
        name: 'Prioridad Media',
        value: stats.priorityDistribution.m_priority_attended || 0,
      },
      {
        name: 'Prioridad Baja',
        value: stats.priorityDistribution.l_priority_attended || 0,
      }
    ]
  : [];


  const barData = stats.placeStatistics.map(place => ({
    name: place.place_name,
    Atendidos: place.attended_turn_count,
    Activos: place.active_turn_count,
    Cancelados: place.canceled_turn_count,
  }));

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Estadísticas Globales</h1>

      {/* 1. Demografía */}
      <section style={styles.chartSection}>
        <h2 style={styles.subheading}>Demografía de Usuarios Atendidos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={demographicData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {demographicData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* 2. Prioridad */}
      <section style={styles.chartSection}>
        <h2 style={styles.subheading}>Distribución por Prioridad</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={priorityData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {priorityData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* 3. Estadísticas por puesto */}
      <section style={styles.chartSection}>
        <h2 style={styles.subheading}>Estadísticas por Puesto</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Atendidos" fill="#4ade80" />
            <Bar dataKey="Activos" fill="#60a5fa" />
            <Bar dataKey="Cancelados" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#111827',
  },
  chartSection: {
    marginTop: '3rem',
    backgroundColor: '#f9fafb',
    padding: '2rem',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
  },
  subheading: {
    fontSize: '1.4rem',
    color: '#374151',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
  error: {
    textAlign: 'center',
    color: '#dc2626',
    fontSize: '1.1rem',
    marginTop: '2rem',
  },
};
