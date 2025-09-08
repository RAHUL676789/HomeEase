const Button = ({ variant, htmlType = "button", onClick, disabled, children }) => {
  const baseStyle =
    "px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none mb-5";

  const styles = {
    apply: "bg-teal-700 text-white hover:bg-teal-800", 
    next: "bg-cyan-500 text-white hover:bg-cyan-600",  
    delete: "bg-red-500 text-white hover:bg-red-600", 
    cancel: "bg-gray-200 text-gray-800 hover:bg-gray-300", 
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
