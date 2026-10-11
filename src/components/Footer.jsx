import React from 'react';
import { Rocket, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalData, socialLinks } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-[#2c67ed]/20 bg-[#02050f]/90 backdrop-blur-xl z-10 overflow-hidden">
      {/* Ambient glow top line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2c67ed]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#2c67ed]/20 border border-[#2c67ed] flex items-center justify-center text-[#38bdf8] shadow-[0_0_15px_rgba(44,103,237,0.5)]">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                {personalData.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm">
              Membangun pengalaman web modern di tengah semesta digital tanpa batas.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#2c67ed] hover:bg-[#2c67ed]/20 flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 transition-all"
              >
                {item.icon === 'Github' && <GithubIcon className="w-4 h-4" />}
                {item.icon === 'Linkedin' && <LinkedinIcon className="w-4 h-4" />}
                {item.icon === 'Instagram' && <InstagramIcon className="w-4 h-4" />}
                {item.icon === 'Mail' && <Mail className="w-4 h-4" />}
              </a>
            ))}

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="ml-3 w-9 h-9 rounded-full bg-[#2c67ed] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-[0_0_15px_rgba(44,103,237,0.5)] hover:scale-110 transition-all cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row copyright & stack badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {personalData.name}. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span>Dibuat dengan</span>
            <span className="text-[#38bdf8] font-semibold">React</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">Tailwind CSS</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
