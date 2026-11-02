import React from 'react';
import { motion } from 'framer-motion';

// Garis cahaya tipis (1px) di antara section supaya transisi terasa menyatu.
export default function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      className="relative h-px w-full max-w-3xl mx-auto overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2c67ed]/50 to-transparent" />
      <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-cyan-200 to-transparent animate-divider-shine" />
    </motion.div>
  );
}
