import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Star data
    const STAR_COUNT = Math.floor((width * height) / 3800);
    let stars = [];

    function initStars() {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 3500), 400);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.3,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 
            ? '#ffffff' 
            : Math.random() > 0.5 
              ? '#93c5fd' // light blue
              : '#38bdf8', // cyan
          speedY: Math.random() * 0.15 + 0.02,
        });
      }
    }

    initStars();

    // Shooting stars / Meteors
    let meteors = [];
    const spawnMeteor = () => {
      if (Math.random() < 0.015 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 1.2,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // roughly 45 degrees
          alpha: 1,
          thickness: Math.random() * 2 + 1,
        });
      }
    };

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      const offsetX = (mouseX - width / 2) * 0.015;
      const offsetY = (mouseY - height / 2) * 0.015;

      ctx.clearRect(0, 0, width, height);

      // Draw stars
      for (let star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const alpha = star.baseAlpha * (0.6 + 0.4 * Math.sin(star.twinklePhase));

        // Subtle slow vertical drift
        star.y -= star.speedY;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        const renderX = star.x - offsetX * (star.size * 1.5);
        const renderY = star.y - offsetY * (star.size * 1.5);

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
        ctx.shadowColor = '#60a5fa';
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Handle meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const endX = m.x - Math.cos(m.angle) * m.length;
        const endY = m.y + Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.3, `rgba(96, 165, 250, ${m.alpha * 0.8})`);
        grad.addColorStop(0.7, `rgba(44, 103, 237, ${m.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(44, 103, 237, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.012;

        if (m.alpha <= 0 || m.x < -100 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Space Background Layer */}
      <div className="absolute inset-0 bg-[#02050f]" />

      {/* Cosmic Nebula Glow Overlays */}
      <div 
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none animate-nebula"
        style={{ background: 'radial-gradient(circle, #2c67ed 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1d4ed8 0%, #4338ca 40%, transparent 75%)' }}
      />
      <div 
        className="absolute -bottom-32 left-1/3 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0284c7 0%, #2c67ed 40%, transparent 70%)' }}
      />

      {/* Subtle Space Grid Texture for modern cyber-space feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Interactive Stars & Meteors Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
