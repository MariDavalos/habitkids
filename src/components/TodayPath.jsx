import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const initialTasks = [
  { label: "Desayuno y arreglo", icon: "🍽️", done: true,  duration: 2 * 60 },
  { label: "Cama ordenada",      icon: "🛏️", done: true,  duration: 2 * 60 },
  { label: "Lectura diaria",     icon: "📒", done: false, highlight: true, duration: 3 * 60 },
  { label: "Rutina de aseo",     icon: "🛁", done: false, duration: 2 * 60 },
  { label: "Tarea escolar",      icon: "⚙️", done: false, duration: 5 * 60 },
  { label: "Juego libre",        icon: "⚙️", done: false, duration: 10 * 60 },
];

export default function TodayPath() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tareas, setTareas] = useState(initialTasks);

  // 🔁 Cuando volvemos del timer, marcamos la tarea como completada,
  // la bloqueamos y pasamos el highlight a la siguiente.
  useEffect(() => {
    const completedLabel = location.state?.completedLabel;
    if (!completedLabel) return;

    setTareas((prev) => {
      // 1. marcar como done
      let updated = prev.map((t) =>
        t.label === completedLabel ? { ...t, done: true } : { ...t }
      );

      // 2. quitar highlight a todas
      updated = updated.map((t) => ({ ...t, highlight: false }));

      // 3. buscar la siguiente tarea pendiente después de la completada
      const completedIndex = updated.findIndex(
        (t) => t.label === completedLabel
      );
      if (completedIndex !== -1) {
        const nextIndex = updated.findIndex(
          (t, idx) => idx > completedIndex && !t.done
        );
        if (nextIndex !== -1) {
          updated[nextIndex] = { ...updated[nextIndex], highlight: true };
        }
      }

      return updated;
    });

    // limpiar el state para que no se repita al recargar/navegar
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state, location.pathname, navigate]);

  const handleOpenRoutine = (task) => {
    if (task.done) return; // bloqueada si ya está hecha
    navigate("/child/today/timer", { state: { task } });
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFBEF] flex flex-col items-center py-10 relative">

      {/* --- BOTÓN VOLVER (Arriba Izquierda) --- */}
      <button
        onClick={() => navigate("/child/dashboard")}
        className="
          absolute left-5 top-5
          flex items-center gap-2
          bg-white border border-gray-300 text-gray-700 
          px-4 py-2 rounded-full shadow-sm
          hover:shadow-md hover:bg-gray-50 transition-all
        "
      >
        <span className="text-xl">←</span>
        <span className="font-medium">Volver</span>
      </button>

      {/* --- BOTÓN SALIR (Arriba Derecha) --- */}
      <button
        onClick={() => navigate("/login")}
        className="
          absolute right-5 top-5
          w-14 h-14 flex items-center justify-center rounded-full 
          bg-yellow-400 hover:bg-yellow-500 shadow-lg 
          transition-all duration-200
        "
        title="Cerrar sesión"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="black"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      </button>

      {/* --- Título --- */}
      <h2 className="text-lg font-semibold text-purple-700 mb-10 mt-16">
        Camino de Hoy
      </h2>

      {/* --- Timeline --- */}
      <div className="flex flex-col items-center relative">
        {/* Línea vertical */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-gray-300"></div>

        {tareas.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleOpenRoutine(t)}
            disabled={t.done}
            className="flex flex-col items-center mb-8 relative z-10 focus:outline-none"
          >
            {/* ICONO */}
            <div
              className={`
                w-16 h-16 flex items-center justify-center rounded-full border-2
                ${
                  t.done
                    ? "bg-[#E3FBE7] border-green-500"   // COMPLETADA: verde
                    : t.highlight
                    ? "bg-yellow-400 border-yellow-500" // NIVEL ACTUAL: amarillo
                    : "bg-white border-gray-300"        // Pendiente
                }
                ${
                  t.done
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:scale-105 transition-transform"
                }
              `}
            >
              <span className="text-3xl">{t.icon}</span>
            </div>

            {/* CHECK */}
            {t.done && (
              <span className="text-green-600 text-xl font-bold absolute right-[-25px] top-1">
                ✔
              </span>
            )}

            {/* LABEL */}
            <p className="text-xs mt-2 text-gray-700">{t.label}</p>
          </button>
        ))}
      </div>

      {/* Botón final (por ahora solo visual) */}
      <button className="mt-6 px-8 py-2 bg-gray-400 text-white rounded-full">
        Terminado
      </button>
    </div>
  );
}
