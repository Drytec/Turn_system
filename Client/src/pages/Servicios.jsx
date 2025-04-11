
import React, { useEffect, useState } from 'react';
import { getServices } from '../api/services'; // ajusta la ruta si es necesario

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServices();
        setServicios(data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Servicios que ofrecemos</h1>
      {loading ? (
        <p style={styles.loading}>Cargando servicios...</p>
      ) : (
        <div style={styles.column}>
          {servicios.map((servicio, index) => (
            <div key={index} style={styles.card}>
              <h2 style={styles.title}>{servicio['tipo del servicio']}</h2>
              <p style={styles.description}>{servicio['Descripcion del servicio']}</p>
              <p style={{ fontStyle: 'italic', color: '#777' }}>
                Categoría: {servicio['Categoria del servicio']}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Servicios;

// estilos iguales que antes...
const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.2rem',
    marginBottom: '2rem',
    color: '#2c3e50',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#555',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '1.4rem',
    color: '#34495e',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  },
};