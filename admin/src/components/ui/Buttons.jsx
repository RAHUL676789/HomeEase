import React from "react";

const buttonStyles = {
  submit: "bg-emerald-600 hover:bg-emerald-700 text-white",
  next: "bg-teal-600 hover:bg-teal-700 text-white",
  save: "bg-blue-600 hover:bg-blue-700 text-white",
  cancel: "bg-gray-300 hover:bg-gray-400 text-gray-800",
  delete: "bg-red-600 hover:bg-red-700 text-white",
  outline: "border-2 border-teal-600 text-teal-700 hover:bg-teal-50",
};

const Buttons = ({ type = "submit", children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold shadow transition ${buttonStyles[type]}`}
    >
      {children}
    </button>
  );
};

export default Buttons;
