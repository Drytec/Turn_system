
import React, { useEffect, useState } from 'react';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        // Simulación de datos (reemplaza con tu backend real)
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: [
                  {
                    id: 1,
                    nombre: 'Diseño Web',
                    descripcion: 'Diseñamos sitios modernos, intuitivos y adaptables.',
                  },
                  {
                    id: 2,
                    nombre: 'Branding & Identidad',
                    descripcion: 'Creamos marcas coherentes, memorables y con propósito.',
                  },
                  {
                    id: 3,
                    nombre: 'Automatización',
                    descripcion: 'Optimizamos tus procesos usando herramientas digitales.',
                  },
                ],
              }),
            1000
          )
        );

        setServicios(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
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
          {servicios.map((servicio) => (
            <div key={servicio.id} style={styles.card}>
              <h2 style={styles.title}>{servicio.nombre}</h2>
              <p style={styles.description}>{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Servicios;

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