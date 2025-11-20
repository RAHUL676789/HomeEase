const Button = ({ variant, htmlType = "button", onClick, disabled, children }) => {
  const baseStyle =
    "px-4 py-2   text-white text-sm rounded-lg transition-all ";

  const styles = {
    apply: "bg-teal-700 text-white hover:bg-teal-800", 
    next: "bg-cyan-500 text-white hover:bg-cyan-600",  
    delete: "bg-red-500 text-white hover:bg-red-600", 
    cancel: "bg-gray-400 text-gray-800 hover:bg-gray-600", 
    edit: "bg-amber-500 text-white hover:bg-amber-600", 
  };

  return (
    <button
      type={htmlType}   // 🔹 ab HTML ka asli type alag se pass hoga
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${styles[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default Button;
