import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Bienvenido a nuestro sistema</h1>
      <p style={styles.subheading}>Gestiona tus turnos y servicios fácilmente</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/login')}>
          Iniciar Sesión
        </button>
        <button style={styles.buttonOutline} onClick={() => navigate('/registro')}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  button: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonOutline: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    color: '#2c3e50',
    border: '2px solid #2c3e50',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
};