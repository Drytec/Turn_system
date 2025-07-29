import { useEffect, useState } from "react";
import { getAllTurnos, cerrarTurno, cancelarTurno, getNextTurn } from "../api/turno";
import { fetchPuestoById } from "../api/puestos";
import { jwtDecode } from "jwt-decode";

export default function WorkerPage() {
  const [asignandoTurno, setAsignandoTurno] = useState(false);  // modo asignación
  const [turnoActual, setTurnoActual] = useState(null);         // turno que se está atendiendo
  const [turnoCerrado, setTurnoCerrado] = useState(false);      // habilita Siguiente/Volver
  const [message, setMessage] = useState(null);
  const [puestoNombre, setPuestoNombre] = useState("");

  // 👉 Asignar el primer turno activo
  const handleAsignarTurno = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const placeId = 1; // ⚠️ Ajusta según el lugar del trabajador

      const turno = await getNextTurn(userId, placeId);
      if (turno.success) {
        setTurnoActual(turno.data);
        setAsignandoTurno(true);
        setTurnoCerrado(false);

        const puesto = await fetchPuestoById(placeId);
        setPuestoNombre(puesto.place_name);
      } else {
        setMessage("No hay turnos activos.");
      }
    } catch (err) {
      console.error("❌ Error asignando turno", err);
      setMessage("Ocurrió un error al asignar turno.");
    }
  };

  // 👉 Cerrar el turno actual
  const handleCerrarTurno = async () => {
    try {
      if (!turnoActual) return;

      const userId = localStorage.getItem("user_id");
      await cerrarTurno(userId, turnoActual.turn_id);

      setMessage(`✅ Turno ${turnoActual.turn_name} cerrado.`);
      setTurnoCerrado(true); // 🔓 habilita Siguiente y Volver
    } catch (err) {
      console.error("❌ Error cerrando turno", err);
      setMessage("Ocurrió un error al cerrar el turno.");
    }
  };

  // 👉 Asignar el siguiente turno
  const handleSiguienteTurno = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const placeId = 1; // ⚠️ usa el place_id correcto

      const turno = await getNextTurn(userId, placeId);
      if (turno.success) {
        setTurnoActual(turno.data);
        setTurnoCerrado(false);
        const puesto = await fetchPuestoById(turno.place_id);
        setPuestoNombre(puesto.place_name);
      } else {
        setMessage("No hay más turnos activos.");
        setAsignandoTurno(false); // vuelve al modo inicial
      }
    } catch (err) {
      console.error("❌ Error asignando siguiente turno", err);
      setMessage("Ocurrió un error al obtener el siguiente turno.");
    }
  };

  // 👉 Volver a la pantalla inicial
  const handleVolver = () => {
    setAsignandoTurno(false);
    setTurnoActual(null);
    setTurnoCerrado(false);
  };

  return (
    <div style={styles.wrapper}>
        <h1 style={styles.heading}>🎯 Panel de Trabajador</h1>

        {/* Mensaje de confirmación o error */}
        {message && <div style={styles.message}>{message}</div>}

        {/* Si no hay turno asignado, mostrar solo el botón Asignar Turno */}
        {!asignandoTurno ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
            style={styles.button}
            onClick={handleAsignarTurno}
            >
            Asignar Turno
            </button>
        </div>
        ) : (
        <div>
            <h2 style={styles.subHeading}>📝 Atendiendo Turno</h2>
            <div style={styles.turnoCard}>
            <p><strong>Turno:</strong> {turnoActual.turn_name}</p>
            <p><strong>Prioridad:</strong> {turnoActual.turn_priority === "H" ? "Alta" : turnoActual.turn_priority === "M" ? "Media" : "Baja"}</p>
            <p><strong>Usuario:</strong> {turnoActual.owner ? `ID: ${turnoActual.owner}` : "Sin dueño"}</p>
            <p><strong>Puesto:</strong> {puestoNombre || "-"}</p>
            <p className="text-gray-500 text-sm">
                Creado: {new Date(turnoActual.date_created).toLocaleString()}
            </p>

            {/* Botones de acción */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button
                style={{ ...styles.button, backgroundColor: '#95a5a6' }}
                onClick={handleVolver}
                >
                🔙 Volver
                </button>

                <button
                style={{ ...styles.button, backgroundColor: '#e74c3c' }}
                onClick={() => handleCerrarTurno(turnoActual.turn_id)}
                >
                ✅ Cerrar
                </button>

                <button
                style={{
                    ...styles.button,
                    backgroundColor: turnoCerrado ? '#27ae60' : '#bdc3c7',
                    cursor: turnoCerrado ? 'pointer' : 'not-allowed'
                }}
                disabled={!turnoCerrado}
                onClick={handleSiguienteTurno}
                >
                ⏭ Siguiente
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
    );
}

const styles = {
  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "3rem 1.5rem",
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e0e0e0",
    marginTop: "80px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: "1.1rem",
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "6px",
    backgroundColor: "#f1f1f1",
  },
  card: {
    padding: "1rem",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
    marginBottom: "1rem",
  },
  buttonAtender: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buttonCancelar: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "0.5rem",
  },
};