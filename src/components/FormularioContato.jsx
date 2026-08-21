import { useState } from 'react';
import { z } from 'zod';
import { FaPaperPlane, FaEnvelope, FaUser, FaComment } from 'react-icons/fa';
import { Botao } from './Botao';

const schemaContato = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Informe um e-mail válido."),
  mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres.")
});

export const FormularioContato = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = schemaContato.safeParse(formData);

    if (!resultado.success) {
      const errosMapeados = {};
      resultado.error.issues.forEach((issue) => {
        errosMapeados[issue.path[0]] = issue.message;
      });
      setErros(errosMapeados);
      setSucesso(false);
      return;
    }

    setErros({});
    setSucesso(true);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 max-w-lg mx-auto shadow-xl">
      <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center">Fale com a Groove</h2>

      {sucesso && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-200 rounded-lg text-sm text-center">
          Mensagem enviada com sucesso! Em breve entraremos em contato.
        </div>
      )}

      <div className="mb-4">
        <label className="block text-zinc-300 text-sm font-medium mb-1">Nome</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-zinc-500" />
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500"
            placeholder="Seu nome completo"
          />
        </div>
        {erros.nome && <span className="text-red-400 text-xs mt-1 block">{erros.nome}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-zinc-300 text-sm font-medium mb-1">E-mail</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-zinc-500" />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500"
            placeholder="seu@email.com"
          />
        </div>
        {erros.email && <span className="text-red-400 text-xs mt-1 block">{erros.email}</span>}
      </div>

      <div className="mb-6">
        <label className="block text-zinc-300 text-sm font-medium mb-1">Mensagem</label>
        <div className="relative">
          <FaComment className="absolute left-3 top-3 text-zinc-500" />
          <textarea
            name="mensagem"
            rows="4"
            value={formData.mensagem}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500"
            placeholder="Dúvidas, sugestões ou pedido especial..."
          />
        </div>
        {erros.mensagem && <span className="text-red-400 text-xs mt-1 block">{erros.mensagem}</span>}
      </div>

      <Botao type="submit" className="w-full">
        <FaPaperPlane /> Enviar Mensagem
      </Botao>
    </form>
  );
};