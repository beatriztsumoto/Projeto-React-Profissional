import { FaHeart, FaInstagram, FaTwitter, FaSpotify } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-rose-950/80 text-rose-300 py-8 mt-16 border-t border-rose-900/40">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm flex items-center gap-1.5 font-medium">
          Feito pela Bia e Julia lindas.
        </p>
        <div className="flex gap-5 text-xl">
          <FaInstagram className="hover:text-rose-400 cursor-pointer transition-colors" />
          <FaTwitter className="hover:text-rose-400 cursor-pointer transition-colors" />
          <FaSpotify className="hover:text-rose-400 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};