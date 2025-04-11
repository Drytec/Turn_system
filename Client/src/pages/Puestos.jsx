
import React, { useEffect, useState } from 'react';
import { getPuestos } from '../api/puestos';
import { useNavigate } from 'react-router-dom';
import { crearTurno } from '../api/turno';


const Puestos = () => {
  const [puestos, setPuestos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCrearTurno = async (servicio, place) => {
    const userId = localStorage.getItem('user_id'); 

    if (!userId) {
      alert("No se encontró el usuario. Inicia sesión nuevamente.");
      return;
    }

    const turnoData = {
      user_id: userId,
      place_id: place.place_id,
      service_id: servicio.service_id,
      turn_num: Math.floor(Math.random() * 1000),
    };
  
    const result = await crearTurno(turnoData);
  
    if (result.success) {
      navigate('/turno', {
        state: {
          turn_num: turnoData.turn_num,
          servicio: servicio.tipo,
          lugar: place.place_name,
        },
      });
    } else {
      alert('Error al crear turno');
    }
  };

  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const data = await getPuestos();
        setPuestos(data);
      } catch (error) {
        console.error('Error al cargar puestos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPuestos();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Puestos disponibles</h1>
      {loading ? (
        <p style={styles.loading}>Cargando puestos...</p>
      ) : (
        <div style={styles.column}>
          {puestos.map((puesto, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                backgroundColor: hoveredIndex === index ? '#f4f4f4' : '#ffffff',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button style={styles.puestoBtn}>
                {puesto['Nombre del lugar']}
              </button>

              {hoveredIndex === index && (
                <div style={styles.serviciosContainer}>
                  {puesto['Servicios'].map((serv, idx) => (
                    <button 
                    key={idx} 
                    style={styles.servicioBtn}
                    onClick={() => handleCrearTurno(serv, puesto)}>
                      {serv.tipo}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Puestos;

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
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e0e0e0',
    transition: 'background-color 0.3s ease',
  },
  puestoBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#e9ecef',
    color: '#2c3e50',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'default',
    fontWeight: '500',
  },
  serviciosContainer: {
    marginTop: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  servicioBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dee2e6',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s ease',
  },
};