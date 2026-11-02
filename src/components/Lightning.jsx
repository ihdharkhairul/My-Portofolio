import React, { useEffect, useRef } from 'react';

/**
 * Layer petir elektrik (Canvas 2D) yang muncul sesekali saat pengguna scrolling.
 * - Layer terpisah, di atas Starfield dan di belakang konten (z-[5]).
 * - pointer-events: none, tidak mengganggu klik / navigasi.
 * - Loop requestAnimationFrame hanya jalan saat ada petir / percikan, lalu berhenti sendiri.
 * - Intensitas (frekuensi, cabang, kecerahan) mengikuti kecepatan scroll.
 * - Dimatikan otomatis jika pengguna memilih prefers-reduced-motion.
 */

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Jalur bergerigi dengan midpoint displacement -> array datar [x0,y0,x1,y1,...]
function jaggedPath(x1, y1, x2, y2, disp, minLen) {
  const out = [x1, y1];
  const walk = (ax, ay, bx, by, d) => {
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy);
    if (len < minLen) {
      out.push(bx, by);
      return;
    }
    const nx = -dy / len;
    const ny = dx / len;
    const off = (Math.random() - 0.5) * d;
    const cx = (ax + bx) / 2 + nx * off;
    const cy = (ay + by) / 2 + ny * off;
    walk(ax, ay, cx, cy, d * 0.55);
    walk(cx, cy, bx, by, d * 0.55);
  };
  walk(x1, y1, x2, y2, disp);
  return out;
}

function pathLength(pts) {
  let total = 0;
  for (let i = 2; i < pts.length; i += 2) {
    total += Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]);
  }
  return total;
}

