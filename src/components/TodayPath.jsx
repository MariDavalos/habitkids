import React from "react";
import { useNavigate } from "react-router-dom";

export default function TodayPath() {
  const navigate = useNavigate();

  const tareas = [
    { label: "Desayuno y arreglo", icon: "🍽️", done: true },
    { label: "Cama ordenada", icon: "🛏️", done: true },
    { label: "Lectura diaria", icon: "📒", done: false, highlight: true },
    { label: "Rutina de aseo", icon: "🛁", done: false },
    { label: "Tarea escolar", icon: "⚙️", done: false },
    { label: "Juego libre", icon: "⚙️", done: false },
  ];

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
          <div
            key={i}
            className="flex flex-col items-center mb-8 relative z-10"
          >
            {/* ICONO */}
            <div
              className={`
                w-16 h-16 flex items-center justify-center rounded-full border-2
                ${t.highlight ? "bg-yellow-400 border-yellow-500" : "bg-white border-gray-300"}
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
          </div>
        ))}
      </div>

      {/* Botón final */}
      <button className="mt-6 px-8 py-2 bg-gray-400 text-white rounded-full">
        Terminado
      </button>
    </div>
  );
}
