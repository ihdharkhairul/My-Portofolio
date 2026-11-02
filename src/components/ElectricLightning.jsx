import React, { useEffect, useRef, useCallback } from 'react';

/**
 * ElectricLightning — Canvas-based scroll-triggered lightning effect.
 * Renders on a fixed canvas above the starfield but beneath content (z-1).
 * Fully pointer-events:none. Respects prefers-reduced-motion.
 * Cleans up all RAF loops and event listeners on unmount.
 */
export default function ElectricLightning() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    bolts: [],
    particles: [],
    scrollVelocity: 0,
    lastScrollY: 0,
    lastScrollTime: Date.now(),
    glowIntensity: 0,
    nextLightningIn: 0,
    frameCount: 0,
    rafId: null,
  });

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const generateBranch = useCallback((ctx, x1, y1, x2, y2, depth, maxDepth) => {
    if (depth > maxDepth) return;
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * (Math.abs(y2 - y1) * 0.55);
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 15;

    ctx.moveTo(x1, y1);
    ctx.lineTo(midX, midY);
    ctx.lineTo(x2, y2);

    if (depth < maxDepth - 1 && Math.random() < 0.45) {
      const branchLen = Math.random() * 0.55 + 0.25;
      const angle = (Math.random() - 0.5) * Math.PI * 0.65;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy) * branchLen;
      const bx = midX + Math.cos(angle) * len;
      const by = midY + Math.sin(angle) * len;
      generateBranch(ctx, midX, midY, bx, by, depth + 1, maxDepth);
    }
    generateBranch(ctx, x1, y1, midX, midY, depth + 1, maxDepth);
    generateBranch(ctx, midX, midY, x2, y2, depth + 1, maxDepth);
  }, []);

  const spawnBolt = useCallback((canvas, intensity = 1) => {
    const w = canvas.width;
    const h = canvas.height;

    // Pick a random spawn configuration
    const configs = [
      // Top-down bolt
      () => ({
        x1: Math.random() * w * 0.8 + w * 0.1,
        y1: -10,
        x2: Math.random() * w * 0.8 + w * 0.1,
        y2: Math.random() * h * 0.7 + h * 0.1,
      }),
      // Diagonal from top-left
      () => ({
        x1: Math.random() * w * 0.2,
        y1: Math.random() * h * 0.2,
        x2: Math.random() * w * 0.5 + w * 0.2,
        y2: Math.random() * h * 0.6 + h * 0.2,
      }),
      // Diagonal from top-right
      () => ({
        x1: w - Math.random() * w * 0.2,
        y1: Math.random() * h * 0.2,
        x2: Math.random() * w * 0.5 + w * 0.1,
        y2: Math.random() * h * 0.6 + h * 0.2,
      }),
      // Short horizontal arc
      () => ({
        x1: Math.random() * w * 0.3,
        y1: Math.random() * h * 0.8 + h * 0.05,
        x2: Math.random() * w * 0.3 + w * 0.3,
        y2: Math.random() * h * 0.8 + h * 0.05,
      }),
    ];

    const cfg = configs[Math.floor(Math.random() * configs.length)]();

    return {
      ...cfg,
      life: 1.0,
      decay: Math.random() * 0.04 + 0.025,
      alpha: Math.min(1.0, 0.55 + intensity * 0.3),
      maxDepth: Math.floor(Math.random() * 2) + 3,
      color: Math.random() > 0.3 ? '#38bdf8' : '#ffffff',
      glowColor: 'rgba(44,103,237,',
      lineWidth: Math.random() * 1.2 + 0.5,
      // Spawn electric particles at the strike point
      particlesSpawned: false,
    };
  }, []);

  const spawnParticles = useCallback((canvas, bolt, state) => {
    const count = Math.floor(Math.random() * 6) + 4;
    const cx = (bolt.x1 + bolt.x2) / 2 + (Math.random() - 0.5) * 80;
    const cy = (bolt.y1 + bolt.y2) / 2 + (Math.random() - 0.5) * 40;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 0.8;
      state.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.5 ? '#38bdf8' : '#93c5fd',
      });
    }
  }, []);

  // --- Main render loop ---
  const render = useCallback((canvas, ctx, state) => {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    state.frameCount++;

    // --- Decide when to spawn next lightning ---
    if (state.nextLightningIn <= 0) {
      const speedFactor = Math.min(state.scrollVelocity / 4, 1);
      const baseChance = 0.006 + speedFactor * 0.025;

      if (Math.random() < baseChance && state.bolts.length < 3) {
        const intensity = 0.5 + speedFactor * 0.5;
        state.bolts.push(spawnBolt(canvas, intensity));
        // Queue next lightning: 40–150 frames away (shorter during fast scroll)
        state.nextLightningIn = Math.floor(
          Math.random() * (120 - speedFactor * 80) + 40
        );
      }
    } else {
      state.nextLightningIn--;
    }

    // --- Draw bolts ---
    for (let i = state.bolts.length - 1; i >= 0; i--) {
      const bolt = state.bolts[i];

      ctx.save();
      ctx.globalAlpha = bolt.alpha * bolt.life;

      // Glow pass (wide, soft)
      ctx.beginPath();
      ctx.strokeStyle = `rgba(44,103,237,${0.25 * bolt.life})`;
      ctx.lineWidth = bolt.lineWidth * 8;
      ctx.shadowBlur = 0;
      ctx.filter = `blur(6px)`;
      generateBranch(ctx, bolt.x1, bolt.y1, bolt.x2, bolt.y2, 0, bolt.maxDepth);
      ctx.stroke();
      ctx.filter = 'none';

      // Mid glow pass
      ctx.beginPath();
      ctx.strokeStyle = bolt.glowColor + (0.55 * bolt.life) + ')';
      ctx.lineWidth = bolt.lineWidth * 3;
      generateBranch(ctx, bolt.x1, bolt.y1, bolt.x2, bolt.y2, 0, bolt.maxDepth);
      ctx.stroke();

      // Core white/cyan bolt
      ctx.beginPath();
      ctx.strokeStyle = bolt.color;
      ctx.lineWidth = bolt.lineWidth;
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#38bdf8';
      generateBranch(ctx, bolt.x1, bolt.y1, bolt.x2, bolt.y2, 0, bolt.maxDepth);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Spawn particles once at peak
      if (!bolt.particlesSpawned && bolt.life < 0.75) {
        spawnParticles(canvas, bolt, state);
        bolt.particlesSpawned = true;
      }

      bolt.life -= bolt.decay;
      if (bolt.life <= 0) state.bolts.splice(i, 1);
    }

    // --- Draw electric particles ---
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const p = state.particles[i];
      ctx.save();
      ctx.globalAlpha = p.life * 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // subtle gravity
      p.vx *= 0.96;
      p.life -= p.decay;
      if (p.life <= 0) state.particles.splice(i, 1);
    }

    // Decay scroll velocity
    state.scrollVelocity *= 0.92;

    state.rafId = requestAnimationFrame(() => render(canvas, ctx, state));
  }, [generateBranch, spawnBolt, spawnParticles]);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const state = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onScroll = () => {
      const now = Date.now();
      const dy = Math.abs(window.scrollY - state.lastScrollY);
      const dt = Math.max(now - state.lastScrollTime, 16);
      state.scrollVelocity = Math.min(dy / dt * 10, 10);
      state.lastScrollY = window.scrollY;
      state.lastScrollTime = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    render(canvas, ctx, state);

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [prefersReduced, render]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
