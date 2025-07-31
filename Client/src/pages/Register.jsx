import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/register';

const Register = () => {
  const navigate = useNavigate();  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    last_name: '',
    age: '',
    condition: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.success) {
      alert("Registro exitoso 🎉");
      navigate('/login');
    } else {
      alert("Error en el registro ❌");
      console.error(result.error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Registro</h1>
      <form onSubmit={handleSubmit} style={styles.column}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="conditions"
            checked={formData.conditions}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          ¿Tiene alguna condición de discapacidad?
        </label>
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;

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
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e0e0e0',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  checkboxLabel: {
    fontSize: '0.95rem',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};