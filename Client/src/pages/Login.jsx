import React, { useState } from 'react';
import { getLogin } from '../api/login';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getLogin({ username, password });
      console.log('Login exitoso:', data);
      alert('¡Bienvenido ' + data.user.name + '!');
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar sesión</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo Electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;

const styles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      margin: '100px auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '0.75rem',
      fontSize: '1rem',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };