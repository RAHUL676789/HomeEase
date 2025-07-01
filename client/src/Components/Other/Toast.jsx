import React from 'react';

const Toast = ({ type, content, id, remover }) => {
  const toastStyles = {
    success: {
      icon: "✅",
      title: "Success",
      border: "border-green-400",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    error: {
      icon: "❗",
      title: "Error",
      border: "border-red-400",
      bg: "bg-red-50",
      text: "text-red-700",
    },
    warning: {
      icon: "⚠️",
      title: "Warning",
      border: "border-yellow-400",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
  };

  const { icon, title, border, bg, text } = toastStyles[type];

  return (
    <div
      className={`${bg} ${text} ${border} border border-dashed 
        rounded-md px-4 py-2 w-[300px] shadow-sm animate-fade-in 
        transition-all duration-300 text-sm`}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="font-semibold">{title}</span>
        </div>
        <button
          onClick={() => remover(id)}
          className="text-base font-bold text-gray-400 hover:text-black transition"
        >
          &times;
        </button>
      </div>
      <p className="mt-1 ml-6 text-xs font-normal">{content}</p>
    </div>
  );
};

export default Toast;
