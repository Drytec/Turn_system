import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/user/employee', employeeData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Error creando empleado:", error.response?.data || error);
    return { success: false, error: error.response?.data || "Error al crear empleado" };
  }
};

export const fetchEmpleados = async () => {
  try {
    const response = await api.get("/user/employee");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener empleados:", error);
    throw error;
  }
};