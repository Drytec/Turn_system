import React, { useState, useEffect } from 'react';
import { fetchPuestos } from '../api/puestos';
import { crearTurno } from '../api/turno';   
import { jwtDecode } from 'jwt-decode';    
import { useNavigate } from 'react-router-dom'; 

const Puestos = () => {
  const [puestos, setPuestos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    loadPuestos();
  }, []);

  const loadPuestos = async () => {
    setLoading(true);
    try {
      const data = await fetchPuestos();
      setPuestos(data);
    } catch (error) {
      console.error('Error al cargar puestos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePedirTurno = async (placeId) => {
    try {
      const userId = localStorage.getItem("user_id");

      
      const turnoResponse = await crearTurno({
        user_id: userId,
        place_id: placeId
      }); 

      if (turnoResponse.success) {
        navigate("/turno", { state: { 
          turn_id: turnoResponse.data.turn_id,
           place_id: turnoResponse.data.place_id,
            user_id: userId 
          } 
        });
      } else {
        alert("No fue posible generar el turno");
      }
    } catch (err) {
      console.error("❌ Error pidiendo turno:", err);
      alert("Hubo un error al pedir el turno");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Puestos Disponibles</h2>

      {/* 🔥 Mensaje de éxito o error */}
      {message && <div style={styles.message}>{message}</div>}

      {loading ? (
        <p style={styles.loadingText}>Cargando puestos...</p>
      ) : (
        <>
          {/* 📋 Tabla de puestos */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>ID</th>
                  <th style={styles.tableHeader}>Nombre</th>
                  <th style={styles.tableHeader}>Servicio</th>
                  <th style={styles.tableHeader}>Descripción</th>
                  <th style={styles.tableHeader}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {puestos.map((puesto) => {
                  const uniqueKey = puesto.id 
                    ? `puesto-${puesto.id}` 
                    : `puesto-${puesto.place_name}-${puesto.service?.id || 'no-service'}`;
                  
                  return (
                    <tr 
                      key={uniqueKey} 
                      style={styles.tableRow}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.tableRowHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                    >
                      <td style={styles.tableCell}>{puesto.place_id || 'N/A'}</td>
                      <td style={styles.tableCell}>{puesto.place_name}</td>
                      <td style={styles.tableCell}>{puesto.service?.service_name || '-'}</td>
                      <td style={styles.tableCell}>{puesto.service?.description || '-'}</td>
                      <td style={styles.tableCell}>
                        <button 
                          style={styles.button} 
                          onClick={() => handlePedirTurno(puesto.place_id)}
                        >
                          Pedir turno
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
    wrapper: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e0e0e0',
      marginTop: '80px',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '2rem',
      color: '#2c3e50',
      textAlign: 'center',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '2rem',
    },
    tableHeader: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
      textAlign: 'left',
    },
    tableRow: {
      borderBottom: '1px solid #e0e0e0',
    },
    tableRowHover: {
      backgroundColor: '#f5f5f5',
    },
    tableCell: {
      padding: '1rem',
      textAlign: 'left',
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#2980b9',
    },
    message: {
      textAlign: 'center',
      fontSize: '1.1rem',
      marginBottom: '1rem',
      padding: '0.5rem',
      borderRadius: '6px',
      backgroundColor: '#f1f1f1',
    },
    loadingText: {
      color: '#666',
      fontSize: '1.2rem',
      textAlign: 'center',
    }
  };

export default Puestos;