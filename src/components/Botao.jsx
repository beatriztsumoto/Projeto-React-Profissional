export const Botao = ({ children, onClick, variant = "primary", className = "", type = "button" }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-600 text-zinc-900 font-bold",
    secondary: "bg-zinc-700 hover:bg-zinc-600 text-zinc-100",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};