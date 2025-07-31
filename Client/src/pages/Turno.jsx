import React, { useEffect, useState } from 'react';
import { getTurnoActivo } from '../api/turno';
import { useLocation } from 'react-router-dom';

const Turno = () => {
  const location = useLocation();
  const { turn_num, servicio, lugar, user_id } = location.state || {};
  const [expectedTime, setExpectedTime] = useState(null);

  useEffect(() => {
    const fetchExpectedTime = async () => {
      if (!user_id) return;

      const response = await getTurnoActivo(user_id);
      if (response.success && response.data.expected_attendacy_time) {
        setExpectedTime(response.data.expected_attendacy_time);
      }
    };

    fetchExpectedTime();
    const interval = setInterval(fetchExpectedTime, 10000); 
    return () => clearInterval(interval);
  }, [user_id]);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Este es tu turno:</h1>

      <div style={styles.infoBox}>
        <p><strong>Lugar:</strong> {lugar || 'No disponible'}</p>
        <p><strong>Servicio:</strong> {servicio || 'No disponible'}</p>
        <p><strong>Número de Turno:</strong> {turn_num || 'No disponible'}</p>
        <p>
          <strong>Tiempo estimado de atención:</strong>{' '}
          {expectedTime !== null ? `${expectedTime} minutos` : 'No disponible'}
        </p>
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
