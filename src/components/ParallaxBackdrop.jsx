import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Partikel listrik kecil yang melayang pelan (posisi tetap supaya tidak berubah tiap render)
const MOTES = [
  { left: '8%', top: '22%', size: 3, dur: 9, delay: 0 },
  { left: '17%', top: '68%', size: 2, dur: 11, delay: 2 },
  { left: '29%', top: '40%', size: 2, dur: 8, delay: 4 },
  { left: '41%', top: '82%', size: 3, dur: 12, delay: 1 },
  { left: '55%', top: '15%', size: 2, dur: 10, delay: 3 },
  { left: '63%', top: '58%', size: 3, dur: 9, delay: 5 },
  { left: '74%', top: '33%', size: 2, dur: 13, delay: 2 },
  { left: '83%', top: '76%', size: 3, dur: 10, delay: 6 },
  { left: '92%', top: '47%', size: 2, dur: 11, delay: 1 },
  { left: '48%', top: '50%', size: 2, dur: 14, delay: 7 },
];

/**
 * Layer dekoratif parallax: glow biru yang "bernapas" dan bergerak dengan
 * kecepatan berbeda saat scroll, plus partikel listrik melayang.
 * Fixed, pointer-events: none, berada di atas Starfield dan di bawah konten.
 */
export default function ParallaxBackdrop() {
  const { scrollYProgress } = useScroll();

  const orbA = useTransform(scrollYProgress, [0, 1], [0, -380]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, -760]);
  const orbC = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbAx = useTransform(scrollYProgress, [0, 1], [-30, 90]);
  const orbBx = useTransform(scrollYProgress, [0, 1], [30, -110]);
  const beamX = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const beamY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
    >
      {/* Glow biru dengan kedalaman berbeda */}
      <motion.div
        style={{ y: orbA, x: orbAx, background: 'radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 68%)' }}
        className="absolute top-[28%] left-[6%] w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] rounded-full animate-glow-breathe will-change-transform"
      />
      <motion.div
        style={{ y: orbB, x: orbBx, background: 'radial-gradient(circle, rgba(44,103,237,0.55) 0%, transparent 68%)' }}
        className="absolute top-[70%] right-[4%] w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full animate-glow-breathe-slow will-change-transform"
      />
      <motion.div
        style={{ y: orbC, background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)' }}
        className="absolute top-[110%] left-[38%] w-[300px] sm:w-[520px] h-[300px] sm:h-[520px] rounded-full animate-glow-breathe will-change-transform"
      />

      {/* Garis cahaya tipis diagonal (parallax) */}
      <motion.div
        style={{ x: beamX, y: beamY }}
        className="absolute -top-1/4 left-[22%] w-px h-[160%] rotate-[18deg] bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent will-change-transform"
      />
      <motion.div
        style={{ x: beamX, y: beamY }}
        className="absolute -top-1/4 left-[72%] w-px h-[160%] rotate-[-14deg] bg-gradient-to-b from-transparent via-[#2c67ed]/25 to-transparent will-change-transform"
      />

      {/* Partikel listrik melayang */}
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-200 animate-mote"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            boxShadow: '0 0 8px 2px rgba(56,189,248,0.8)',
            animationDuration: `${m.dur}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
