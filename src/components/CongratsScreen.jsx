import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CongratsScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // Viene desde RoutineTimer
  const completedLabel = location.state?.completedLabel;

  const handleBack = () => {
    navigate("/child/today", { state: { completedLabel } });
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">

      {/* Burbujas de fondo */}
      <div className="absolute w-24 h-24 bg-yellow-100 rounded-full top-10 left-16" />
      <div className="absolute w-20 h-20 bg-blue-100 rounded-full top-40 right-32" />
      <div className="absolute w-16 h-16 bg-yellow-50 rounded-full bottom-20 left-10" />
      <div className="absolute w-14 h-14 bg-blue-50 rounded-full bottom-10 right-14" />
      <div className="absolute w-10 h-10 bg-yellow-50 rounded-full top-1/2 left-1/3" />

      {/* Contenido principal */}
      <div className="relative flex flex-col items-center text-center px-4">
        {/* Icono medalla */}
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-yellow-400 rounded-full mx-auto flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-yellow-400 rounded-full" />
          </div>
        </div>

        {/* Texto */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          ¡Felicidades, campeona!
        </h1>

        {/* Botón */}
        <button
          onClick={handleBack}
          className="px-8 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 
                     text-gray-900 font-semibold shadow-md transition"
        >
          Volver a mis rutinas
        </button>
      </div>
    </div>
  );
}
