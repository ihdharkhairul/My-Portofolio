// Preset animasi scroll-reveal yang dipakai bersama oleh semua section.
// Dipakai dengan spread: <motion.div {...fx.fromLeft(0.1)} />
const EASE = [0.16, 1, 0.3, 1]; // halus, melambat di akhir

// once: false -> animasi berulang tiap elemen masuk layar lagi.
// amount: 'some' -> mulai begitu elemen mulai terlihat, jadi tidak ada yang telat / tertinggal.
const VIEWPORT = { once: false, amount: 'some' };

// clip-path: nilai akhir negatif supaya glow / shadow di luar kotak tidak terpotong
const CLIP_SHOW = 'inset(-30% -30% -30% -30%)';
const CLIP_FROM_LEFT = 'inset(-30% 100% -30% -30%)';
const CLIP_FROM_BOTTOM = 'inset(100% -30% -30% -30%)';
const CLIP_FROM_CENTER = 'inset(-30% 50% -30% 50%)';

// Jarak geser dibatasi supaya gerakan tetap lembut
const limit = (d) => Math.min(d, 50);

const make = (initial, animate, duration = 0.7) => (delay = 0) => ({
  initial,
  whileInView: animate,
  viewport: VIEWPORT,
  transition: { duration, delay, ease: EASE },
});

export const fx = {
  // Geser horizontal
  fromLeft: (delay = 0, dist = 40) =>
    make({ opacity: 0, x: -limit(dist) }, { opacity: 1, x: 0 })(delay),
  fromRight: (delay = 0, dist = 40) =>
    make({ opacity: 0, x: limit(dist) }, { opacity: 1, x: 0 })(delay),

  // Mengembang / menyusut
  scaleUp: (delay = 0) =>
    make({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })(delay),
  scaleDown: (delay = 0) =>
    make({ opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1 })(delay),

  // Blur -> tajam (blur dibuat kecil supaya ringan)
  blurIn: (delay = 0) =>
    make({ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0px)' }, 0.8)(delay),
  blurLeft: (delay = 0) =>
    make(
      { opacity: 0, x: -30, filter: 'blur(6px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)' },
      0.8
    )(delay),
  blurRight: (delay = 0) =>
    make(
      { opacity: 0, x: 30, filter: 'blur(6px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)' },
      0.8
    )(delay),
  blurScale: (delay = 0) =>
    make(
      { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)' },
      0.9
    )(delay),

  // Clip reveal
  clipLeft: (delay = 0) =>
    make({ clipPath: CLIP_FROM_LEFT, opacity: 0 }, { clipPath: CLIP_SHOW, opacity: 1 }, 0.85)(delay),
  clipUp: (delay = 0) =>
    make({ clipPath: CLIP_FROM_BOTTOM, opacity: 0 }, { clipPath: CLIP_SHOW, opacity: 1 }, 0.85)(delay),
  clipCenter: (delay = 0) =>
    make({ clipPath: CLIP_FROM_CENTER, opacity: 0 }, { clipPath: CLIP_SHOW, opacity: 1 }, 0.9)(delay),

  // Kombinasi geser + mengembang (untuk kartu)
  slideScaleLeft: (delay = 0) =>
    make({ opacity: 0, x: -40, scale: 0.96 }, { opacity: 1, x: 0, scale: 1 })(delay),
  slideScaleRight: (delay = 0) =>
    make({ opacity: 0, x: 40, scale: 0.96 }, { opacity: 1, x: 0, scale: 1 })(delay),
};

// (opsional) versi animate-saat-dimuat
export const onLoad = (preset) => {
  const { whileInView, viewport: _viewport, ...rest } = preset;
  return { ...rest, animate: whileInView };
};

// Pola per kolom pada grid kartu: kiri, mengembang, kanan
export const byColumn = (index, delay = 0, cols = 3) => {
  const c = index % cols;
  if (c === 0) return fx.slideScaleLeft(delay);
  if (c === cols - 1) return fx.slideScaleRight(delay);
  return fx.scaleUp(delay);
};