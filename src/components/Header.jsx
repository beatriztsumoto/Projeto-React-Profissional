import { FaRecordVinyl, FaShoppingCart } from 'react-icons/fa';

export const Header = ({ rotaAtual, setRotaAtual, carrinhoQtd }) => {
  return (
    <header className="bg-zinc-950/90 backdrop-blur-md text-zinc-100 p-4 shadow-2xl border-b border-rose-900/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setRotaAtual('home')}>
          <FaRecordVinyl className="text-rose-600 text-3xl animate-spin-slow group-hover:text-rose-500 transition-colors" />
          <span className="font-extrabold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-rose-500 to-rose-700">
            RED VINYL
          </span>
        </div>
        <nav className="flex gap-6 items-center">
          <button 
            onClick={() => setRotaAtual('home')} 
            className={`font-semibold transition-all hover:text-rose-500 ${rotaAtual === 'home' ? 'text-rose-500 border-b-2 border-rose-600' : 'text-zinc-300'}`}
          >
            Loja
          </button>
          <button 
            onClick={() => setRotaAtual('contato')} 
            className={`font-semibold transition-all hover:text-rose-500 ${rotaAtual === 'contato' ? 'text-rose-500 border-b-2 border-rose-600' : 'text-zinc-300'}`}
          >
            Contato
          </button>
          <div className="relative flex items-center bg-zinc-900 border border-rose-900/60 px-3 py-1.5 rounded-full transition-all">
            <FaShoppingCart className="text-rose-500 text-lg" />
            <span className="ml-2 text-xs font-bold text-zinc-100 bg-rose-700 px-2 py-0.5 rounded-full">
              {carrinhoQtd}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};