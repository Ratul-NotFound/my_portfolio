'use client';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

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
    const mouse = { x: null, y: null, radius: 140 };

    // Configure particle details depending on the active theme
    const getThemeConfig = (currentTheme) => {
      switch (currentTheme) {
        case 'hacker':
          return {
            particleColors: ['#00ff41', '#00cc32'],
            lineColor: 'rgba(0, 255, 65, 0.12)',
            maxDistance: 100,
            densityDivider: 15000, // higher number = fewer particles
          };
        case 'creative':
          return {
            particleColors: ['#0088ff', '#ec4899', '#f43f5e'],
            lineColor: 'rgba(0, 136, 255, 0.08)',
            maxDistance: 110,
            densityDivider: 14000,
          };
        case 'light':
          return {
            particleColors: ['#4f46e5', '#6366f1', '#0f172a'],
            lineColor: 'rgba(79, 70, 229, 0.05)',
            maxDistance: 90,
            densityDivider: 18000,
          };
        case 'dark':
        default:
          return {
            particleColors: ['#06b6d4', '#8b5cf6', '#3b82f6'],
            lineColor: 'rgba(6, 182, 212, 0.08)',
            maxDistance: 100,
            densityDivider: 15000,
          };
      }
    };

    let config = getThemeConfig(theme);

    class Particle {
      constructor(w, h) {
        this.reset(w, h);
      }

      reset(w, h, startAtEdge = false) {
        this.x = Math.random() * w;
        // If starting fresh, randomize fully; if resetting on screen wrap, start at edges
        this.y = startAtEdge ? (Math.random() > 0.5 ? 0 : h) : Math.random() * h;
        this.radius = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        
        // Pick a random color from the current theme config
        const colors = config.particleColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Base opacity for soft fading
        this.opacity = Math.random() * 0.4 + 0.3;
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
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouse.radius) {
            // Calculate force pushing particle away from mouse
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      const area = w * h;
      
      // Responsive particle count: fewer on mobile to guarantee high performance
      const isMobile = window.innerWidth < 768 || (window.matchMedia('(pointer: coarse)').matches);
      const divider = isMobile ? config.densityDivider * 2.5 : config.densityDivider;
      
      const count = Math.min(Math.floor(area / divider), 100); // Caps count at 100 to ensure performance
      
      particles = [];
      for (let i = 0; i < count; i++) {
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

    // Initialize layout and dimensions
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

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      config = getThemeConfig(theme);

      // 1. Update and draw individual particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();
      }

      // 2. Connect close particles with beautiful elegant lines (Constellation effect)
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.maxDistance) {
            // Line opacity fades out the further apart the particles are
            const alpha = (1 - dist / config.maxDistance) * 0.45;
            
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            
            // Premium gradient line connecting the particles in Creative theme!
            if (theme === 'creative') {
              const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
              grad.addColorStop(0, 'rgba(0, 136, 255, ' + alpha + ')');
              grad.addColorStop(1, 'rgba(236, 72, 153, ' + alpha + ')');
              ctx.strokeStyle = grad;
            } else {
              ctx.strokeStyle = config.lineColor.replace(/[\d\.]+\)$/, `${alpha})`);
            }
            
            ctx.stroke();
          }
        }

        // 3. Connect particles directly to the mouse cursor!
        if (mouse.x !== null && mouse.y !== null) {
          const dx = pi.x - mouse.x;
          const dy = pi.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.4;
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

    // Start buttery smooth render loop
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
}
