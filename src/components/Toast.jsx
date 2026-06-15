import React from "react";

const Toast = ({ message, type }) => {
  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-slide z-50`}
    >
      <div className="flex items-center gap-2">
        <i
          className={`fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}`}
        ></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
