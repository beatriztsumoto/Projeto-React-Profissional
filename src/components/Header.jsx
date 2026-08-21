import { FaRecordVinyl, FaShoppingCart } from 'react-icons/fa';

export const Header = ({ rotaAtual, setRotaAtual, carrinhoQtd }) => {
  return (
    <header className="bg-zinc-900 text-zinc-100 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRotaAtual('home')}>
          <FaRecordVinyl className="text-amber-500 text-3xl animate-spin-slow" />
          <span className="font-bold text-xl tracking-wider">GROOVE VINYL</span>
        </div>
        <nav className="flex gap-4 items-center">
          <button 
            onClick={() => setRotaAtual('home')} 
            className={`hover:text-amber-500 font-medium ${rotaAtual === 'home' ? 'text-amber-500' : ''}`}
          >
            Loja
          </button>
          <button 
            onClick={() => setRotaAtual('contato')} 
            className={`hover:text-amber-500 font-medium ${rotaAtual === 'contato' ? 'text-amber-500' : ''}`}
          >
            Contato
          </button>
          <div className="relative flex items-center bg-zinc-800 p-2 rounded-full">
            <FaShoppingCart className="text-amber-500 text-lg" />
            <span className="ml-1 text-xs font-bold text-zinc-100">{carrinhoQtd}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};