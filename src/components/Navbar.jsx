import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Rocket, User, FolderGit2, Home, Send } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#home', id: 'home', icon: Home },
    { name: 'About Me', href: '#about', id: 'about', icon: User },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio', icon: FolderGit2 },
    { name: 'Kontak', href: '#contact', id: 'contact', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = window.innerWidth < 640 ? 70 : 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] xs:w-[92%] sm:w-[90%] max-w-4xl pointer-events-none"
      >
        <nav
          className={`
            pointer-events-auto relative flex items-center justify-between
            px-3 xs:px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300
            bg-[#050b1d]/85 backdrop-blur-xl border border-[#2c67ed]/40
            ${scrolled 
              ? 'shadow-[0_0_25px_rgba(44,103,237,0.45),0_0_50px_rgba(44,103,237,0.18)] border-[#2c67ed]/60 bg-[#050b1d]/95' 
              : 'shadow-[0_0_20px_rgba(44,103,237,0.25)]'
            }
          `}
        >
          {/* Subtle glowing ambient line inside navbar */}
          <div className="absolute inset-x-6 sm:inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2c67ed]/80 to-transparent pointer-events-none" />

          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-1.5 xs:gap-2 group cursor-pointer text-white font-medium focus:outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#2c67ed] to-cyan-400 p-[1px] shadow-[0_0_12px_rgba(44,103,237,0.6)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38bdf8] group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="font-heading font-bold text-sm xs:text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#93c5fd] bg-clip-text text-transparent">
              MKI<span className="text-[#38bdf8]">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`
                    relative px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-200
                    ${isActive 
                      ? 'text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2c67ed]/85 to-[#1d4ed8]/85 shadow-[0_0_15px_rgba(44,103,237,0.7)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTA Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#2c67ed] to-[#1e40af] hover:from-[#3b82f6] hover:to-[#2563eb] shadow-[0_0_15px_rgba(44,103,237,0.45)] hover:shadow-[0_0_25px_rgba(44,103,237,0.7)] transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Hire Me</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:border-[#2c67ed]/50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-300" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto md:hidden mt-2 p-2.5 rounded-2xl bg-[#050b1d]/95 backdrop-blur-2xl border border-[#2c67ed]/50 shadow-[0_0_35px_rgba(44,103,237,0.35)]"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`
                        flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs xs:text-sm font-medium transition-all
                        ${isActive
                          ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 text-[#38bdf8] shrink-0" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="mt-1.5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs xs:text-sm font-semibold text-white bg-gradient-to-r from-[#2c67ed] to-[#1e40af] shadow-[0_0_20px_rgba(44,103,237,0.5)] active:scale-98 transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Mulai Kolaborasi</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
