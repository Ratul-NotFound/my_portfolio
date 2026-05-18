'use client';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const FLOATING_TEXTS = [
  '404 NOT FOUND',
  'git push --force',
  'npm run dev',
  '<Antigravity />',
  'await brain.sync()',
  'const [state, dispatch]',
  'import { GPT_5 }',
  'Object.assign()',
  '120 FPS',
  '() => resolve()',
  'process.env.PORT',
  'model.generate()'
];

export default function LightweightParticles() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 110 };

    // Configure particle details depending on the active theme
    const getThemeConfig = (currentTheme) => {
      switch (currentTheme) {
        case 'hacker':
          return {
            particleColors: ['#00ff41', '#00cc32'],
            lineColor: 'rgba(0, 255, 65, 0.08)',
            maxDistance: 90,
            densityDivider: 32000, // much higher = fewer particles (high performance)
          };
        case 'creative':
          return {
            particleColors: ['#0088ff', '#ec4899'],
            lineColor: 'rgba(0, 136, 255, 0.05)',
            maxDistance: 95,
            densityDivider: 30000,
          };
        case 'light':
          return {
            particleColors: ['#4f46e5', '#6366f1', '#0f172a'],
            lineColor: 'rgba(79, 70, 229, 0.04)',
            maxDistance: 80,
            densityDivider: 36000,
          };
        case 'dark':
        default:
          return {
            particleColors: ['#06b6d4', '#8b5cf6', '#3b82f6'],
            lineColor: 'rgba(6, 182, 212, 0.05)',
            maxDistance: 90,
            densityDivider: 32000,
          };
      }
    };

    let config = getThemeConfig(theme);
    // Cache font configuration to avoid recalculations inside the loop
    const cachedFont = theme === 'hacker' ? '500 11px "Fira Code", monospace' : '500 11px "JetBrains Mono", monospace';

    class Particle {
      constructor(w, h, text = null) {
        this.text = text;
        this.reset(w, h);
      }

      reset(w, h, startAtEdge = false) {
        this.x = Math.random() * w;
        this.y = startAtEdge ? (Math.random() > 0.5 ? 0 : h) : Math.random() * h;
        
        // Text particles are slow and elegant
        if (this.text) {
          this.radius = Math.random() * 3 + 5; 
          this.vx = (Math.random() - 0.5) * 0.12; 
          this.vy = (Math.random() - 0.5) * 0.12;
        } else {
          this.radius = Math.random() * 1.5 + 0.6;
          this.vx = (Math.random() - 0.5) * 0.25; // Slower drift for elegance
          this.vy = (Math.random() - 0.5) * 0.25;
        }
        
        const colors = config.particleColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = this.text ? Math.random() * 0.1 + 0.1 : Math.random() * 0.3 + 0.2;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
          this.reset(w, h, true);
        }

        // Interactive mouse physics: repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radSq = mouse.radius * mouse.radius;
          
          if (distSq < radSq) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            this.x += Math.cos(angle) * force * 1.2;
            this.y += Math.sin(angle) * force * 1.2;
          }
        }
      }

      draw() {
        if (this.text) {
          ctx.beginPath();
          ctx.font = cachedFont;
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.fillText(this.text, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      const area = w * h;
      
      const isMobile = window.innerWidth < 768 || (window.matchMedia('(pointer: coarse)').matches);
      
      // Extremely lightweight capped density: 
      // Desktop: max 35 particles (prevents O(N^2) links overload)
      // Mobile: max 12 particles (zero lag on phones)
      const maxCount = isMobile ? 12 : 35;
      const divider = isMobile ? config.densityDivider * 2.5 : config.densityDivider;
      const count = Math.min(Math.floor(area / divider), maxCount); 
      
      particles = [];
      
      // Desktop gets 5 floating texts, mobile gets 2
      const textCount = isMobile ? 2 : 5;
      const selectedTexts = [...FLOATING_TEXTS].sort(() => 0.5 - Math.random()).slice(0, textCount);
      
      for (let i = 0; i < textCount; i++) {
        particles.push(new Particle(w, h, selectedTexts[i]));
      }

      // Rest of the particles are standard small points
      for (let i = 0; i < count - textCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
      
      initParticles();
    };

    resizeCanvas();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    let resizeTimeout;
    const handleResizeThrottled = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };

    window.addEventListener('resize', handleResizeThrottled);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      config = getThemeConfig(theme);

      // 1. Update and draw particles
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();
      }

      // 2. Connect close particles with lightweight solid color links (gradient objects removed for speed)
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < pLen; i++) {
        const pi = particles[i];

        for (let j = i + 1; j < pLen; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = config.maxDistance * config.maxDistance;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / config.maxDistance) * 0.35;
            
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            
            // Avoid creating linear gradients inside loop - huge performance gain!
            if (theme === 'creative') {
              ctx.strokeStyle = `rgba(0, 136, 255, ${alpha})`;
            } else {
              ctx.strokeStyle = config.lineColor.replace(/[\d\.]+\)$/, `${alpha})`);
            }
            
            ctx.stroke();
          }
        }

        // 3. Connect particles directly to the mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = pi.x - mouse.x;
          const dy = pi.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadSq = mouse.radius * mouse.radius;

          if (distSq < mouseRadSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouse.radius) * 0.3;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouse.x, mouse.y);
            
            if (theme === 'creative') {
              ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
            } else {
              ctx.strokeStyle = config.lineColor.replace(/[\d\.]+\)$/, `${alpha})`);
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResizeThrottled);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
}
