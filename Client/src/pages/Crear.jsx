import React, { useState, useEffect } from 'react';
import { createPlace } from '../api/crearPuestos';
import { createService } from '../api/crearServicio';
import { createEmployee } from '../api/crearEmpleados';
import { fetchPuestos } from '../api/puestos'; // Traemos la función para obtener los puestos

const Crear = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [formData, setFormData] = useState({
    place_name: '',
    service_name: '',
    service_desc: ''
  });

  // 🔥 Nuevo estado para empleados
  const [employeeData, setEmployeeData] = useState({
    email: '',
    password: '',
    name: '',
    last_name: '',
    age: '',
    condition: ''
  });

  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    const obtenerPuestos = async () => {
      try {
        const data = await fetchPuestos();
        setPuestos(data);
      } catch (error) {
        console.error('Error al obtener los puestos:', error);
      }
    };
    obtenerPuestos();
  }, []);

  const handleButtonClick = (formType) => {
    setCurrentForm(formType);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentForm === 'employee') {
      setEmployeeData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Nuevo método para enviar empleados
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentForm === 'place') {
        const newService = await createService({
          service_name: formData.service_name,
          service_desc: formData.service_desc
        });

        await createPlace({
          place_name: formData.place_name,
          service_id: newService.service_id
        });
      } else if (currentForm === 'service') {
        await createService({
          service_name: formData.service_name,
          service_desc: formData.service_desc
        });
      } else if (currentForm === 'employee') {
        const response = await createEmployee(employeeData);
        if (response.success) {
          alert("✅ Empleado creado con éxito!");
        } else {
          alert("❌ Error: " + JSON.stringify(response.error));
        }
      }

      setShowModal(false);
      setFormData({ place_name: '', service_name: '', service_desc: '' });
      setEmployeeData({ email: '', password: '', name: '', last_name: '', age: '', condition: '' });
    } catch (error) {
      alert(`Error al crear: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Panel de Administración</h1>

      <div style={styles.buttonGroup}>
        <button style={styles.actionButton} onClick={() => handleButtonClick('place')}>
          Crear Puesto
        </button>

        <button style={styles.actionButton} onClick={() => handleButtonClick('service')}>
          Crear Servicio
        </button>

        {/* ✅ Nuevo botón */}
        <button style={styles.actionButton} onClick={() => handleButtonClick('employee')}>
          Crear Empleado
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={() => setShowModal(false)}>×</button>

            <h2 style={{...styles.heading, fontSize: '1.8rem', marginBottom: '1.5rem'}}>
              {currentForm === 'place' && 'Nuevo Puesto + Servicio'}
              {currentForm === 'service' && 'Nuevo Servicio'}
              {currentForm === 'employee' && 'Nuevo Empleado'}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* 👉 FORMULARIO DE EMPLEADO */}
              {currentForm === 'employee' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Nombre:</label>
                    <input type="text" name="name" value={employeeData.name} onChange={handleInputChange} style={styles.input} required />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Apellido:</label>
                    <input type="text" name="last_name" value={employeeData.last_name} onChange={handleInputChange} style={styles.input} required />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Correo:</label>
                    <input type="email" name="email" value={employeeData.email} onChange={handleInputChange} style={styles.input} required />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Contraseña:</label>
                    <input type="password" name="password" value={employeeData.password} onChange={handleInputChange} style={styles.input} required />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Edad:</label>
                    <input type="number" name="age" value={employeeData.age} onChange={handleInputChange} style={styles.input} />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Condición:</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      style={styles.input}
                      required
                    >
                      <option value="">-- Selecciona --</option>
                      <option value={true}>Activo</option>
                      <option value={false}>Inactivo</option>
                    </select>
                  </div>
                </>
              )}

              {/* 👉 FORMULARIOS DE SERVICIO Y PUESTO (ya existentes) */}
              {currentForm !== 'employee' && currentForm === 'place' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre del Puesto:</label>
                  <input type="text" name="place_name" value={formData.place_name} onChange={handleInputChange} style={styles.input} required />
                </div>
              )}

              {currentForm !== 'employee' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Nombre del Servicio:</label>
                    <input type="text" name="service_name" value={formData.service_name} onChange={handleInputChange} style={styles.input} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Descripción:</label>
                    <textarea name="service_desc" value={formData.service_desc} onChange={handleInputChange} style={styles.textarea} required />
                  </div>
                </>
              )}

              <button type="submit" style={styles.submitButton}>Crear</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crear;

const styles = {
  wrapper: {
    maxWidth: '600px',
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  actionButton: {
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e0e0e0',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#666',
  },
  formGroup: {
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    minHeight: '100px',
    resize: 'vertical',
  },
  submitButton: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  puestosContainer: {
    marginTop: '3rem', // Da espacio debajo de los botones
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  puestosHeading: {
    fontSize: '1.6rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  puestosList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  puestoItem: {
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};