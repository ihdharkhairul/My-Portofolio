/**
 * scrollVariants.js
 * Reusable Framer Motion animation variants for scroll-triggered reveals.
 * Each named variant describes a distinct visual entrance.
 */

// Shared viewport config
export const viewportOnce = { once: true, margin: '-60px' };

/* ─── Directional Slides ─────────────────────────────────────────── */

export const slideFromLeft = {
  hidden:  { opacity: 0, x: -72, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const slideFromRight = {
  hidden:  { opacity: 0, x: 72,  filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const slideFromTop = {
  hidden:  { opacity: 0, y: -48 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const slideFromBottom = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Scale Variants ─────────────────────────────────────────────── */

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.82, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleDown = {
  hidden:  { opacity: 0, scale: 1.12 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ─── Blur to Sharp ──────────────────────────────────────────────── */

export const blurReveal = {
  hidden:  { opacity: 0, filter: 'blur(18px)', scale: 0.97 },
  visible: { opacity: 1, filter: 'blur(0px)',  scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Clip Reveal (vertical wipe) ───────────────────────────────── */

export const clipReveal = {
  hidden:  { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Clip Reveal Horizontal (left wipe) ────────────────────────── */

export const clipRevealH = {
  hidden:  { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Stagger Container ─────────────────────────────────────────── */

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.05,
    },
  },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Stagger left/right alternating (for lists) ─────────────────  */

export const staggerItemLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerItemRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Flip / Rotate In ──────────────────────────────────────────── */

export const flipInX = {
  hidden:  { opacity: 0, rotateX: -45, scale: 0.95 },
  visible: { opacity: 1, rotateX: 0,   scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Floating Loop (for decorative elements) ───────────────────── */

export const floatAnim = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatAnimSlow = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/* ─── Glow Pulse (for accent elements) ──────────────────────────── */

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 15px rgba(44,103,237,0.3)',
      '0 0 40px rgba(44,103,237,0.65)',
      '0 0 15px rgba(44,103,237,0.3)',
    ],
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
