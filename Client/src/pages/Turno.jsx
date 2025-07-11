import React from 'react';
import { crearTurno } from '../api/turno';
import { useLocation } from 'react-router-dom';

const Turno = () => {
  const location = useLocation();
  const { turn_num, servicio, lugar} = location.state || {};

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Este es tu turno:</h1>

      <div style={styles.infoBox}>
        <p><strong>Lugar:</strong> {lugar || 'No disponible'}</p>
        <p><strong>Servicio:</strong> {servicio || 'No disponible'}</p>
        <p><strong>Número de Turno:</strong> {turn_num || 'No disponible'}</p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '30px',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    fontSize: '1.2rem',
    color: '#34495e',
    lineHeight: '2',
  },
};

export default Turno;