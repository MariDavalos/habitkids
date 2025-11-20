import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoutineTimer() {
  const navigate = useNavigate();
  const location = useLocation();

  const task = location.state?.task || {
    label: "Rutina",
    icon: "✏️",
    duration: 3 * 60,
  };

  const [secondsLeft, setSecondsLeft] = useState(task.duration || 3 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const formatTime = (total) => {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const timeText = secondsLeft > 0 ? formatTime(secondsLeft) : "00:00";

  // ⏱️ Contador: solo corre si NO está pausado
  useEffect(() => {
    if (isPaused) return;

    if (secondsLeft <= 0) {
      // cuando termina, marca la rutina como completada
      navigate("/child/today", {
        state: { completedLabel: task.label },
      });
      return;
    }

    const id = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft, isPaused, navigate, task.label]);

  const handleFinish = () => {
    navigate("/child/today", {
      state: { completedLabel: task.label },
    });
  };

  const handleEmergencyYes = () => {
    setIsPaused(true);         // pausa el tiempo
    setShowEmergency(false);   // cierra modal
  };

  const handleEmergencyNo = () => {
    setIsPaused(false);        // sigue corriendo
    setShowEmergency(false);   // cierra modal
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center relative">

      {/* Botón EMERGENCIA (arriba derecha) */}
      <button
        onClick={() => setShowEmergency(true)}
        className="absolute right-6 top-6 px-5 py-2 rounded-full 
          bg-yellow-300 hover:bg-yellow-400 text-black font-semibold shadow"
      >
        ¡Emergencia!
      </button>

      {/* CÍRCULO CON CRONÓMETRO */}
      <div className="relative w-56 h-56 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border-[12px] border-yellow-400" />

        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="text-4xl mb-2">{task.icon}</div>
          <div className="text-5xl font-extrabold tracking-wide text-black">
            {timeText}
          </div>
        </div>
      </div>

      {/* Mensaje motivacional */}
      <p className="text-sm text-gray-700 mb-2">
        ¡Tú puedes! {task.label && `(${task.label})`}
      </p>
      {isPaused && (
        <p className="text-xs text-red-500 mb-2">
          Rutina pausada por emergencia.
        </p>
      )}

      {/* Botón TERMINÉ */}
      <button
        onClick={handleFinish}
        className="mt-2 px-8 py-2 rounded-full bg-[#7195FF] text-white font-semibold shadow-md
          hover:bg-[#567dff] transition"
      >
        ¡Terminé!
      </button>

      {/* MODAL DE EMERGENCIA SOBRE EL TIMER */}
      {showEmergency && (
        <div className="fixed inset-0 bg-[#E5E7F5]/60 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-6 w-[280px] text-center">
            <p className="text-xs text-gray-500 mb-5">
              Úsalo solo en emergencias.
            </p>

            <button
              onClick={handleEmergencyYes}
              className="w-full py-2 mb-3 rounded-full bg-red-500 border border-red-300
                hover:bg-red-600 text-white text-sm font-semibold"
            >
              Sí, pausar
            </button>

            <button
              onClick={handleEmergencyNo}
              className="w-full py-2 rounded-full bg-gray-100 hover:bg-gray-200 
                text-gray-700 text-sm"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
