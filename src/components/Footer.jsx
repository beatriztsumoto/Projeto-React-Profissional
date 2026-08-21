import { FaHeart, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-6 mt-12 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm flex items-center gap-1">
          Feito com <FaHeart className="text-red-500" /> para colecionadores de vinil.
        </p>
        <div className="flex gap-4 text-lg">
          <FaInstagram className="hover:text-amber-500 cursor-pointer" />
          <FaTwitter className="hover:text-amber-500 cursor-pointer" />
          <FaFacebook className="hover:text-amber-500 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};