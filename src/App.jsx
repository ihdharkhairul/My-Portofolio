import React, { useState, useEffect } from 'react';
import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'contact'];
      const scrollOffset = window.innerWidth < 640 ? 140 : 220;
      const scrollPosition = window.scrollY + scrollOffset;

      // If scrolled near the bottom, activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden w-full max-w-full selection:bg-[#2c67ed]/40 selection:text-white">
      {/* Dynamic Cosmic Background: Starfield, Meteors & Nebulae */}
      <Starfield />

      {/* Floating Centered Glow Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col w-full max-w-full overflow-x-hidden">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
