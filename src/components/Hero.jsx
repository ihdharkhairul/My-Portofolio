import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, FolderGit2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalData, socialLinks } from '../data/portfolioData';

export default function Hero() {
  const roles = personalData.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  // Typewriter effect loop
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        setTypingSpeed(80);

        if (displayedText.length === currentFullText.length) {
          setIsDeleting(true);
          setTypingSpeed(1800);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        setTypingSpeed(45);

        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(350);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = window.innerWidth < 640 ? 70 : 85;
      const elPos = el.getBoundingClientRect().top;
      const offsetPos = elPos + window.pageYOffset - topOffset;
      window.scrollTo({
        top: Math.max(0, offsetPos),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 xs:px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full"
    >
      {/* Decorative Cosmic Elements in Hero Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] xs:w-[320px] sm:w-[500px] md:w-[680px] h-[260px] xs:h-[320px] sm:h-[500px] md:h-[680px] rounded-full border border-[#2c67ed]/15 pointer-events-none -z-10 animate-[spin_60s_linear_infinite] max-w-[92vw] max-h-[92vw]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] xs:w-[230px] sm:w-[360px] md:w-[460px] h-[180px] xs:h-[230px] sm:h-[360px] md:h-[460px] rounded-full border border-dashed border-[#2c67ed]/25 pointer-events-none -z-10 animate-[spin_40s_linear_infinite_reverse] max-w-[90vw] max-h-[90vw]">
        <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-[#2c67ed] shadow-[0_0_10px_#2c67ed]" />
      </div>

      <div className="w-full max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-[#0a1226]/85 border border-[#2c67ed]/40 text-[#93c5fd] text-[11px] xs:text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(44,103,237,0.25)] mb-5 sm:mb-6 hover:border-[#2c67ed] transition-colors max-w-[95vw] text-center"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="truncate">{personalData.availability}</span>
        </motion.div>

        {/* Big Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white mb-3 sm:mb-4 leading-[1.12] sm:leading-none break-words max-w-full px-2"
        >
          Halo, Saya{' '}
          <span className="relative inline-block mt-1 sm:mt-0">
            <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#2c67ed] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(44,103,237,0.45)]">
              {personalData.name}
            </span>
          </span>
        </motion.h1>

        {/* Typewriter text container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center mb-4 sm:mb-6 px-2 w-full"
        >
          <p className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-slate-200 text-center leading-snug">
            Saya seorang{' '}
            <span className="text-[#38bdf8] font-bold border-b-2 border-[#2c67ed] pb-0.5 inline-block">
              {displayedText}
            </span>
            <span className="inline-block w-[2.5px] sm:w-[3px] h-5 sm:h-7 ml-1 bg-[#2c67ed] align-middle animate-pulse shadow-[0_0_10px_#2c67ed]" />
          </p>
        </motion.div>

        {/* Bio Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-300 text-xs xs:text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2 sm:px-4"
        >
          Menjelajahi galaksi teknologi modern, merakit aplikasi web interaktif dengan performa tinggi, 
          dan mewujudkan ide digital menjadi kenyataan visual yang memukau.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full max-w-sm xs:max-w-none px-4"
        >
          {/* Primary Button */}
          <button
            type="button"
            onClick={() => scrollToSection('portfolio')}
            className="w-full xs:w-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-xs xs:text-sm sm:text-base text-white bg-gradient-to-r from-[#2c67ed] to-[#1d4ed8] shadow-[0_0_25px_rgba(44,103,237,0.55)] hover:shadow-[0_0_40px_rgba(44,103,237,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/30 cursor-pointer"
          >
            <FolderGit2 className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-6 transition-transform text-cyan-200 shrink-0" />
            <span>Jelajahi Proyek</span>
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-300 animate-pulse shrink-0" />
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="w-full xs:w-auto group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-xs xs:text-sm sm:text-base text-slate-200 bg-[#0a1329]/80 hover:bg-[#112042] border border-[#2c67ed]/40 hover:border-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.18)] hover:shadow-[0_0_30px_rgba(44,103,237,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            <span>Hubungi Saya</span>
          </button>
        </motion.div>

        {/* Social Icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5"
        >
          {socialLinks.map((item) => {
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#071026]/90 border border-[#2c67ed]/30 hover:border-[#2c67ed] flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(44,103,237,0.6)] transition-all duration-200"
              >
                {item.icon === 'Github' && <GithubIcon className="w-4 h-4" />}
                {item.icon === 'Linkedin' && <LinkedinIcon className="w-4 h-4" />}
                {item.icon === 'Instagram' && <InstagramIcon className="w-4 h-4" />}
                {item.icon === 'Mail' && <Mail className="w-4 h-4" />}
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Floating Scroll Indicator - visible on larger heights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-white transition-colors"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-11 rounded-full border border-[#2c67ed]/40 flex items-start justify-center p-1 shadow-[0_0_12px_rgba(44,103,237,0.25)]"
        >
          <div className="w-1.5 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
