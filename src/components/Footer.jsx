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
    <footer className="relative border-t border-[#2c67ed]/20 bg-[#02050f]/90 backdrop-blur-xl z-10 overflow-hidden w-full">
      {/* Ambient glow top line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2c67ed]/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-white/5">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2c67ed]/20 border border-[#2c67ed] flex items-center justify-center text-[#38bdf8] shadow-[0_0_12px_rgba(44,103,237,0.5)] shrink-0">
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="font-heading font-bold text-base sm:text-lg text-white">
                {personalData.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm">
              Membangun pengalaman web modern di tengah semesta digital tanpa batas.
            </p>
          </div>

          {/* Social Links & Back To Top */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#2c67ed] hover:bg-[#2c67ed]/20 flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 transition-all shrink-0"
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
              className="ml-1 sm:ml-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2c67ed] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-[0_0_15px_rgba(44,103,237,0.5)] hover:scale-110 transition-all cursor-pointer shrink-0"
              title="Kembali ke atas"
              aria-label="Kembali ke atas halaman"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row copyright & stack badge */}
        <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2.5 sm:gap-3 text-center sm:text-left w-full">
          <div>
            © {new Date().getFullYear()} {personalData.name}. Hak Cipta Dilindungi.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] text-slate-400">
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
