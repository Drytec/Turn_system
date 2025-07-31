import { useEffect, useState } from "react";
import { getNextTurn, cerrarTurno } from "../api/turno";
import { fetchPuestoById, getPuestosByUser } from "../api/puestos";

export default function WorkerPage() {
  const [puestos, setPuestos] = useState([]);              
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null); 
  const [turnoActual, setTurnoActual] = useState(null);    
  const [turnoCerrado, setTurnoCerrado] = useState(false); 
  const [message, setMessage] = useState(null);
  const [puestoNombre, setPuestoNombre] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchPuestosConNombre = async () => {
        try {
        const userId = localStorage.getItem("user_id");
        console.log("📥 ID del usuario:", userId);

        // 1️⃣ Traer puestos asignados al usuario
        const puestosAsignados = await getPuestosByUser(userId);
        console.log("📥 Puestos asignados desde el backend:", puestosAsignados);

        if (!puestosAsignados || puestosAsignados.length === 0) {
            console.log("⚠️ No hay puestos asignados para este usuario");
            setPuestos([]);
            return;
        }

        // 2️⃣ Para cada puesto asignado traer el nombre con fetchPuestoById
        const puestosConNombre = await Promise.all(
            puestosAsignados.map(async (p) => {
            const puestoInfo = await fetchPuestoById(p.place_id);
            console.log(`📥 Nombre del puesto ${p.place_id}:`, puestoInfo.place_name);

            return {
                ...p,
                place_name: puestoInfo.place_name || "Sin nombre",
            };
            })
        );

        // 3️⃣ Guardar todo junto en el estado
        console.log("✅ Puestos finales con nombre:", puestosConNombre);
        setPuestos(puestosConNombre);

        } catch (err) {
        console.error("❌ Error cargando puestos y nombres:", err);
        setMessage("Error al cargar los puestos.");
        }
    };

    fetchPuestosConNombre();
    }, []);

  // 👉 2. Asignar el primer turno de un puesto
  const handleAsignarTurno = async (placeId) => {
    try {
      const userId = localStorage.getItem("user_id");
      const turno = await getNextTurn(userId, placeId);

      if (turno.success) {
        setTurnoActual(turno.data);
        setTurnoCerrado(false);
        setPuestoSeleccionado(placeId);

        const puesto = await fetchPuestoById(placeId);
        setPuestoNombre(puesto.place_name);
      } else {
        setTurnoActual(null);   
        setPuestoSeleccionado(placeId); 
        setMessage(null);
      }
    } catch (err) {
      console.error("❌ Error asignando turno", err);
      setMessage("Ocurrió un error al asignar turno.");
    }
  };

  // 👉 3. Cerrar el turno actual
  const handleCerrarTurno = async () => {
    try {
      if (!turnoActual) return;

      const userId = localStorage.getItem("user_id");
      await cerrarTurno(userId, turnoActual.turn_id);

      setMessage(`✅ Turno ${turnoActual.turn_name} cerrado.`);
      setTurnoCerrado(true);
    } catch (err) {
      console.error("❌ Error cerrando turno", err);
      setMessage("Ocurrió un error al cerrar el turno.");
    }
  };

  // 👉 4. Asignar el siguiente turno
  const handleSiguienteTurno = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const turno = await getNextTurn(userId, puestoSeleccionado);

      if (turno.success) {
        setTurnoActual(turno.data);
        setTurnoCerrado(false);
      } else {
        setMessage("No hay más turnos activos.");
        setTurnoActual(null);
      }
    } catch (err) {
      console.error("❌ Error asignando siguiente turno", err);
      setMessage("Ocurrió un error al obtener el siguiente turno.");
    }
  };

  // 👉 5. Volver a la pantalla de selección de puestos
  const handleVolver = () => {
    setTurnoActual(null);
    setTurnoCerrado(false);
    setPuestoSeleccionado(null);
    setReload(prev => !prev);
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>🎯 Panel de Trabajador</h1>

      {message && <div style={styles.message}>{message}</div>}

      {/* 📌 Pantalla de selección de puestos */}
      {!puestoSeleccionado && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Selecciona tu puesto:</h2>
          {puestos.length === 0 ? (
            <p>No tienes puestos asignados.</p>
          ) : (
            puestos.map((puesto) => (
              <button
                key={puesto.place_id}
                style={styles.button}
                onClick={() => handleAsignarTurno(puesto.place_id)}
              >
                {puesto.place_name}
              </button>
            ))
          )}
        </div>
      )}

      {/* 📌 Pantalla de gestión de turnos */}
      {puestoSeleccionado && turnoActual && (
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
                onClick={handleCerrarTurno}
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
        {/* 📌 NUEVA SECCIÓN: No hay turnos */}
        {puestoSeleccionado && !turnoActual && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2 style={{ color: '#e74c3c' }}>🚫 No hay turnos activos en este puesto</h2>
                <button
                    style={{ ...styles.button, backgroundColor: '#95a5a6', marginTop: '1rem' }}
                    onClick={handleVolver}
                >
                🔙 Volver
                </button>
            </div>
        )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '2rem',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#2c3e50'
  },
  message: {
    margin: '1rem 0',
    color: '#e74c3c'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  puestoButton: {   // 👈 nuevo estilo solo para los botones de puestos
    display: 'block',
    width: '220px',
    margin: '10px auto',
    padding: '14px 20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: '#2980b9',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  puestoButtonHover: {
    backgroundColor: '#1c5980'
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  turnoCard: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginTop: '1rem'
  }
};