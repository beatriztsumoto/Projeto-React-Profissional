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
    <form onSubmit={handleSubmit} className="bg-rose-950/50 p-8 rounded-2xl border border-rose-900/50 max-w-lg mx-auto shadow-2xl backdrop-blur-sm my-8">
      <h2 className="text-2xl font-black text-rose-300 mb-6 text-center">Fale com a Vinho & Vinil</h2>

      {sucesso && (
        <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 rounded-xl text-sm text-center">
          Mensagem enviada com sucesso! Logo entraremos em contato.
        </div>
      )}

      <div className="mb-4">
        <label className="block text-rose-200 text-sm font-medium mb-1.5">Nome</label>
        <div className="relative">
          <FaUser className="absolute left-3.5 top-3.5 text-rose-500" />
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-rose-950/80 border border-rose-900/80 rounded-xl text-rose-100 placeholder-rose-700 focus:outline-none focus:border-rose-500"
            placeholder="Seu nome completo"
          />
        </div>
        {erros.nome && <span className="text-rose-400 text-xs mt-1 block">{erros.nome}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-rose-200 text-sm font-medium mb-1.5">E-mail</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3.5 top-3.5 text-rose-500" />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-rose-950/80 border border-rose-900/80 rounded-xl text-rose-100 placeholder-rose-700 focus:outline-none focus:border-rose-500"
            placeholder="seu@email.com"
          />
        </div>
        {erros.email && <span className="text-rose-400 text-xs mt-1 block">{erros.email}</span>}
      </div>

      <div className="mb-6">
        <label className="block text-rose-200 text-sm font-medium mb-1.5">Mensagem</label>
        <div className="relative">
          <FaComment className="absolute left-3.5 top-3.5 text-rose-500" />
          <textarea
            name="mensagem"
            rows="4"
            value={formData.mensagem}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-rose-950/80 border border-rose-900/80 rounded-xl text-rose-100 placeholder-rose-700 focus:outline-none focus:border-rose-500"
            placeholder="Música favorita, edições especiais ou dúvidas..."
          />
        </div>
        {erros.mensagem && <span className="text-rose-400 text-xs mt-1 block">{erros.mensagem}</span>}
      </div>

      <Botao type="submit" className="w-full">
        <FaPaperPlane /> Enviar Mensagem
      </Botao>
    </form>
  );
};