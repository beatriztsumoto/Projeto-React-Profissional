import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardProduto } from './components/CardProduto';
import { FormularioContato } from './components/FormularioContato';
import { vinis } from './data/produtos';
import { FaSearch, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { Botao } from './components/Botao';

export default function App() {
  const [rotaAtual, setRotaAtual] = useState('home');
  const [busca, setBusca] = useState('');
  const [generoFiltro, setGeneroFiltro] = useState('Todos');
  const [carrinho, setCarrinho] = useState([]);

  // JavaScript Moderno & Array Methods
  const generos = ['Todos', ...new Set(vinis.map((v) => v.genero))];

  const vinisFiltrados = vinis.filter((vinil) => {
    const atendeBusca = vinil.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                        vinil.artista.toLowerCase().includes(busca.toLowerCase());
    const atendeGenero = generoFiltro === 'Todos' || vinil.genero === generoFiltro;
    return atendeBusca && atendeGenero;
  });

  // Método de array adicional: reduce
  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const toggleCarrinho = (produto) => {
    const existe = carrinho.some((item) => item.id === produto.id);
    if (existe) {
      setCarrinho(carrinho.filter((item) => item.id !== produto.id));
    } else {
      setCarrinho([...carrinho, produto]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans">
      <Header 
        rotaAtual={rotaAtual} 
        setRotaAtual={setRotaAtual} 
        carrinhoQtd={carrinho.length} 
      />

      <main className="max-w-6xl w-full mx-auto p-4 flex-grow">
        {rotaAtual === 'home' ? (
          <div>
            {/* Controles de Busca e Filtro */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <div className="relative w-full md:w-1/2">
                <FaSearch className="absolute left-3 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar por álbum ou artista..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {generos.map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setGeneroFiltro(gen)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      generoFiltro === gen
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Listagem de Produtos com map */}
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
              <p className="text-center text-zinc-500 my-12">Nenhum disco encontrado com esses critérios.</p>
            )}

            {/* Resumo do Carrinho */}
            {carrinho.length > 0 && (
              <div className="mt-12 p-6 bg-zinc-900 rounded-xl border border-amber-500/30">
                <h2 className="text-xl font-bold text-amber-500 mb-4">Resumo do Pedido</h2>
                <ul className="divide-y divide-zinc-800">
                  {carrinho.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between items-center">
                      <span>{item.titulo} - <strong className="text-zinc-400">{item.artista}</strong></span>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-amber-400">R$ {item.preco.toFixed(2)}</span>
                        <button onClick={() => toggleCarrinho(item)} className="text-red-400 hover:text-red-300">
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-amber-500">R$ {totalCarrinho.toFixed(2)}</span>
                </div>
                <Botao className="w-full mt-4" onClick={() => alert("Compra finalizada com sucesso!")}>
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