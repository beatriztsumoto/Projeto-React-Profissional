export const Botao = ({ children, onClick, variant = "primary", className = "", type = "button" }) => {
  const baseStyle = "px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95";
  const variants = {
    primary: "bg-rose-700 hover:bg-rose-600 text-white font-bold shadow-rose-950/50",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700",
    danger: "bg-red-800 hover:bg-red-700 text-white"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};