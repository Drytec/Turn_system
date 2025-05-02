import React, { useState } from 'react';
import { getLogin } from '../api/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await getLogin({ email, password });
      console.log('Login exitoso:', data);
  
      if (!data.token && !data.message) {
        throw new Error('Respuesta inesperada del servidor');
      }
  
      localStorage.setItem('token', data.token || '');
      
      if (data.user) {
        localStorage.setItem('role_id', data.user.role_id);
        localStorage.setItem('user_id', data.user.user_id);
        alert(`¡Bienvenido ${data.user['Nombre del usuario']}!`);
        
        const roleId = Number(data.user.role_id);
        console.log(roleId);
        navigate(roleId === 1 ? '/crear' : '/puestos', { replace: true });
      } else {
        navigate('/puestos', { replace: true });
      }
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas');
      alert(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Iniciar sesión</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  wrapper: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    textAlign: 'center',
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};