export default function Lightning() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const isMobile = window.innerWidth < 768;
    const maxBolts = isMobile ? 2 : 3;
    const maxSparks = isMobile ? 70 : 140;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let lastFrame = 0;

    const bolts = [];
    const sparks = [];

    // ---------- ukuran canvas ----------
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ---------- pembuatan petir ----------
    const makePoly = (pts, widthFactor, start, dur) => ({
      pts,
      len: pathLength(pts),
      widthFactor,
      start,
      dur,
    });

    function addSparks(x, y, count, power) {
      for (let i = 0; i < count && sparks.length < maxSparks; i += 1) {
        const ang = rand(0, Math.PI * 2);
        const sp = rand(0.06, 0.32) * power;
        sparks.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 0.04,
          age: 0,
          life: rand(380, 950),
          size: rand(0.8, 2.1),
          white: Math.random() < 0.4,
        });
      }
    }

    function spawnBolt(intensity) {
      // Titik awal: dari berbagai sisi layar
      const side = Math.random();
      let x1;
      let y1;
      if (side < 0.5) {
        x1 = rand(width * 0.05, width * 0.95);
        y1 = -20;
      } else if (side < 0.75) {
        x1 = -20;
        y1 = rand(0, height * 0.55);
      } else {
        x1 = width + 20;
        y1 = rand(0, height * 0.55);
      }

      // Titik tujuan: di dalam layar
      let x2 = rand(width * 0.12, width * 0.88);
      let y2 = rand(height * 0.45, height * 0.98);
      if (side >= 0.5) {
        x2 = clamp(x1 < 0 ? rand(width * 0.2, width * 0.7) : rand(width * 0.3, width * 0.8), 0, width);
      }

      // Gaya bervariasi: tipis, standar, atau badai (banyak cabang)
      const roll = Math.random();
      const style = roll < 0.3 ? 'thin' : roll < 0.8 ? 'normal' : 'storm';
      const mainLen = Math.hypot(x2 - x1, y2 - y1);
      const disp = mainLen * (style === 'thin' ? 0.22 : style === 'storm' ? 0.42 : 0.32);
      const minLen = isMobile ? 16 : 11;

      const grow = rand(90, 150);
      const total = rand(750, 1150) + intensity * 250;
      const polys = [];

      const mainPts = jaggedPath(x1, y1, x2, y2, disp, minLen);
      polys.push(makePoly(mainPts, 1, 0, grow));

      // Cabang
      const baseBranches = style === 'thin' ? 1 : style === 'storm' ? 5 : 3;
      const branchCount = Math.round(baseBranches + intensity * (isMobile ? 1 : 2)) + (Math.random() < 0.4 ? 1 : 0);
      const segCount = mainPts.length / 2 - 1;
      const mainAngle = Math.atan2(y2 - y1, x2 - x1);

      const addBranch = (pts, idx, parentStart, parentDur, parentSegs, depth, parentWidth) => {
        const ox = pts[idx * 2];
        const oy = pts[idx * 2 + 1];
        const dir = mainAngle + (Math.random() < 0.5 ? -1 : 1) * rand(0.35, 1.0);
        const bLen = mainLen * rand(0.1, depth === 0 ? 0.32 : 0.16);
        const ex = ox + Math.cos(dir) * bLen;
        const ey = oy + Math.sin(dir) * bLen;
        const bPts = jaggedPath(ox, oy, ex, ey, bLen * 0.3, minLen);
        const startAt = parentStart + (idx / parentSegs) * parentDur;
        const bDur = rand(60, 110);
        const w = parentWidth * (depth === 0 ? 0.55 : 0.38);
        polys.push(makePoly(bPts, w, startAt, bDur));
        return { bPts, startAt, bDur, w };
      };

      for (let b = 0; b < branchCount; b += 1) {
        const idx = Math.floor(rand(2, Math.max(3, segCount - 1)));
        const br = addBranch(mainPts, idx, 0, grow, segCount, 0, 1);
        // Sub-cabang
        if (!isMobile && Math.random() < 0.45) {
          const bSegs = br.bPts.length / 2 - 1;
          if (bSegs > 3) {
            addBranch(br.bPts, Math.floor(rand(1, bSegs - 1)), br.startAt, br.bDur, bSegs, 1, br.w);
          }
        }
      }

      const restrikes = [rand(total * 0.18, total * 0.3)];
      if (Math.random() < 0.55) restrikes.push(rand(total * 0.34, total * 0.5));

      bolts.push({
        polys,
        age: 0,
        grow,
        total,
        restrikes,
        seed: rand(0, 100),
        power: 0.85 + intensity * 0.5,
        flash: style === 'storm' || intensity > 0.6,
        impact: { x: x2, y: y2 },
        origin: { x: clamp(x1, 0, width), y: clamp(y1, 0, height) },
        impactDone: false,
      });
    }

    // ---------- render ----------
    function strokeProgress(pts, progress) {
      const n = pts.length / 2;
      const upto = progress * (n - 1);
      const full = Math.floor(upto);
      ctx.beginPath();
      ctx.moveTo(pts[0], pts[1]);
      for (let i = 1; i <= full && i < n; i += 1) ctx.lineTo(pts[i * 2], pts[i * 2 + 1]);
      if (full < n - 1) {
        const f = upto - full;
        const ax = pts[full * 2];
        const ay = pts[full * 2 + 1];
        const bx = pts[(full + 1) * 2];
        const by = pts[(full + 1) * 2 + 1];
        ctx.lineTo(ax + (bx - ax) * f, ay + (by - ay) * f);
      }
    }

    function bolAlpha(b) {
      const a = b.age;
      if (a < b.grow) return 1;
      const t = clamp((a - b.grow) / (b.total - b.grow), 0, 1);
      let base = (1 - t) * (1 - t);
      base *= 0.72 + 0.28 * Math.sin(a * 0.07 + b.seed);
      let boost = 0;
      for (let i = 0; i < b.restrikes.length; i += 1) {
        const d = Math.abs(a - b.restrikes[i]);
        if (d < 70) boost = Math.max(boost, 1 - d / 70);
      }
      return clamp(base + boost * 0.75 * (1 - t * 0.6), 0, 1);
    }

    function drawGlowDot(x, y, radius, alpha) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(180, 225, 255, ${0.55 * alpha})`);
      g.addColorStop(0.35, `rgba(56, 189, 248, ${0.28 * alpha})`);
      g.addColorStop(1, 'rgba(44, 103, 237, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawBolt(b) {
      const alpha = bolAlpha(b) * b.power;
      if (alpha <= 0.01) return;

      // Kilatan samar seluruh layar saat menyambar (hanya petir besar)
      if (b.flash && b.age < 140) {
        ctx.fillStyle = `rgba(110, 165, 255, ${0.06 * (1 - b.age / 140) * b.power})`;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < b.polys.length; i += 1) {
        const p = b.polys[i];
        const prog = clamp((b.age - p.start) / p.dur, 0, 1);
        if (prog <= 0) continue;
        const w = p.widthFactor;

        // Bloom luar
        strokeProgress(p.pts, prog);
        ctx.strokeStyle = `rgba(44, 103, 237, ${0.16 * alpha})`;
        ctx.lineWidth = 16 * w + 2;
        ctx.stroke();

        // Glow neon cyan
        strokeProgress(p.pts, prog);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.34 * alpha})`;
        ctx.lineWidth = 6 * w + 1;
        ctx.stroke();

        // Inti biru muda
        strokeProgress(p.pts, prog);
        ctx.strokeStyle = `rgba(147, 210, 255, ${0.8 * alpha})`;
        ctx.lineWidth = 2.6 * w + 0.4;
        ctx.stroke();

        // Inti putih
        strokeProgress(p.pts, prog);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.1 * w + 0.3;
        ctx.stroke();

        // Percikan di ujung cabang saat sampai
        if (prog >= 1 && !p.sparked) {
          p.sparked = true;
          const n = p.pts.length;
          addSparks(p.pts[n - 2], p.pts[n - 1], i === 0 ? 16 : 5, b.power);
        }
      }

      // Bloom di titik awal dan titik sambar
      drawGlowDot(b.origin.x, b.origin.y, 110 * b.power, alpha * 0.8);
      if (b.age >= b.grow * 0.9) {
        drawGlowDot(b.impact.x, b.impact.y, 140 * b.power, alpha);
        if (!b.impactDone) {
          b.impactDone = true;
          addSparks(b.impact.x, b.impact.y, isMobile ? 10 : 18, b.power);
        }
      }
    }

    function drawSparks(dt) {
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.life) {
          sparks.splice(i, 1);
          continue;
        }
        const t = s.age / s.life;
        const a = (1 - t) * (0.6 + 0.4 * Math.sin(s.age * 0.05));
        const px = s.x;
        const py = s.y;
        s.vx *= 0.985;
        s.vy = s.vy * 0.985 + 0.00035 * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
        ctx.strokeStyle = s.white ? `rgba(255,255,255,${a})` : `rgba(103, 220, 255, ${a})`;
        ctx.lineWidth = s.size * (1 - t * 0.5);
        ctx.stroke();
      }
    }

    function frame(now) {
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = bolts.length - 1; i >= 0; i -= 1) {
        const b = bolts[i];
        b.age += dt;
        if (b.age >= b.total) {
          bolts.splice(i, 1);
          continue;
        }
        drawBolt(b);
      }
      drawSparks(dt);

      ctx.globalCompositeOperation = 'source-over';

      if (bolts.length === 0 && sparks.length === 0) {
        ctx.clearRect(0, 0, width, height);
        running = false;
        return;
      }
      rafId = requestAnimationFrame(frame);
    }

    function ensureLoop() {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      rafId = requestAnimationFrame(frame);
    }

    // ---------- reaksi terhadap scroll ----------
    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0; // px per ms, dihaluskan
    let lastSpawn = 0;
    let distSinceSpawn = 0;
    let nextDistance = rand(700, 1400);

    const onScroll = () => {
      if (motionQuery.matches) return;
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastT, 1);
      const dy = Math.abs(y - lastY);
      velocity = velocity * 0.75 + (dy / dt) * 0.25;
      distSinceSpawn += dy;
      lastY = y;
      lastT = now;

      const intensity = clamp(velocity / 2.4, 0, 1);
      if (velocity < 0.25) return; // scroll pelan: tidak ada petir
      if (bolts.length >= maxBolts) return;

      const cooldown = 4200 - intensity * 2700; // 4.2 dtk -> 1.5 dtk
      if (now - lastSpawn < cooldown) return;
      if (distSinceSpawn < nextDistance * (1 - intensity * 0.5)) return;
      if (Math.random() > 0.15 + intensity * 0.4) return;

      spawnBolt(intensity);
      if (intensity > 0.8 && !isMobile && bolts.length < maxBolts && Math.random() < 0.3) {
        spawnBolt(intensity);
      }
      lastSpawn = now;
      distSinceSpawn = 0;
      nextDistance = rand(700, 1600);
      ensureLoop();
    };

    const onResize = () => resize();

    // Berhenti total bila pengguna mengaktifkan reduced motion saat halaman terbuka
    const onMotionChange = (e) => {
      if (e.matches) {
        bolts.length = 0;
        sparks.length = 0;
        ctx.clearRect(0, 0, width, height);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motionQuery.removeEventListener('change', onMotionChange);
      running = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[5] pointer-events-none"
    />
  );
}
