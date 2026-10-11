import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Send, FolderGit2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalData, socialLinks } from '../data/portfolioData';

export default function Hero() {
  const roles = personalData.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Typewriter effect loop
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        setTypingSpeed(90);

        if (displayedText.length === currentFullText.length) {
          // Pause when word is completely typed
          setIsDeleting(true);
          setTypingSpeed(1800);
        }
      } else {
        // Deleting backwards
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        setTypingSpeed(50);

        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elPos = el.getBoundingClientRect().top;
      const offsetPos = elPos + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Cosmic Elements in Hero Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] md:w-[700px] h-[340px] sm:h-[550px] md:h-[700px] rounded-full border border-[#2c67ed]/15 pointer-events-none -z-10 animate-[spin_60s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[380px] md:w-[480px] h-[220px] sm:h-[380px] md:h-[480px] rounded-full border border-dashed border-[#2c67ed]/25 pointer-events-none -z-10 animate-[spin_40s_linear_infinite_reverse]">
        <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-[#2c67ed] shadow-[0_0_10px_#2c67ed]" />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1226]/80 border border-[#2c67ed]/40 text-[#93c5fd] text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(44,103,237,0.25)] mb-6 hover:border-[#2c67ed] transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{personalData.availability}</span>
        </motion.div>

        {/* Big Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white mb-4 leading-none"
        >
          Halo, Saya{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#2c67ed] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(44,103,237,0.45)]">
              {personalData.name}
            </span>
          </span>
        </motion.h1>

        {/* Typewriter text container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-14 sm:h-16 flex items-center justify-center mb-6"
        >
          <p className="text-xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-200">
            Saya seorang{' '}
            <span className="text-[#38bdf8] font-bold border-b-2 border-[#2c67ed] pb-0.5">
              {displayedText}
            </span>
            <span className="inline-block w-[3px] h-6 sm:h-8 ml-1 bg-[#2c67ed] align-middle animate-pulse shadow-[0_0_10px_#2c67ed]" />
          </p>
        </motion.div>

        {/* Bio Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10 px-2"
        >
          Menjelajahi galaksi teknologi modern, merakit aplikasi web interaktif dengan performa tinggi, 
          dan mewujudkan ide digital menjadi kenyataan visual yang memukau.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12"
        >
          {/* Primary Button */}
          <button
            type="button"
            onClick={() => scrollToSection('portfolio')}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-[#2c67ed] to-[#1d4ed8] shadow-[0_0_30px_rgba(44,103,237,0.6)] hover:shadow-[0_0_45px_rgba(44,103,237,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/30"
          >
            <FolderGit2 className="w-5 h-5 group-hover:rotate-6 transition-transform text-cyan-200" />
            <span>Jelajahi Proyek</span>
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-slate-200 bg-[#0a1329]/80 hover:bg-[#112042] border border-[#2c67ed]/40 hover:border-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.2)] hover:shadow-[0_0_30px_rgba(44,103,237,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Send className="w-4 h-4 text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Hubungi Saya</span>
          </button>
        </motion.div>

        {/* Social Icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          {socialLinks.map((item) => {
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="w-10 h-10 rounded-full bg-[#071026]/90 border border-[#2c67ed]/30 hover:border-[#2c67ed] flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(44,103,237,0.6)] transition-all duration-200"
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

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border border-[#2c67ed]/40 flex items-start justify-center p-1.5 shadow-[0_0_15px_rgba(44,103,237,0.25)]"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
