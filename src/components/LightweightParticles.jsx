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
  'model.generate()',
  'deep_learning',
  'new Promise()',
  'docker-compose up',
  'while(alive) { learn() }',
  'console.log("hello")',
  'git checkout -b',
  'Ctrl + Z',
  'flex-direction',
  'const AI = true',
  'sudo apt update',
  'Math.random()',
  'useEffect(() => {}, [])',
  'git commit --amend',
  '[...prev, data]',
  'neural_weights.bin',
  'transform: translate3d',
  'localStorage.getItem()',
  'Math.sin(now * 0.05)',
  'sys.stdout.write',
  'import { motion }',
  'const [ref, inView]',
  'Object.keys(model)',
  'optimizer: "adam"',
  'loss: 0.0042',
  'learning_rate = 1e-4',
  'await response.json()',
  'export default function',
  'const target = useRef()'
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
            particleColors: [
              '#61afef', // Keyword/Function Blue
              '#c678dd', // Import/Control Flow Purple
              '#e5c07b', // Variable/Class Yellow
              '#98c379', // Comment/Constant Mint Green
              '#e06c75', // Operator/String Pink-Red
              '#56b6c2', // Type/Special Symbol Cyan
              '#00ff41'  // Classic Terminal Green
            ],
            lineColor: 'rgba(97, 175, 239, 0.06)', // Subtle, elegant IDE-colored links
            maxDistance: 90,
            densityDivider: 18000, // lower divider = more particles
          };
        case 'creative':
          return {
            particleColors: ['#0088ff', '#ec4899'],
            lineColor: 'rgba(0, 136, 255, 0.05)',
            maxDistance: 95,
            densityDivider: 16000,
          };
        case 'light':
          return {
            particleColors: ['#4f46e5', '#6366f1', '#0f172a'],
            lineColor: 'rgba(79, 70, 229, 0.04)',
            maxDistance: 80,
            densityDivider: 20000,
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

    // Dynamic token syntax highlighter mapping for authentic dark IDE coding vibe
    const tokenizeText = (text, currentTheme) => {
      let colors = {
        keyword: '#c678dd',
        function: '#61afef',
        string: '#e5c07b',
        variable: '#abb2bf',
        type: '#56b6c2',
        symbol: '#abb2bf'
      };

      if (currentTheme === 'creative') {
        colors = {
          keyword: '#ec4899',
          function: '#0088ff',
          string: '#00d8b4',
          variable: '#ffffff',
          type: '#0088ff',
          symbol: 'rgba(255,255,255,0.4)'
        };
      } else if (currentTheme === 'light') {
        colors = {
          keyword: '#4f46e5',
          function: '#0f172a',
          string: '#06b6d4',
          variable: '#312e81',
          type: '#4f46e5',
          symbol: '#64748b'
        };
      } else if (currentTheme === 'hacker') {
        colors = {
          keyword: '#ff79c6',   // Vibrant Dracula Neon Pink
          function: '#00bfff',  // Vibrant Electric Neon Blue
          string: '#ffb86c',    // Vibrant Neon Gold/Orange
          variable: '#f8f8f2',  // Crisp Code White
          type: '#39ff14',      // Vibrant Terminal Neon Green
          symbol: '#e2e8f0'     // Bright Code Brackets/Operators
        };
      } else {
        colors = {
          keyword: '#a855f7',
          function: '#3b82f6',
          string: '#06b6d4',
          variable: '#f8fafc',
          type: '#22d3ee',
          symbol: '#64748b'
        };
      }

      const tokens = [];
      const parts = text.split(/(\s+|=|>|<|\(|\)|\[|\]|\{|\}|\.|\,)/g);
      
      parts.forEach(part => {
        if (!part) return;
        let color = colors.variable;
        
        if (/^(const|let|var|function|import|export|default|await|while|new|sudo|git|npm|process|docker-compose|sys|Ctrl)$/.test(part)) {
          color = colors.keyword;
        } else if (/^(log|generate|sync|resolve|push|run|checkout|random|getItem|sin|write|keys|useRef|useEffect|commit|apt|update)$/.test(part)) {
          color = colors.function;
        } else if (/^(".*"|true|false|\d+|FPS|NOT|FOUND|Antigravity|PORT|bin|adam|0\.0042|1e-4)$/.test(part)) {
          color = colors.string;
        } else if (/^(Object|GPT_5|Promise|AI|Math|localStorage|weights|state|dispatch|ref|inView|prev|data|response|target)$/.test(part)) {
          color = colors.type;
        } else if (/^(=|>|<|\(|\)|\[|\]|\{|\}|\.|\,|\+|-|\/)$/.test(part)) {
          color = colors.symbol;
        }
        
        tokens.push({ text: part, color });
      });

      return tokens;
    };

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
          this.tokens = tokenizeText(this.text, theme);
        } else {
          this.radius = Math.random() * 1.5 + 0.6;
          this.vx = (Math.random() - 0.5) * 0.25; // Slower drift for elegance
          this.vy = (Math.random() - 0.5) * 0.25;
        }
        
        const colors = config.particleColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // Higher contrast opacity for the hacker/dev theme to preserve syntax highlighting separation over dark background
        this.opacity = this.text 
          ? (theme === 'hacker' ? Math.random() * 0.2 + 0.45 : Math.random() * 0.1 + 0.1) 
          : (theme === 'hacker' ? Math.random() * 0.2 + 0.25 : Math.random() * 0.3 + 0.2);
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
          ctx.globalAlpha = this.opacity;
          
          let currentX = this.x;
          this.tokens.forEach(token => {
            ctx.fillStyle = token.color;
            ctx.fillText(token.text, currentX, this.y);
            currentX += ctx.measureText(token.text).width;
          });
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
      
      // Rich and dense but highly optimized particles layout: 
      // Desktop: max 85 particles (beautiful developer cosmos constellation)
      // Mobile: max 35 particles (lag-free on all phones)
      const maxCount = isMobile ? 35 : 85;
      const divider = isMobile ? config.densityDivider * 1.1 : config.densityDivider * 0.6;
      const count = Math.min(Math.floor(area / divider), maxCount); 
      
      particles = [];
      
      // Desktop gets 18 floating texts, mobile gets 8
      const textCount = isMobile ? 8 : 18;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
}
