import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardProduto } from './components/CardProduto';
import { FormularioContato } from './components/FormularioContato';
import { vinis } from './data/produtos';
import { FaSearch, FaTrash, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Botao } from './components/Botao';

export default function App() {
  const [rotaAtual, setRotaAtual] = useState('home');
  const [busca, setBusca] = useState('');
  const [generoFiltro, setGeneroFiltro] = useState('Todos');
  const [carrinho, setCarrinho] = useState([]);
  
  // Referência para controlar o Scroll dos Filtros
  const filtrosRef = useRef(null);

  const generos = ['Todos', ...new Set(vinis.map((v) => v.genero))];

  const vinisFiltrados = vinis.filter((vinil) => {
    const atendeBusca = vinil.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                        vinil.artista.toLowerCase().includes(busca.toLowerCase());
    const atendeGenero = generoFiltro === 'Todos' || vinil.genero === generoFiltro;
    return atendeBusca && atendeGenero;
  });

  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const toggleCarrinho = (produto) => {
    const existe = carrinho.some((item) => item.id === produto.id);
    if (existe) {
      setCarrinho(carrinho.filter((item) => item.id !== produto.id));
    } else {
      setCarrinho([...carrinho, produto]);
    }
  };

  // Função para mover o carrossel de gêneros
  const rolarFiltro = (direcao) => {
    if (filtrosRef.current) {
      const scrollAmount = direcao === 'esquerda' ? -250 : 250;
      filtrosRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans selection:bg-rose-700 selection:text-white">
      <Header 
        rotaAtual={rotaAtual} 
        setRotaAtual={setRotaAtual} 
        carrinhoQtd={carrinho.length} 
      />

      <main className="max-w-6xl w-full mx-auto p-4 flex-grow">
        {rotaAtual === 'home' ? (
          <div>
            {/* Banner Preto + Vinho */}
            <div className="my-6 p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-rose-950/40 to-zinc-900 border border-rose-900/40 text-center shadow-2xl relative overflow-hidden">
              <h1 className="text-3xl md:text-5xl font-black text-zinc-100 mb-2 tracking-tight">
                Discos de Vinil Originais
              </h1>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
                Os álbuns mais ouvidos da atualidade em edições especiais de alta fidelidade sonora.
              </p>
            </div>

            {/* Controles de Busca e Filtro Organizados em Duas Linhas */}
            <div className="flex flex-col gap-4 mb-8 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
              
              {/* Linha 1: Campo de Busca com largura total */}
              <div className="relative w-full">
                <FaSearch className="absolute left-3.5 top-3.5 text-rose-500" />
                <input
                  type="text"
                  placeholder="Buscar por álbum ou artista..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-600"
                />
              </div>

              {/* Linha 2: Filtros de Gênero com Setas sem Espremer */}
              <div className="relative flex items-center w-full gap-2">
                <button 
                  onClick={() => rolarFiltro('esquerda')} 
                  className="p-2.5 bg-zinc-950 text-rose-500 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all shrink-0 z-10"
                  aria-label="Rolar para esquerda"
                >
                  <FaChevronLeft size={14} />
                </button>

                <div 
                  ref={filtrosRef}
                  className="flex gap-2 overflow-x-auto scroll-smooth w-full py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {generos.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setGeneroFiltro(gen)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                        generoFiltro === gen
                          ? 'bg-rose-700 text-white shadow-lg shadow-rose-950'
                          : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => rolarFiltro('direita')} 
                  className="p-2.5 bg-zinc-950 text-rose-500 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all shrink-0 z-10"
                  aria-label="Rolar para direita"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>

            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vinisFiltrados.map((vinil) => (
                <CardProduto
                  key={vinil.id}
                  vinil={vinil}
                  onAdicionar={toggleCarrinho}
                  estaNoCarrinho={carrinho.some((item) => item.id === vinil.id)}
                />
              ))}
            </div>

            {vinisFiltrados.length === 0 && (
              <p className="text-center text-zinc-500 my-12 font-medium">Nenhum álbum encontrado.</p>
            )}

            {/* Resumo do Carrinho */}
            {carrinho.length > 0 && (
              <div className="mt-12 p-6 bg-zinc-900 rounded-2xl border border-rose-900/50 shadow-2xl">
                <h2 className="text-xl font-black text-rose-500 mb-4">Seu Carrinho</h2>
                <ul className="divide-y divide-zinc-800">
                  {carrinho.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={item.imagem} alt={item.titulo} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-zinc-100">{item.titulo}</p>
                          <p className="text-xs text-zinc-400">{item.artista}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-rose-500">R$ {item.preco.toFixed(2)}</span>
                        <button onClick={() => toggleCarrinho(item)} className="text-zinc-500 hover:text-red-500 p-2">
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-lg font-bold text-zinc-300">Total:</span>
                  <span className="text-2xl font-black text-rose-500">R$ {totalCarrinho.toFixed(2)}</span>
                </div>
                <Botao className="w-full mt-6" onClick={() => alert("Pedido realizado com sucesso!")}>
                  <FaCheckCircle /> Finalizar Compra
                </Botao>
              </div>
            )}
          </div>
        ) : (
          <FormularioContato />
        )}
      </main>

      <Footer />
    </div>
  );
}