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
      console.log('Respuesta completa del login:', data); // Depuración detallada
  
      // Verificación exhaustiva del token
      if (!data?.access) {
        console.error('Estructura inesperada:', data);
        throw new Error('El servidor no devolvió un token válido');
      }
  
      // Almacenamiento seguro
      localStorage.setItem('access_token', data.access);
      
      // Guardar refresh token si existe
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
  
      console.log('Token almacenado:', localStorage.getItem('access_token')); // Verificación
  
      // Manejo de datos de usuario
      if (data.user) {
        localStorage.setItem('role_id', data.user.role_id);
        localStorage.setItem('user_id', data.user.id); // Cambiado de user_id a id para consistencia
        localStorage.setItem('user_name', data.user.name);
        
        alert(`¡Bienvenido ${data.user.name}!`);
        
        const roleId = Number(data.user.role_id);
        console.log('Role ID:', roleId);
        
        // Navegación basada en roles
        if (roleId === 1) {
          navigate('/crear', { replace: true, state: { freshLogin: true } }); // Admin
        } else if (roleId === 3) {
          navigate('/trabajador', { replace: true, state: { freshLogin: true } }); // Trabajador
        } else {
          navigate('/puestos', { replace: true, state: { freshLogin: true } }); // Cliente
        }
      } else {
        navigate('/puestos', { replace: true });
      }
      
    } catch (error) {
      console.error('Error completo:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      
      setError(error.response?.data?.detail || 'Error al iniciar sesión');
      alert(error.response?.data?.detail || 'Credenciales incorrectas');
    }
  };

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