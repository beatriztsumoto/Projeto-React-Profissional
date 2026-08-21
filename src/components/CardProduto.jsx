import { FaPlus, FaCheck } from 'react-icons/fa';
import { Botao } from './Botao';

export const CardProduto = ({ vinil, onAdicionar, estaNoCarrinho }) => {
  return (
    <div className="bg-zinc-900/90 rounded-2xl p-4 flex flex-col justify-between border border-zinc-800 hover:border-rose-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-rose-950/40 group">
      <div>
        {/* Capa Oficial com Efeito LP ao fundo */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 border border-zinc-800 bg-zinc-950 flex items-center justify-center">
          <img 
            src={vinil.imagem} 
            alt={vinil.titulo} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 bg-zinc-950/80 backdrop-blur-md text-rose-400 rounded-full border border-rose-900/60">
            {vinil.genero}
          </span>
        </div>

        <h3 className="font-bold text-lg text-zinc-100 group-hover:text-rose-500 transition-colors line-clamp-1">{vinil.titulo}</h3>
        <p className="text-zinc-400 text-sm mb-2">{vinil.artista}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
        <span className="text-xl font-black text-rose-500">
          R$ {vinil.preco.toFixed(2)}
        </span>
        <Botao 
          variant={estaNoCarrinho ? "secondary" : "primary"} 
          onClick={() => onAdicionar(vinil)}
        >
          {estaNoCarrinho ? <FaCheck className="text-emerald-400" /> : <FaPlus />}
          {estaNoCarrinho ? "No Carrinho" : "Comprar"}
        </Botao>
      </div>
    </div>
  );
};