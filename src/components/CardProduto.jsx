import { FaPlus, FaCheck } from 'react-icons/fa';
import { Botao } from './Botao';

export const CardProduto = ({ vinil, onAdicionar, estaNoCarrinho }) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-4 flex flex-col justify-between border border-zinc-700 hover:border-amber-500 transition-all shadow-lg">
      <div>
        <div className="w-full h-48 bg-zinc-900 rounded-lg flex items-center justify-center mb-4 border border-zinc-700">
          <div className="w-32 h-32 rounded-full border-4 border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-zinc-900">
              LP
            </div>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-zinc-700 text-amber-400 rounded-full">
          {vinil.genero}
        </span>
        <h3 className="font-bold text-lg text-zinc-100 mt-2">{vinil.titulo}</h3>
        <p className="text-zinc-400 text-sm mb-2">{vinil.artista}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between border-t border-zinc-700 pt-3">
        <span className="text-xl font-bold text-amber-500">
          R$ {vinil.preco.toFixed(2)}
        </span>
        <Botao 
          variant={estaNoCarrinho ? "secondary" : "primary"} 
          onClick={() => onAdicionar(vinil)}
        >
          {estaNoCarrinho ? <FaCheck className="text-green-400" /> : <FaPlus />}
          {estaNoCarrinho ? "Adicionado" : "Comprar"}
        </Botao>
      </div>
    </div>
  );
};