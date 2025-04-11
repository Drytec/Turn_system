import React from 'react';
import { crearTurno } from '../api/turno';

const Turno = ({ userId, placeId, serviceId, onSuccess }) => {
  const handleCrearTurno = async () => {
    if (!userId || !placeId || !serviceId) {
        alert('Todos los campos son requeridos');
        return;
      }
    const turnoData = {
      user_id: userId,
      place_id: placeId,
      service_id: serviceId,
      turn_num: Math.floor(Math.random() * 1000), // Puedes usar lógica real para el número de turno
    };

    const result = await crearTurno(turnoData);

    if (result.success) {
      alert('Turno creado correctamente');
      if (onSuccess) onSuccess();
    } else {
      alert('Error al crear turno: ' + JSON.stringify(result.error));
    }
  };

  return (
    <button style={styles.button} onClick={handleCrearTurno}>
      Solicitar Turno
    </button>
  );
};

const styles = {
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#34495e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    marginTop: '0.5rem',
  },
};

export default Turno;