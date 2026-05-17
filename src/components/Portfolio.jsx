/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue, useInView } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
const MemoNavbar = React.memo(Navbar);
const MemoFooter = React.memo(Footer);
import {
  Github, Linkedin, Mail, ExternalLink, Download, Terminal, Code2,
  Sparkles, Zap, Brain, Server, Globe, ArrowRight, MapPin,
  Star, Cpu, Network, Award, TrendingUp, Coffee, Rocket,
  Circle, ChevronRight, ChevronDown, Hand, BookOpen
} from 'lucide-react';

const springConfig = { stiffness: 80, damping: 20, restDelta: 0.001 };
const heroReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const heroBadgeReveal = {
  hidden: { opacity: 0, x: -18, y: -10, filter: 'blur(6px)' },
  show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] } }
};
const heroHeadlineReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] } }
};
const heroLineReveal = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] } }
};
const heroParaReveal = {
  hidden: { opacity: 0, x: 22, y: 10 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] } }
};
const heroActionsReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] } }
};
const heroSocialReveal = {
  hidden: { opacity: 0, x: -20, y: 10 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] } }
};
const heroCardReveal = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] } }
};
const heroImageReveal = {
  hidden: { opacity: 0, x: 40, y: 20, scale: 0.98, filter: 'blur(8px)' },
  show: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const ScrollAnimatedCard = ({ children, className, index = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const scale = useTransform(smoothProgress, [0, 0.25], [0.5, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const y = useTransform(smoothProgress, [0, 0.25], [400, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.2], [15, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, filter: `blur(${blurValue}px)` }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
// ── Clip-path section reveal wrapper ──
function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 40 }}
      animate={isInView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const ScrollProjectCard = ({ children, className, onMouseEnter, onMouseLeave, onMouseMove, animate, style }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const scale = useTransform(smoothProgress, [0, 0.3], [0.6, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);
  const y = useTransform(smoothProgress, [0, 0.3], [500, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.25], [20, 0]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      animate={animate}
      style={{ ...style, scale, opacity, y, filter: `blur(${blurValue}px)` }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ScrollHeading = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  const y = useTransform(smoothProgress, [0, 0.25], [60, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const rotateX = useTransform(smoothProgress, [0, 0.25], [35, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.2], [10, 0]);

  return (
    <motion.h2
      ref={ref}
      style={{ y, opacity, rotateX, filter: `blur(${blurValue}px)`, transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.h2>
  );
};

const ScrollSkillCard = ({ children, className, index = 0, total = 1, progress }) => {
  const clampedProgress = useTransform(progress, (p) => Math.min(1, Math.max(0, p)));
  const safeTotal = Math.max(1, total);
  // Wider stagger spread (0.38) for distinct one-by-one reveals, with a snappy duration (0.09)
  const start = 0.02 + (index / safeTotal) * 0.38;
  const end = Math.min(1, start + 0.09);

  const scale = useTransform(clampedProgress, [start, end], [0.94, 1]);
  const opacity = useTransform(clampedProgress, [start, end], [0.05, 1]);
  const blurValue = useTransform(clampedProgress, [start, end], [8, 0]);
  const y = useTransform(clampedProgress, [start, end], [30, 0]);
  const x = useTransform(clampedProgress, [start, end], [-25, 0]);
  const rotateZ = useTransform(clampedProgress, [start, end], [-0.8, 0]);

  return (
    <motion.div
      style={{ scale, opacity, x, y, rotateZ, filter: `blur(${blurValue}px)` }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TechGrid = ({ skills, isHacker, isLight }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Trigger progress to hit 1.0 when the element is 35% from the top of the viewport
    offset: ["start end", "center 35%"]
  });
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {skills.map((skill, i) => (
        <ScrollSkillCard
          key={i}
          index={i}
          total={skills.length}
          progress={smoothProgress}
          className={`group/card relative p-6 backdrop-blur-xl border rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-default overflow-hidden ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/10 hover:border-[#00ff41]/40 hover:shadow-[0_0_15px_rgba(0,255,65,0.08)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-indigo-400 hover:shadow-indigo-200/50 shadow-sm' : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-500/10'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover/card:from-cyan-500/5 group-hover/card:to-purple-500/5 transition-all duration-500"></div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

              <div className={`relative w-full h-full p-2 rounded-xl border transition-all group-hover/card:scale-110 ${isHacker ? 'bg-[#000a02] border-[#00ff41]/15 group-hover/card:border-[#00ff41]/30' : isLight ? 'bg-white border-slate-200 group-hover/card:border-indigo-300 shadow-sm' : 'bg-slate-800/50 border-slate-700 group-hover/card:border-slate-600'}`}>
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain filter group-hover/card:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover/card:border-cyan-500/50 rounded-xl transition-all duration-500 group-hover/card:scale-125"></div>
            </div>

            <div className="text-center">
              <span className={`text-sm font-semibold transition-colors block ${isHacker ? 'text-[#00cc32]/70 group-hover/card:text-[#00ff41]' : isLight ? 'text-slate-600 group-hover/card:text-indigo-600' : 'text-slate-300 group-hover/card:text-cyan-300'}`}>
                {skill.name}
              </span>
            </div>
          </div>

          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"></div>
        </ScrollSkillCard>
      ))}
    </div>
  );
};
const ShufflingProjectWrapper = ({ children, index, total, progress }) => {
    const xDir = index % 2 === 0 ? -1 : 1;
    const rotationDir = index % 2 === 0 ? -10 : 10;

    // Clamp the scroll progress between 0 and 1 to prevent spring overshoot from sliding out the last card
    const clampedProgress = useTransform(progress, p => Math.min(1.0, Math.max(0.0, p)));

    const startVal = index;
    const endVal = index - (total - 1);

    // Dynamic stack position: maps progress to stacking index using a direct linear range to keep Framer Motion's compiler happy
    const deckPosition = useTransform(
        clampedProgress,
        [0, 0.75, 1.0],
        [startVal, endVal, endVal]
    );

    // Scale: shifts forward in the stack (from 0.88 to 1.0)
    const scale = useTransform(
        deckPosition,
        [-3, -1, 0, 1, 2, 3],
        [1.0, 1.0, 1.0, 0.96, 0.92, 0.88]
    );

    // Y Translation (Perspective stack offset): moves up as cards in front exit
    const y = useTransform(
        deckPosition,
        [-3, -1, 0, 1, 2, 3],
        [0, 0, 0, 15, 30, 45]
    );

    // X Translation (Slide out): slides card horizontally when it becomes the exiting top card
    const x = useTransform(
        deckPosition,
        [-3, -1, 0, 3],
        [`${xDir * 125}%`, `${xDir * 125}%`, "0%", "0%"]
    );

    // Rotation: rotates card slightly as it slides out
    const rotate = useTransform(
        deckPosition,
        [-3, -1, 0, 3],
        [rotationDir, rotationDir, 0, 0]
    );

    // Opacity: cards at the back are partially transparent, top card is fully opaque, exited card is hidden
    const opacity = useTransform(
        deckPosition,
        [-3, -1, -0.7, 0, 1, 2, 3],
        [0, 0, 1.0, 1.0, 0.75, 0.5, 0.3]
    );

    // Dynamic Z-Index based on current stack position (higher stack index = closer to front)
    const zIndexVal = useTransform(
        deckPosition,
        [-3, -1, 0, 1, 2, 3],
        [50, 50, 40, 30, 20, 10]
    );
    const zIndex = useTransform(zIndexVal, Math.round);

    // Z Translation (3D depth layering): physically layers the cards in 3D space (preserve-3d ignores z-index)
    const z = useTransform(
        deckPosition,
        [-3, -1, 0, 1, 2, 3],
        [10, 10, 0, -20, -40, -60]
    );

    return (
        <motion.div
            style={{
                zIndex,
                x,
                y,
                z,
                rotate,
                scale,
                opacity,
                transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 m-auto h-[390px] max-h-[70vh] w-[94vw] md:w-[850px] will-change-transform"
        >
            {children}
        </motion.div>
    );
};
// ── Scroll-parallax text ──
function ParallaxHeading({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Stagger children framer wrapper ──
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ── Section badge component ──
function SectionBadge({ icon: Icon, label, isHacker, isLight }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: -12 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm mb-6 badge-pulse ${
        isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/20 text-[#00ff41]'
        : isLight  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
        : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-mono">{label}</span>
    </motion.div>
  );
}

// ── Draw-on section title line ──
function SectionTitleLine({ isHacker, isLight }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={`h-[2px] rounded-full mx-auto mb-4 ${
        isHacker ? 'bg-[#00ff41]/40' : isLight ? 'bg-indigo-300' : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500'
      }`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{ originX: 0, width: '60px' }}
    />
  );
}

// ── HoloProfileCard (Interactive 3D Sci-Fi Profile) ──
function HoloProfileCard({ isLight, isHacker }) {
  const [activeTab, setActiveTab] = useState('avatar');
  const cardRef = useRef(null);
  
  // 3D Perspective Tilt using Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    
    const px = Math.round(e.clientX - rect.left);
    const py = Math.round(e.clientY - rect.top);
    cardRef.current.style.setProperty('--spot-x', `${px}px`);
    cardRef.current.style.setProperty('--spot-y', `${py}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const themeColors = {
    spotlight: isHacker ? "rgba(0, 255, 65, 0.12)" : isLight ? "rgba(79, 70, 229, 0.12)" : "rgba(34, 211, 238, 0.12)",
    accent: isHacker ? "#00ff41" : isLight ? "#4f46e5" : "#22d3ee",
    scanner: isHacker ? "rgba(0, 255, 65, 0.5)" : isLight ? "rgba(79, 70, 229, 0.5)" : "rgba(34, 211, 238, 0.6)"
  };

  const metrics = [
    { name: "Frontend Speed", val: 96, desc: "Fluid UI render latencies" },
    { name: "Backend Security", val: 94, desc: "Secure endpoints & protocols" },
    { name: "Model Tuning", val: 88, desc: "Hyperparameter NLP layers" },
    { name: "Automation Flow", val: 92, desc: "Agentic pipeline efficiency" }
  ];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative w-full max-w-lg mx-auto backdrop-blur-2xl border rounded-3xl p-6 md:p-8 space-y-6 transition-all duration-500 cursor-default select-none overflow-hidden ${
        isHacker
          ? 'bg-[#000401]/90 border-[#00ff41]/15 hover:border-[#00ff41]/45 shadow-[0_0_35px_rgba(0,255,65,0.02)]'
          : isLight
            ? 'bg-white border-slate-200 shadow-2xl hover:border-indigo-400'
            : 'bg-[#0d1323]/85 border-slate-900 shadow-2xl hover:border-cyan-500/30'
      }`}
    >
      {/* Refraction Overlay Glare */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/0 via-white/4 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Specular Spotlight Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 150px at var(--spot-x, 50%) var(--spot-y, 50%), ${themeColors.spotlight}, transparent 85%)`
        }}
      />

      {/* Cybernetic HUD Frame Coordinates */}
      <div className="absolute top-3 left-4 font-mono text-[8px] opacity-35 tracking-wider">
        {"SYS.HUD // DHAKA.BD [N 23° 42' E 90° 22']"}
      </div>
      <div className="absolute top-3 right-4 font-mono text-[8px] opacity-35 tracking-wider">
        {"VER.2.08 // SECURE_CON"}
      </div>

      {/* Interactive Tabs Header Control Panel */}
      <div className="relative z-10 flex items-center justify-between border-b pb-4 mt-2" style={{ borderColor: isHacker ? 'rgba(0,255,65,0.1)' : isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)' }}>
        <div className="flex gap-1.5 sm:gap-2.5">
          {['avatar', 'metrics', 'kernel'].map((tab) => {
            const isTabActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono text-[9px] sm:text-[10px] md:text-xs font-black tracking-wider sm:tracking-widest uppercase px-2 py-1.5 sm:px-3 rounded-lg border transition-all duration-350 outline-none ${
                  isTabActive
                    ? isHacker 
                      ? 'bg-[#00ff41]/10 border-[#00ff41] text-[#00ff41] shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                      : isLight
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-600 shadow-sm'
                        : 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : isHacker
                      ? 'bg-transparent border-transparent text-[#00cc32]/50 hover:text-[#00cc32]'
                      : isLight
                        ? 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-350'
                }`}
              >
                <span className="hidden sm:inline">
                  [{tab === 'avatar' ? 'HOLO_AVATAR' : tab === 'metrics' ? 'SYS_STATS' : 'CODE_KERNEL'}]
                </span>
                <span className="inline sm:hidden">
                  [{tab === 'avatar' ? 'AVATAR' : tab === 'metrics' ? 'STATS' : 'KERNEL'}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Small theme pulse */}
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: themeColors.accent }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: themeColors.accent }} />
        </span>
      </div>

      {/* Main Tab Viewports */}
      <div className="relative z-10 flex-grow py-2 lg:min-h-[390px] md:min-h-[330px] min-h-[270px] flex flex-col justify-center" style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'avatar' && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-square lg:max-w-[380px] md:max-w-[320px] max-w-[260px] mx-auto w-full rounded-2xl overflow-hidden border-4"
              style={{
                borderColor: isHacker ? 'rgba(0, 255, 65, 0.15)' : isLight ? '#e2e8f0' : 'rgba(255,255,255,0.06)'
              }}
            >
              {/* Spinning compass HUD overlays inside the image frame */}
              <div className="absolute inset-0 z-10 pointer-events-none border border-dashed rounded-xl opacity-20 animate-spin" style={{ borderColor: themeColors.accent, animationDuration: '30s' }} />

              {/* Sweeping Laser Scanner Beam */}
              <motion.div 
                className="absolute left-0 right-0 h-[2px] z-10"
                style={{
                  background: `linear-gradient(to right, transparent, ${themeColors.accent}, transparent)`,
                  boxShadow: `0 0 10px ${themeColors.scanner}`,
                  top: 0
                }}
                animate={{ top: ['0%', '98%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              <img
                src="/profile.jpg"
                alt="Mahmud Hasan Ratul"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                onError={(e) => {
                  e.target.src = "/profile.jpg";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isHacker ? 'from-[#000600]/80' : isLight ? 'from-white/70' : 'from-[#0d1323]/80'} via-transparent to-transparent opacity-60`} />
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 w-full"
            >
              <div className="text-left mb-2">
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase opacity-45`}>METRICS DIAGNOSIS</span>
              </div>

              {metrics.map((metric, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-xs md:text-sm font-mono font-bold">
                    <span className={isHacker ? 'text-[#00cc32]' : isLight ? 'text-slate-700' : 'text-slate-300'}>{metric.name}</span>
                    <span style={{ color: themeColors.accent }}>{metric.val}%</span>
                  </div>
                  {/* Gauge Tracker */}
                  <div className={`h-2 rounded-full overflow-hidden w-full relative ${isHacker ? 'bg-[#00ff41]/5' : isLight ? 'bg-slate-100' : 'bg-slate-900'}`}>
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: themeColors.accent }}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.val}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-[9px] font-mono opacity-40 text-left">{metric.desc}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'kernel' && (
            <motion.div
              key="kernel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className={`p-4 rounded-xl border font-mono text-[10px] md:text-xs text-left overflow-auto lg:max-h-[355px] md:max-h-[295px] max-h-[235px] w-full relative z-10 transition-colors duration-500 ${
                isHacker 
                  ? 'bg-[#000a02] border-[#00ff41]/15 text-[#00ff41]' 
                  : isLight 
                    ? 'bg-slate-50 border-slate-200 text-slate-600' 
                    : 'bg-[#0b0f19] border-slate-900 text-cyan-400'
              }`}
            >
              <div className="opacity-45 border-b pb-2 mb-2 select-none flex justify-between text-[9px]">
                <span>CORE_KERNEL_RUNSHEET</span>
                <span>STATUS: STABLE</span>
              </div>
              <pre className="whitespace-pre-wrap select-text leading-relaxed font-bold">
{`{
  "developer": "Mahmud Hasan Ratul",
  "location": "Dhaka, Bangladesh [GMT+6]",
  "active_status": "AVAILABLE_FOR_HIRE",
  "core_competency": [
    "Full Stack Development",
    "AI & Machine Learning",
    "AI Automation",
    "Systems Research"
  ],
  "interests": ["Scalable Systems", "Distributed Clusters", "LLM Tuning"]
}`}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Profile Details */}
      <div className="relative z-10 text-left pt-2 border-t" style={{ borderColor: isHacker ? 'rgba(0,255,65,0.08)' : isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)', transform: 'translateZ(15px)' }}>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div>
            <h3 className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-white'}`}>
              Mahmud Hasan Ratul
            </h3>
            <p className={`flex items-center gap-2 text-xs font-mono mt-1 ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <MapPin className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
              Dhaka, Bangladesh • Available
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {['Full Stack', 'AI ML', 'Automation'].map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 border rounded-lg text-[9px] sm:text-[10px] font-mono font-bold tracking-wide select-none ${
                  isHacker 
                    ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00cc32]/80'
                    : isLight 
                      ? 'bg-indigo-50 border-indigo-100 text-indigo-650 shadow-sm'
                      : 'bg-[#0d1527]/60 border-slate-850 text-slate-400'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── CompetencyConsole (Sci-Fi Cybernetic Control Panel) ──
function CompetencyConsole({ isLight, isHacker }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState([]);
  
  const competencies = useMemo(() => [
    {
      icon: Code2,
      index: "01",
      title: "Full Stack Development",
      role: "SYSTEM ARCHITECT",
      desc: "Engineering premium, responsive client viewports and secure backends. Developing high-performance systems with strict data safety protocols, standard caching layers, and fluid UX controls.",
      skills: ["React", "Next.js", "Node.js", "TypeScript", "REST APIs", "GraphQL"],
      logs: [
        "SYS: Initializing frontend viewports...",
        "NET: Establishing secure CORS channels...",
        "DB: Caching query results via Redis...",
        "API: Route maps successfully compiled."
      ],
      color: isHacker ? "#00ff41" : isLight ? "#4f46e5" : "#22d3ee",
      glow: isHacker ? "rgba(0, 255, 65, 0.15)" : isLight ? "rgba(79, 70, 229, 0.15)" : "rgba(34, 211, 238, 0.15)"
    },
    {
      icon: Brain,
      index: "02",
      title: "AI & Machine Learning",
      role: "ML RESEARCHER",
      desc: "Designing neural layers, customized weights, and NLP deep learning channels. Training and deploying custom predictive models with focus on transformers, fine-tuning, and robust vector embeddings.",
      skills: ["PyTorch", "TensorFlow", "Transformers", "NLP", "Scikit-Learn", "CUDA"],
      logs: [
        "SYS: Loading tensor arrays...",
        "GPU: Binding CUDA parallel matrix...",
        "ML: Adjusting hyperparameter weights...",
        "MODEL: Epoch validation completed (Loss: 0.024)."
      ],
      color: isHacker ? "#00ff66" : isLight ? "#9333ea" : "#a855f7",
      glow: isHacker ? "rgba(0, 255, 102, 0.15)" : isLight ? "rgba(147, 51, 234, 0.15)" : "rgba(168, 85, 247, 0.15)"
    },
    {
      icon: Zap,
      index: "03",
      title: "AI Automation",
      role: "AUTOMATION SPECIALIST",
      desc: "Creating autonomous agentic flows, multi-agent frameworks, and vector-backed state systems. Engineering scalable cron execution pipelines to completely automate high-complexity operational tasks.",
      skills: ["LangChain", "CrewAI", "Vector DBs", "n8n", "Python", "State Flows"],
      logs: [
        "SYS: Launching multi-agent environment...",
        "AGENT: Critic agent validating researcher logs...",
        "VEC: Similarity queries routing to Pinecone...",
        "FLOW: Execution loop completed safely."
      ],
      color: isHacker ? "#00c8ff" : isLight ? "#ec4899" : "#f43f5e",
      glow: isHacker ? "rgba(0, 200, 255, 0.15)" : isLight ? "rgba(236, 72, 153, 0.15)" : "rgba(244, 63, 94, 0.15)"
    },
    {
      icon: BookOpen,
      index: "04",
      title: "Research",
      role: "CS SCIENTIST",
      desc: "Investigating emerging computational paradigms, distributed ledger clusters, and high-concurrency systems. Pioneer in optimizing Retrieval-Augmented Generation (RAG) layouts and high-speed compiler layers.",
      skills: ["RAG Systems", "LLM Tuning", "Distributed", "MLOps", "Compiler Theory", "Cloud Scale"],
      logs: [
        "SYS: Benchmarking distributed nodes...",
        "RAG: Parsing document embedding layers...",
        "LATENCY: RTT metrics analyzed (4.2ms avg)...",
        "SYS: Next-generation cluster specs generated."
      ],
      color: isHacker ? "#ffd700" : isLight ? "#f59e0b" : "#eab308",
      glow: isHacker ? "rgba(255, 215, 0, 0.15)" : isLight ? "rgba(245, 158, 11, 0.15)" : "rgba(234, 179, 8, 0.15)"
    }
  ], [isLight, isHacker]);

  // Auto-rotate tabs slowly
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % competencies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, competencies]);

  // Terminal log typing simulator
  useEffect(() => {
    setTerminalLogs([]);
    const logs = competencies[activeIdx].logs;
    let timer;
    let currentLogs = [];
    
    const addLogLine = (idx) => {
      if (idx >= logs.length) return;
      currentLogs.push(logs[idx]);
      setTerminalLogs([...currentLogs]);
      timer = setTimeout(() => addLogLine(idx + 1), 600);
    };

    addLogLine(0);
    return () => clearTimeout(timer);
  }, [activeIdx, competencies]);

  const active = competencies[activeIdx];

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-6 pb-12 select-none">
      {/* LEFT SELECTOR NODE PANEL */}
      <div className="lg:col-span-5 flex flex-col justify-center gap-4">
        <div className="mb-2">
          <span className={`text-[10px] font-mono tracking-[0.25em] font-black uppercase ${isHacker ? 'text-[#00ff41]/50' : 'text-slate-400'}`}>
            SELECT TERMINAL COMPETENCY
          </span>
        </div>

        {competencies.map((comp, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setIsAutoPlaying(false);
              }}
              onMouseEnter={() => {
                setActiveIdx(idx);
                setIsAutoPlaying(false);
              }}
              className={`group flex items-center justify-between p-3.5 md:p-5 rounded-2xl border text-left transition-all duration-550 w-full relative overflow-hidden backdrop-blur-md outline-none ${
                isSelected
                  ? isHacker 
                    ? 'bg-[#000a02]/90 border-[#00ff41] shadow-[0_0_25px_rgba(0,255,65,0.08)]' 
                    : isLight 
                      ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-500/10' 
                      : 'bg-[#0d1527]/90 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.08)]'
                  : isHacker
                    ? 'bg-transparent border-[#00ff41]/10 hover:border-[#00ff41]/30 hover:bg-[#00ff41]/5'
                    : isLight
                      ? 'bg-white/40 border-slate-200/80 hover:border-slate-300 hover:bg-white/60 shadow-sm'
                      : 'bg-[#0b0f19]/30 border-slate-900/80 hover:border-slate-800 hover:bg-[#0b0f19]/60'
              }`}
            >
              {/* Dynamic Accent Line */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-[4px] transition-transform duration-500 origin-bottom"
                style={{
                  backgroundColor: comp.color,
                  transform: isSelected ? 'scaleY(1)' : 'scaleY(0)'
                }}
              />

              <div className="flex items-center gap-2.5 md:gap-4 pl-1 md:pl-2 relative z-10">
                {/* Index marker */}
                <span 
                  className="font-mono text-[10px] md:text-xs font-bold select-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: isSelected ? comp.color : 'inherit' }}
                >
                  {comp.index}
                </span>

                {/* Node pulsing synapse */}
                <div className="relative">
                  {isSelected && (
                    <span 
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: comp.color }}
                    />
                  )}
                  <div 
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      isSelected ? 'scale-110' : 'scale-90 select-none'
                    }`}
                    style={{
                      backgroundColor: isSelected ? `${comp.color}15` : 'transparent',
                      borderColor: isSelected ? comp.color : 'transparent',
                      color: isSelected ? comp.color : 'currentColor'
                    }}
                  >
                    <comp.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                <div>
                  <h4 className={`font-black tracking-tight text-sm md:text-base transition-colors duration-300 ${
                    isSelected
                      ? isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-950' : 'text-white'
                      : isHacker ? 'text-[#00cc32]/60 group-hover:text-[#00cc32]' : isLight ? 'text-slate-650' : 'text-slate-400'
                  }`}>
                    {comp.title}
                  </h4>
                  <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-wider uppercase opacity-55 select-none leading-none">
                    {comp.role}
                  </span>
                </div>
              </div>

              {/* Angle selector icon */}
              <div 
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-dashed hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: isSelected ? comp.color : 'rgba(150,150,150,0.3)', color: comp.color }}
              >
                <span className="text-xs font-mono font-black">&gt;</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT LIVE MONITOR PANEL */}
      <div className="lg:col-span-7 flex flex-col">
        <div 
          className={`flex-1 rounded-3xl border backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-700 ${
            isHacker 
              ? 'bg-[#000401]/95 border-[#00ff41]/20 shadow-[0_0_35px_rgba(0,255,65,0.03)]' 
              : isLight 
                ? 'bg-white border-slate-200 shadow-2xl shadow-indigo-500/5' 
                : 'bg-[#0b0f19]/80 border-slate-900 shadow-2xl shadow-cyan-500/2'
          }`}
          style={{
            boxShadow: `0 0 40px ${active.glow}20`
          }}
        >
          {/* Glass glare effect */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-white/0 via-white/3 to-white/0 opacity-60" />

          {/* Technical monitor grids overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${active.color} 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }} />

          {/* Monitor Header with coordinate metrics */}
          <div className="relative z-10 flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: isHacker ? 'rgba(0,255,65,0.1)' : isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              {/* Dynamic status light */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: active.color }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: active.color }} />
              </span>
              <span className={`text-[10px] font-mono tracking-widest font-bold uppercase ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                LIVE MONITOR :: COMP_SELECTOR_{active.index}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[9px] opacity-40">
              <span>LATENCY: 4.2ms</span>
              <span>SYNERGY: 98%</span>
            </div>
          </div>

          {/* Main Visualizer and text container */}
          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center flex-grow">
            
            {/* Visualizer canvas left (md:col-span-4) */}
            <div className="md:col-span-4 flex items-center justify-center relative aspect-square max-w-[150px] mx-auto w-full md:max-w-none">
              
              {/* Spinning background circles */}
              <div 
                className="absolute inset-0 rounded-full border border-dashed animate-spin"
                style={{
                  borderColor: `${active.color}255`,
                  animationDuration: '20s'
                }}
              />
              <div 
                className="absolute inset-4 rounded-full border border-dotted animate-spin"
                style={{
                  borderColor: `${active.color}45`,
                  animationDuration: '10s',
                  animationDirection: 'reverse'
                }}
              />

              {/* Dynamic SVG graphic visualizer */}
              <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                {active.title === "Full Stack Development" && (
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 100 100" stroke={active.color} strokeWidth="1.2">
                    <rect x="15" y="15" width="70" height="50" rx="4" />
                    <line x1="15" y1="27" x2="85" y2="27" />
                    <rect x="25" y="37" width="16" height="6" rx="0.5" />
                    <rect x="47" y="37" width="28" height="6" rx="0.5" />
                    <rect x="25" y="49" width="50" height="10" rx="0.5" />
                    <rect x="35" y="75" width="30" height="10" rx="1" />
                    <line x1="50" y1="65" x2="50" y2="75" />
                  </svg>
                )}
                {active.title === "AI & Machine Learning" && (
                  <svg className="w-16 h-16 spin-slow" fill="none" viewBox="0 0 100 100" stroke={active.color} strokeWidth="1.2">
                    <circle cx="50" cy="50" r="14" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="4" fill={active.color} />
                    <circle cx="20" cy="50" r="6" />
                    <circle cx="80" cy="50" r="6" />
                    <circle cx="50" cy="20" r="6" />
                    <circle cx="50" cy="80" r="6" />
                    <line x1="26" y1="50" x2="36" y2="50" />
                    <line x1="64" y1="50" x2="74" y2="50" />
                    <line x1="50" y1="26" x2="50" y2="36" />
                    <line x1="50" y1="64" x2="50" y2="74" />
                  </svg>
                )}
                {active.title === "AI Automation" && (
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 100 100" stroke={active.color} strokeWidth="1.2">
                    <path d="M 25 35 L 50 35 L 50 65 L 75 65" strokeDasharray="3 3" />
                    <circle cx="25" cy="35" r="5" fill={active.color} fillOpacity="0.4" />
                    <circle cx="50" cy="35" r="5" />
                    <circle cx="50" cy="65" r="5" />
                    <circle cx="75" cy="65" r="5" fill={active.color} fillOpacity="0.4" />
                    <polygon points="58,32 66,35 58,38" fill={active.color} />
                    <polygon points="60,62 68,65 60,68" fill={active.color} />
                  </svg>
                )}
                {active.title === "Research" && (
                  <svg className="w-16 h-16 spin-slow" fill="none" viewBox="0 0 100 100" stroke={active.color} strokeWidth="1.2">
                    <ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(-30 50 50)" />
                    <ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(30 50 50)" />
                    <ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(90 50 50)" />
                    <circle cx="50" cy="50" r="8" fill={active.color} />
                  </svg>
                )}
              </div>
            </div>

            {/* Content Details right (md:col-span-8) */}
            <div className="md:col-span-8 space-y-4">
              <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-900' : 'text-white'}`}>
                {active.title}
              </h3>
              
              <p className={`text-sm md:text-base leading-relaxed leading-7 ${isHacker ? 'text-[#00cc32]/80' : isLight ? 'text-slate-600' : 'text-slate-350'}`}>
                {active.desc}
              </p>

              {/* Dynamic tag cluster */}
              <div className="flex flex-wrap gap-2 pt-2">
                {active.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 border rounded-lg text-xs font-mono font-bold tracking-wide select-none transition-colors duration-300 ${
                      isHacker 
                        ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00cc32]/80 hover:border-[#00ff41] hover:text-[#00ff41]'
                        : isLight 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:border-indigo-400'
                          : 'bg-[#0d1527]/60 border-slate-800 text-slate-400 hover:border-cyan-400 hover:text-cyan-300'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive blinder console monitor at the bottom */}
          <div className={`mt-6 p-4 rounded-xl border font-mono text-[10px] md:text-xs relative z-10 transition-colors duration-500 overflow-hidden ${
            isHacker 
              ? 'bg-[#000a02] border-[#00ff41]/15 text-[#00ff41]' 
              : isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-600' 
                : 'bg-[#0d1527] border-slate-900 text-cyan-400'
          }`}>
            {/* Blinking prompt */}
            <div className="flex items-center justify-between border-b pb-2 mb-2 select-none opacity-45" style={{ borderColor: isHacker ? 'rgba(0,255,65,0.08)' : isLight ? '#e2e8f0' : 'rgba(255,255,255,0.03)' }}>
              <span>TERMINAL COMPILER SHELL v2.08</span>
              <span>STATUS: COMPILED</span>
            </div>

            <div className="space-y-1 select-none">
              {terminalLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="opacity-40">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              {terminalLogs.length < active.logs.length && (
                <div className="flex items-center gap-1">
                  <span className="opacity-40">&gt;</span>
                  <span className="w-1.5 h-3 bg-current animate-blink" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── WhatIDoCard (Hyper-Creative 3D Interactive Card) ──
function WhatIDoCard({ item, i, isLight, isHacker }) {
  const cardRef = useRef(null);
  
  // 3D Tilt values using Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 160, damping: 22 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    
    const px = Math.round(e.clientX - rect.left);
    const py = Math.round(e.clientY - rect.top);
    cardRef.current.style.setProperty('--spot-x', `${px}px`);
    cardRef.current.style.setProperty('--spot-y', `${py}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Determine active thematic coloring scheme
  const themeColors = {
    "Full Stack Development": {
      spotlight: isHacker ? "rgba(0, 255, 65, 0.12)" : isLight ? "rgba(79, 70, 229, 0.12)" : "rgba(34, 211, 238, 0.12)",
      accent: isHacker ? "#00ff41" : isLight ? "#4f46e5" : "#22d3ee",
      radial: isHacker ? "from-[#00ff41]/20" : isLight ? "from-indigo-500/20" : "from-cyan-500/20"
    },
    "AI & Machine Learning": {
      spotlight: isHacker ? "rgba(0, 255, 100, 0.12)" : isLight ? "rgba(147, 51, 234, 0.12)" : "rgba(168, 85, 247, 0.12)",
      accent: isHacker ? "#00ff66" : isLight ? "#9333ea" : "#a855f7",
      radial: isHacker ? "from-[#00ff66]/20" : isLight ? "from-purple-500/20" : "from-purple-500/20"
    },
    "AI Automation": {
      spotlight: isHacker ? "rgba(0, 200, 255, 0.12)" : isLight ? "rgba(236, 72, 153, 0.12)" : "rgba(244, 63, 94, 0.12)",
      accent: isHacker ? "#00c8ff" : isLight ? "#ec4899" : "#f43f5e",
      radial: isHacker ? "from-[#00c8ff]/20" : isLight ? "from-pink-500/20" : "from-rose-500/20"
    },
    "Research": {
      spotlight: isHacker ? "rgba(255, 215, 0, 0.12)" : isLight ? "rgba(245, 158, 11, 0.12)" : "rgba(234, 179, 8, 0.12)",
      accent: isHacker ? "#ffd700" : isLight ? "#f59e0b" : "#eab308",
      radial: isHacker ? "from-[#ffd700]/20" : isLight ? "from-amber-500/20" : "from-yellow-500/20"
    }
  }[item.title] || {
    spotlight: "rgba(99, 102, 241, 0.12)",
    accent: "#6366f1",
    radial: "from-indigo-500/20"
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative p-8 backdrop-blur-xl border rounded-3xl cursor-default overflow-hidden transition-all duration-500 ${
        isHacker
          ? 'bg-[#000401]/85 border-[#00ff41]/10 hover:border-[#00ff41]/35 shadow-[0_0_20px_rgba(0,255,65,0.01)]'
          : isLight
            ? 'bg-white/40 border-slate-200/80 shadow-lg shadow-indigo-500/5 hover:border-indigo-400'
            : 'bg-[#0b0f19]/40 border-slate-900 shadow-2xl hover:border-cyan-500/30'
      }`}
    >
      {/* 3D Glass Refraction Glare */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Hover Spotlight Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 140px at var(--spot-x, 50%) var(--spot-y, 50%), ${themeColors.spotlight}, transparent 80%)`
        }}
      />

      {/* Decorative Floating SVGs (Role-Specific) */}
      <div className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0 overflow-hidden">
        {item.title === "Full Stack Development" && (
          <svg className="absolute -right-8 -bottom-8 w-48 h-48 text-current animate-float select-none opacity-40 animate-pulse" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
            <rect x="10" y="10" width="80" height="60" rx="4" />
            <line x1="10" y1="22" x2="90" y2="22" />
            <circle cx="18" cy="16" r="1.5" />
            <circle cx="24" cy="16" r="1.5" />
            <circle cx="30" cy="16" r="1.5" />
            <rect x="20" y="32" width="20" height="8" rx="1" />
            <rect x="50" y="32" width="30" height="8" rx="1" />
            <rect x="20" y="48" width="60" height="12" rx="1" />
          </svg>
        )}
        {item.title === "AI & Machine Learning" && (
          <svg className="absolute -right-8 -bottom-8 w-48 h-48 text-current select-none opacity-40" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
            <circle cx="50" cy="50" r="12" strokeDasharray="3 3" />
            <circle cx="20" cy="50" r="5" />
            <circle cx="80" cy="50" r="5" />
            <circle cx="50" cy="20" r="5" />
            <circle cx="50" cy="80" r="5" />
            <line x1="25" y1="50" x2="38" y2="50" />
            <line x1="62" y1="50" x2="75" y2="50" />
            <line x1="50" y1="25" x2="50" y2="38" />
            <line x1="50" y1="62" x2="50" y2="75" />
            <line x1="24" y1="46" x2="46" y2="24" strokeDasharray="2 2" />
            <line x1="54" y1="24" x2="76" y2="46" strokeDasharray="2 2" />
            <line x1="24" y1="54" x2="46" y2="76" strokeDasharray="2 2" />
            <line x1="54" y1="76" x2="76" y2="54" strokeDasharray="2 2" />
          </svg>
        )}
        {item.title === "AI Automation" && (
          <svg className="absolute -right-8 -bottom-8 w-48 h-48 text-current select-none opacity-40" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
            <path d="M 20 30 L 45 30 L 45 70 L 80 70" strokeDasharray="2 2" />
            <circle cx="20" cy="30" r="4" fill="currentColor" fillOpacity="0.3" />
            <circle cx="45" cy="30" r="4" />
            <circle cx="45" cy="70" r="4" />
            <circle cx="80" cy="70" r="4" fill="currentColor" fillOpacity="0.3" />
            <polygon points="55,27 63,30 55,33" fill="currentColor" />
            <polygon points="65,67 73,70 65,73" fill="currentColor" />
          </svg>
        )}
        {item.title === "Research" && (
          <svg className="absolute -right-8 -bottom-8 w-48 h-48 text-current select-none opacity-40" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30 50 50)" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(90 50 50)" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Layered 3D Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        
        {/* Animated Icon */}
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md"
          style={{
            transform: 'translateZ(40px)',
            background: isHacker ? 'rgba(0, 255, 65, 0.05)' : isLight ? 'rgba(99, 102, 241, 0.08)' : 'rgba(34, 211, 238, 0.08)',
            border: `1px solid ${isHacker ? 'rgba(0, 255, 65, 0.15)' : isLight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(34, 211, 238, 0.15)'}`,
            color: themeColors.accent
          }}
        >
          <item.icon className="w-6 h-6" />
        </div>

        {/* Text Details with layered lifts */}
        <div className="space-y-4">
          <h3 
            className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300`}
            style={{
              transform: 'translateZ(25px)',
              color: isHacker ? '#00ff41' : isLight ? '#1e293b' : '#ffffff'
            }}
          >
            <span>
              {item.title}
            </span>
          </h3>

          <p 
            className={`text-sm leading-relaxed transition-all duration-300 select-none ${
              isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {item.desc}
          </p>

          {/* Staggered tags */}
          <div 
            className="flex flex-wrap gap-2 pt-2"
            style={{ transform: 'translateZ(15px)' }}
          >
            {item.skills.map((skill, j) => (
              <motion.span
                key={j}
                whileHover={{ scale: 1.08 }}
                className={`px-3 py-1 border rounded-lg text-xs font-mono font-bold tracking-wide select-none transition-colors duration-300 ${
                  isHacker 
                    ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00cc32]/80 hover:border-[#00ff41] hover:text-[#00ff41]'
                    : isLight 
                      ? 'bg-indigo-50/50 border-indigo-100 text-indigo-650 hover:border-indigo-400 hover:bg-indigo-50'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-cyan-500 hover:text-cyan-300'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Kinetic Border Highlight on Hover */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20`}
        style={{
          background: `linear-gradient(to right, transparent, ${themeColors.accent}, transparent)`
        }}
      />
    </motion.div>
  );
}

// ── CountUp hook ──
function useCountUp(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    // parse e.g. '10K+' -> numeric=10, suffix='K+'
    const match = String(target).match(/^([\d.]+)([^\d]*)$/);
    if (!match) { setCount(target); return; }
    const numeric = parseFloat(match[1]);
    const suffix = match[2] || '';
    if (!numeric) { setCount(target); return; }
    let start = 0;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start) + suffix);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

// ── StatCard with count-up ──
// ── StatCard with count-up ──
function StatCard({ stat, isLight, isHacker }) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  
  // 3D Tilt values using Framer Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for fluid cursor lag
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 25 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates to range [-0.5, 0.5]
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    
    // Set custom CSS variables for cursor spotlight tracking
    const px = Math.round(e.clientX - rect.left);
    const py = Math.round(e.clientY - rect.top);
    cardRef.current.style.setProperty('--spotlight-x', `${px}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${py}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const displayed = useCountUp(stat.value, 1600, inView);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative p-6 md:p-8 backdrop-blur-xl border rounded-2xl cursor-default overflow-hidden transition-all duration-500 ${
        isHacker
          ? 'bg-[#000401]/85 border-[#00ff41]/10 hover:border-[#00ff41]/30 shadow-[0_0_20px_rgba(0,255,65,0.02)]'
          : isLight
            ? 'bg-white/40 border-slate-200/80 shadow-lg shadow-indigo-500/5 hover:border-indigo-400'
            : 'bg-[#0b0f19]/40 border-slate-900 shadow-2xl hover:border-cyan-500/30'
      }`}
    >
      {/* 3D Glass Reflective Glare */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Cursor Spotlight mesh background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          backgroundImage: isHacker
            ? `radial-gradient(circle 120px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0, 255, 65, 0.15), transparent 80%)`
            : `radial-gradient(circle 140px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${
                isLight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(34, 211, 238, 0.12)'
              }, transparent 80%)`
        }}
      />

      {/* Main Stats content layered in 3D */}
      <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: 'translateZ(30px)' }}>
        {/* Icon & Status header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
            isHacker ? 'bg-[#00ff41]/5 text-[#00ff41]' : isLight ? 'bg-indigo-50 text-indigo-650' : 'bg-cyan-500/10 text-cyan-400'
          }`}>
            <stat.icon className="w-6 h-6 animate-pulse" />
          </div>
          
          {/* Active status pulse */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dashed text-[9px] font-mono font-bold tracking-wider uppercase select-none pointer-events-none leading-none scale-90 origin-right opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isHacker ? 'bg-[#00ff41]' : isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} />
            <span className={isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-650' : 'text-cyan-400'}>Live</span>
          </div>
        </div>

        {/* Numbers & Titles */}
        <div className="space-y-1.5">
          <div className={`stat-number text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r bg-clip-text text-transparent select-none ${
            isHacker
              ? 'from-[#00ff41] to-[#00cc32]'
              : isLight
                ? 'from-indigo-600 to-purple-600'
                : 'from-cyan-400 via-indigo-400 to-purple-400'
          }`}>
            {displayed || stat.value}
          </div>
          
          <div className={`text-[10px] font-black font-mono tracking-[0.2em] uppercase select-none ${
            isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-550 font-extrabold' : 'text-slate-300'
          }`}>
            {stat.label}
          </div>
          
          <div className={`text-xs select-none ${
            isHacker ? 'text-[#00ff41]/30' : isLight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {stat.desc}
          </div>
        </div>
      </div>

      {/* Decorative border spotlight accents */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
        isHacker 
          ? 'from-transparent via-[#00ff41]/50 to-transparent' 
          : isLight 
            ? 'from-transparent via-indigo-500/55 to-transparent' 
            : 'from-transparent via-cyan-500/60 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20`} />
    </motion.div>
  );
}

const InteractiveText = ({ text, className, isHacker, isLight }) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block cursor-default select-none origin-center"
              whileHover={{
                scale: 1.3,
                y: -6,
                rotate: Math.random() * 20 - 10,
                color: isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee',
                textShadow: isHacker ? '0 0 12px rgba(0, 255, 65, 0.9)' : isLight ? '0 0 10px rgba(79, 70, 229, 0.5)' : '0 0 12px rgba(34, 211, 238, 0.9)'
              }}
              transition={{ type: "spring", stiffness: 450, damping: 10 }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

const topicsConfig = {
  'web-app': {
    title: "Web App",
    subject: "Let's Build a Premium Web Application!",
    body: "Hi Ratul, I am looking to build a high-performance, beautiful, and interactive web application. Let's discuss details!",
    buttonText: "Launch Web Project",
    desc: "React, Next.js, Custom CSS"
  },
  'ai': {
    title: "AI Integration",
    subject: "Let's Build an AI Integration!",
    body: "Hi Ratul, I want to integrate advanced AI capabilities into my application. Let's chat!",
    buttonText: "Initiate AI Brainstorm",
    desc: "LLMs, Neural Networks, Agents"
  },
  'saas': {
    title: "SaaS Platform",
    subject: "Let's Build a SaaS Platform!",
    body: "Hi Ratul, I am planning a scalable Software-as-a-Service system. Let's make it real!",
    buttonText: "Design SaaS Architecture",
    desc: "Scale, Payments, APIs"
  },
  'consultation': {
    title: "Consultation",
    subject: "Schedule a Free Portfolio/System Consultation",
    body: "Hi Ratul, I would love to get your advice on my system architecture and schedule a brief free consultation call. Let's connect!",
    buttonText: "Book Architecture Review",
    desc: "Free 1-on-1 System Design Review"
  }
};

const HandshakeConnector = ({ isHacker, isLight }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("m.h.ratul18@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className={`relative w-full max-w-md mx-auto h-[240px] rounded-2xl border overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-500 cursor-pointer group/handshake ${
        isHacker
          ? 'bg-[#000401]/95 border-[#00ff41]/10 hover:border-[#00ff41]/30 shadow-[0_0_30px_rgba(0,255,65,0.02)]'
          : isLight
            ? 'bg-white/80 border-slate-200/80 shadow-xl shadow-indigo-500/5'
            : 'bg-[#0b0f19]/80 border-slate-900 shadow-2xl'
      }`}
      onHoverStart={() => setIsConnected(true)}
      onHoverEnd={() => setIsConnected(false)}
      onTouchStart={() => setIsConnected(true)}
      onTouchEnd={() => setIsConnected(false)}
    >
      {/* Delicate background spotlight */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-700 group-hover/handshake:opacity-25"
        style={{
          backgroundImage: isHacker
            ? `radial-gradient(circle 120px at 50% 50%, rgba(0, 255, 65, 0.15), transparent 80%)`
            : `radial-gradient(circle 130px at 50% 50%, ${isLight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(34, 211, 238, 0.12)'}, transparent 80%)`
        }}
      />

      {/* Main Handshake Playground */}
      <div className="relative w-full h-[110px] flex items-center justify-center overflow-hidden">
        {/* Left Hand (Ratul's Hand) */}
        <motion.div
          animate={{
            x: isConnected ? -8 : -50,
            opacity: isConnected ? 1 : 0.5,
            scale: isConnected ? 1.05 : 0.95,
            rotate: isConnected ? 0 : 20
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className={`absolute flex items-center gap-1 ${
            isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-650' : 'text-cyan-400'
          }`}
          style={{ left: 'calc(50% - 60px)' }}
        >
          <Hand className="w-8 h-8 transform rotate-[90deg] scale-x-[-1]" />
        </motion.div>

        {/* Right Hand (Visitor's Hand) */}
        <motion.div
          animate={{
            x: isConnected ? 8 : 50,
            opacity: isConnected ? 1 : 0.5,
            scale: isConnected ? 1.05 : 0.95,
            rotate: isConnected ? 0 : -20
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className={`absolute flex items-center gap-1 ${
            isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-600' : 'text-purple-400'
          }`}
          style={{ right: 'calc(50% - 60px)' }}
        >
          <Hand className="w-8 h-8 transform rotate-[-90deg]" />
        </motion.div>

        {/* Ripple Wave Spark */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: [0.2, 2.0], opacity: [0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute w-10 h-10 rounded-full border pointer-events-none z-10 ${
                isHacker 
                  ? 'border-[#00ff41] bg-[#00ff41]/20 shadow-[0_0_15px_rgba(0,255,65,0.5)]' 
                  : isLight 
                    ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                    : 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              }`}
            />
          )}
        </AnimatePresence>

        {/* Connecting Target UI */}
        {!isConnected && (
          <div className="absolute text-center select-none pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`w-5 h-5 rounded-full border border-dashed mx-auto mb-1 flex items-center justify-center ${
                isHacker ? 'border-[#00ff41]/40' : isLight ? 'border-indigo-300' : 'border-cyan-500/40'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isHacker ? 'bg-[#00ff41]/50' : isLight ? 'bg-indigo-550' : 'bg-cyan-400'}`} />
            </motion.div>
            <p className={`text-[9px] font-bold tracking-widest uppercase ${
              isHacker ? 'text-[#00cc32]/60' : 'text-slate-400'
            }`}>
              Hover to Connect
            </p>
          </div>
        )}

        {/* Active Handshake Sparkles */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-10 select-none pointer-events-none"
          >
            <Sparkles className={`w-6 h-6 animate-pulse ${
              isHacker ? 'text-[#00ff41]' : isLight ? 'text-amber-500' : 'text-cyan-300'
            }`} />
          </motion.div>
        )}
      </div>

      {/* Info & CTA details below */}
      <div className="relative z-20 text-center w-full max-w-sm mt-1">
        <AnimatePresence mode="wait">
          {isConnected ? (
            <motion.div
              key="connected-state"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2.5"
            >
              <p className={`text-xs font-mono uppercase tracking-wider ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-650' : 'text-cyan-400'}`}>
                Connection Established! 🤝
              </p>
              
              <div className="flex items-center justify-center gap-2.5">
                <a
                  href="mailto:m.h.ratul18@gmail.com?subject=Let's%20Get%20In%20Touch!&body=Hi%20Ratul,%20I%20reached%20out%20to%20you%20via%20your%20digital%20handshake%20portal.%20Let's%20connect%20and%20build%20something%20amazing%20together!"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:scale-105 ${
                    isHacker
                      ? 'bg-[#00ff41]/20 border border-[#00ff41] text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                      : isLight
                        ? 'bg-indigo-600 hover:bg-indigo-550 text-white shadow-md'
                        : 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-md'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Mail</span>
                </a>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    copied
                      ? 'bg-green-500 border-green-500 text-white'
                      : isHacker
                        ? 'bg-black border-[#00ff41]/30 text-[#00ff41]/80 hover:text-[#00ff41] hover:border-[#00ff41]'
                        : isLight
                          ? 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="disconnected-state"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`text-xs leading-relaxed select-none ${
                isHacker ? 'text-[#00cc32]/50' : 'text-slate-500'
              }`}
            >
              Move your cursor into this card to reach out. Two hands will connect in a digital handshake to establish direct mail channels!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isHacker = theme === 'hacker';
  const [contactCoords, setContactCoords] = useState({ x: 0, y: 0 });
  const [selectedTopic, setSelectedTopic] = useState('web-app');
  const [isMounted, setIsMounted] = useState(false);
  const [activeTech, setActiveTech] = useState('all');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [activePhraseIdx, setActivePhraseIdx] = useState(0);
  const [activeProject, setActiveProject] = useState(1);
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0.3]);
  const blobParallax = useTransform(scrollY, [0, 800], [0, -120]);
  const heroLeftX = useTransform(scrollY, [0, 120, 600], [0, 0, -18]);
  const heroLeftBlur = useTransform(scrollY, [0, 200, 600], [0, 0, 3]);

  const spotlightRef = useRef(null);
  const canvasRef = useRef(null);
  const contactSpotlightRef = useRef(null);

  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const smoothAboutProgress = useSpring(aboutScrollProgress, springConfig);
  const yAboutSlow = useTransform(smoothAboutProgress, [0, 1], [100, -100]);
  const yAboutFast = useTransform(smoothAboutProgress, [0, 1], [50, -50]);

  const projectsRef = useRef(null);
  const [projectsOffset, setProjectsOffset] = useState({ start: 10000, end: 12000 });

  useEffect(() => {
    if (!isMounted) return;
    const updateOffsets = () => {
      const el = projectsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      setProjectsOffset({
        start: absoluteTop,
        end: absoluteTop + rect.height - window.innerHeight
      });
    };

    updateOffsets();
    const timeout = setTimeout(updateOffsets, 300);
    window.addEventListener('resize', updateOffsets, { passive: true });
    return () => {
      window.removeEventListener('resize', updateOffsets);
      clearTimeout(timeout);
    };
  }, [isMounted]);

  const projectsScrollProgress = useTransform(
    scrollY,
    [projectsOffset.start, projectsOffset.end],
    [0, 1],
    { clamp: true }
  );

  const snappyProjectsProgress = useSpring(projectsScrollProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
    restDelta: 0.0001
  });

  // Dynamically sync the active highlight with the scrolling top-card matching the 75% shuffle timeline
  useMotionValueEvent(snappyProjectsProgress, "change", (latest) => {
    const clamped = Math.min(1.0, Math.max(0.0, latest));
    const activeP = Math.min(1.0, clamped / 0.75);
    const activeIndex = Math.min(
      projects.length - 1,
      Math.round(activeP * (projects.length - 1))
    );
    setActiveProject(projects[activeIndex].id);
  });

  const phrases = useMemo(() => [
    "Building scalable Full Stack systems...",
    "Designing custom Deep Learning models...",
    "Architecting autonomous AI Agentic flows...",
    "Investigating next-gen computer science Research..."
  ], []);

  useEffect(() => {
    setIsMounted(true);
    const currentPhrase = phrases[activePhraseIdx];

    if (isTyping) {
      if (typedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        }, 65);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(true);
          setActivePhraseIdx((prev) => (prev + 1) % phrases.length);
        }, 400);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText, isTyping, activePhraseIdx, phrases]);

  useEffect(() => {
    if (!isMounted) return;

    // High performance cursor-spotlight follow via direct DOM style updates
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${x}%`;
        spotlightRef.current.style.top = `${y}%`;
      }
      if (contactSpotlightRef.current) {
        const rect = contactSpotlightRef.current.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        contactSpotlightRef.current.style.setProperty('--spotlight-x', `${px}px`);
        contactSpotlightRef.current.style.setProperty('--spotlight-y', `${py}px`);
      }
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });

    // High performance Canvas particle loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrame;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Create particles
    const particles = Array.from({ length: 45 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: Math.random() * 0.1 - 0.05,
      opacity: Math.random() * 0.45 + 0.15,
      color: ['cyan', 'purple', 'pink'][Math.floor(Math.random() * 3)],
      angle: Math.random() * Math.PI * 2
    }));

    // Create code lines
    const snippets = [
      '$ npm run dev',
      'const build = async () => {',
      '  return await deploy();',
      '}',
      '// Optimizing...',
      'docker-compose up -d',
      'export default App;',
      'git push origin main',
      '✓ Compiled successfully'
    ];
    const codeLines = Array.from({ length: 10 }, (_, i) => ({
      text: snippets[Math.floor(Math.random() * snippets.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.12 + 0.03
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      particles.forEach(p => {
        p.y = (p.y + p.speedY) % (height + 10);
        p.x = (p.x + p.speedX + Math.sin(Date.now() * 0.001 + p.angle) * 0.04 + width) % width;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        let colorStr = '#06b6d4';
        if (isHacker) colorStr = '#00ff41';
        else if (p.color === 'purple') colorStr = '#8b5cf6';
        else if (p.color === 'pink') colorStr = '#ec4899';

        ctx.fillStyle = colorStr;
        ctx.globalAlpha = isHacker ? p.opacity * 0.65 : isLight ? p.opacity * 0.4 : p.opacity;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = colorStr;
        ctx.fill();
      });

      // Draw code lines
      ctx.shadowBlur = 0;
      ctx.font = '11px monospace';
      ctx.fillStyle = isHacker ? '#00ff41' : isLight ? '#0e7490' : '#06b6d4';
      
      codeLines.forEach(line => {
        line.y = (line.y + line.speedY) % (height + 20);
        ctx.globalAlpha = isHacker ? line.opacity * 0.7 : isLight ? line.opacity * 0.4 : line.opacity;
        ctx.fillText(line.text, line.x, line.y);
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted, isHacker, isLight]);

  useEffect(() => {
    if (!isMounted) return;
    const handleSectionScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    handleSectionScroll();
    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, [isMounted]);

  const stats = useMemo(() => ([
    { value: "3+", label: "Years", desc: "Experience", icon: TrendingUp },
    { value: "15+", label: "Projects", desc: "Deployed", icon: Rocket },
    { value: "5K+", label: "Users", desc: "Active", icon: Star },
    { value: "500+", label: "Commits", desc: "GitHub", icon: Code2 }
  ]), []);

  const techStack = useMemo(() => ({
    frontend: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ],
    backend: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ],
    ai: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "OpenAI", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" }
    ],
    infra: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" }
    ]
  }), []);

  const projects = useMemo(() => ([
    {
      id: 1,
      title: "CV Maker AI",
      category: "SaaS • ML",
      description: "LLM-powered resume analyzer with ATS optimization engine. Processes 50+ resumes weekly with 92% accuracy rate using Gemini Pro API.",
      tech: ["Next.js 14", "Gemini API", "Stripe", "TypeScript", "Tailwind"],
      links: { live: "https://cv-maker-ai-v1.vercel.app", code: "https://github.com/ratul-notfound/cv-maker-ai" },
      icon: Brain,
      gradient: "from-purple-600 to-pink-600",
      metrics: ["500+ Users", "92% ATS Score", "ML-Powered", "15ms Response"],
      image: "/cv-maker.jpeg?w=800&q=80",
      logo: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
    },
    {
      id: 2,
      title: "Orivo Commerce",
      category: "E-Commerce",
      description: "Enterprise-grade e-commerce platform handling 10K+ concurrent users. Real-time inventory management with Redis caching and Stripe integration.",
      tech: ["Next.js 14", "Firebase", "Redux", "Stripe", "PWA"],
      links: { live: "https://orivoshop.com", code: "https://github.com/ratul-notfound/orivo" },
      icon: Globe,
      gradient: "from-orange-600 to-red-600",
      metrics: ["10K+ Users", "99.9% Uptime", "Real-time Sync", "PWA Ready"],
      image: "/orivo.jpeg?w=800&q=80",
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
    },
    {
      id: 3,
      title: "BloodNet",
      category: "Mobile • Algorithms",
      description: "Geospatial blood donor matching system using A* pathfinding algorithm. Optimizes donor-patient routes with O(log n) complexity.",
      tech: ["React Native", "Maps API", "Node.js", "MongoDB", "Socket.io"],
      links: { live: "#", code: "https://github.com/ratul-notfound/bloodnet" },
      icon: Network,
      gradient: "from-red-600 to-pink-600",
      metrics: ["1000+ Donors", "A* Algorithm", "O(log n)", "Real-time Matching"],
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
      logo: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
    },
    {
      id: 4,
      title: "Lecture AI",
      category: "NLP • Research",
      description: "Audio-to-text processing pipeline using Whisper API with GPT-4 summarization. Achieves 92% transcription accuracy for educational content.",
      tech: ["React", "Whisper API", "GPT-4", "FastAPI", "PostgreSQL"],
      links: { live: "https://lecture-ai-self.vercel.app/", code: "https://github.com/ratul-notfound/lecture-ai" },
      icon: Cpu,
      gradient: "from-blue-600 to-cyan-600",
      metrics: ["100+ Hours", "92% Accuracy", "NLP Pipeline", "Auto Summary"],
      image: "/lecture-ai.jpeg?w=800&q=80",
      logo: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png"
    }

  ]), []);

  const handleSetActiveTech = useCallback((id) => setActiveTech(id), []);
  const handleSetActiveProject = useCallback((id) => setActiveProject(id), []);
  const handleClearActiveProject = useCallback(() => setActiveProject(null), []);

  // Hover mouse tilts and spot movements have been optimized with zero-re-render compositor hooks and direct refs

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen ${isHacker ? 'bg-[#000600] text-[#00ff41]' : isLight ? 'bg-gradient-to-br from-blue-50 via-indigo-50/60 to-purple-50/50 text-slate-900' : 'bg-slate-950 text-white'} relative`}>
      <MemoNavbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 ${isHacker ? 'bg-[#000400]' : isLight ? 'bg-gradient-to-br from-blue-50 via-indigo-50/60 to-purple-50/50' : 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'}`}></div>
        <div className={`absolute top-0 -left-40 w-96 h-96 rounded-full blur-3xl ${isHacker ? 'bg-[#00ff41]/5 animate-pulse' : isLight ? 'bg-gradient-to-br from-cyan-300/25 to-blue-300/20 animate-pulse' : 'bg-cyan-500/10 animate-pulse'}`}></div>
        <div className={`absolute bottom-0 -right-40 w-96 h-96 rounded-full blur-3xl ${isHacker ? 'bg-[#00cc32]/5 animate-pulse' : isLight ? 'bg-gradient-to-tl from-purple-300/25 to-indigo-300/20 animate-pulse' : 'bg-purple-500/10 animate-pulse'}`} style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        {isLight && (
          <>
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-300/15 to-rose-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-cyan-300/15 to-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
          </>
        )}
        {isHacker && (
          <>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#00ff41]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#009926]/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
          </>
        )}
        <div className={`absolute inset-0 ${isHacker ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSw2NSwwLjA2KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" : isLight ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4wNikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"}`}></div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-50 z-0"
        />

        <div
          ref={spotlightRef}
          className={`absolute w-[500px] h-[500px] bg-gradient-radial rounded-full blur-3xl pointer-events-none transition-all duration-700 ${isHacker ? 'from-[#00ff41]/8 to-transparent' : isLight ? 'from-cyan-300/15 via-blue-200/8 to-transparent' : 'from-cyan-500/10 to-transparent'}`}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Sticky Section Label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className={`fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 section-label ${isHacker ? 'text-[#00ff41]/35' : isLight ? 'text-slate-300' : 'text-slate-600'}`}
          >
            <div className={`w-px h-14 ${isHacker ? 'bg-[#00ff41]/20' : isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />
            <span>{activeSection}</span>
            <div className={`w-px h-14 ${isHacker ? 'bg-[#00ff41]/20' : isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />
          </motion.div>
        </AnimatePresence>

        {/* Hero */}
        <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center px-2 pt-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <motion.div
                className="space-y-8"
                variants={heroReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  y: heroParallaxY,
                  opacity: heroOpacity,
                  x: heroLeftX,
                  filter: `blur(${heroLeftBlur}px)`
                }}
              >
                {/* Status badge */}
                <motion.div
                  variants={heroBadgeReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  className={`inline-flex items-center gap-3 px-5 py-2.5 backdrop-blur-xl border rounded-full text-sm transition-all duration-300 cursor-default group ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/20 hover:border-[#00ff41]/50' : isLight ? 'bg-white/70 border-slate-200 hover:border-indigo-400 shadow-sm' : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50'}`}>
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isHacker ? 'bg-[#00ff41]' : 'bg-green-400'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isHacker ? 'bg-[#00ff41]' : 'bg-green-500'}`}></span>
                  </span>
                  <span className={`font-mono text-xs md:text-sm ${isHacker ? 'text-[#00cc32]' : isLight ? 'text-slate-600' : 'text-slate-300'}`}>system.status = <span className={isHacker ? 'text-[#00ff41]' : 'text-green-400'}>&quot;available&quot;</span></span>
                  <Coffee className={`w-4 h-4 transition-colors ${isHacker ? 'text-[#00ff41]/50 group-hover:text-[#00ff41]' : isLight ? 'text-slate-400 group-hover:text-indigo-500' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                </motion.div>

                {/* Split-word stagger headline */}
                <motion.div
                  className="space-y-4"
                  variants={heroHeadlineReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.2rem] font-black leading-none tracking-tight">
                    {['Building', 'Scalable', 'Systems', 'with AI'].map((word, i) => (
                      <div key={word} className="word-reveal-wrapper block">
                        <motion.span
                          className={`block ${
                            word === 'Building' || word === 'Systems'
                              ? isHacker ? 'text-[#00ff41]/80' : isLight ? 'text-slate-800' : 'text-slate-200'
                              : word === 'Scalable'
                                ? 'animated-gradient-text'
                                : 'animated-gradient-text'
                          } ${word === 'Building' || word === 'Systems' ? 'mb-2' : ''}`}
                          initial={{ y: '110%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {word}
                        </motion.span>
                      </div>
                    ))}
                  </h1>

                  <motion.div
                    className={`flex items-center gap-2 text-lg md:text-xl font-mono h-8 ${isHacker ? 'text-[#00cc32]' : isLight ? 'text-slate-500' : 'text-slate-400'}`}
                    variants={heroLineReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    <Terminal className={`w-5 h-5 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />
                    <span className={isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}>$</span>
                    <span>{typedText}</span>
                    <span className={`w-2 h-5 animate-blink ${isHacker ? 'bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]' : isLight ? 'bg-indigo-500' : 'bg-cyan-400'}`}></span>
                  </motion.div>

                  <motion.p
                    className={`text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-600' : 'text-slate-400'}`}
                    variants={heroParaReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    Full Stack Engineer & AI Researcher specializing in <span className={`font-semibold ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-600' : 'text-cyan-400'}`}>high-performance applications</span>, <span className={`font-semibold ${isHacker ? 'text-[#33ff66]' : isLight ? 'text-purple-600' : 'text-purple-400'}`}>machine learning</span>, and <span className={`font-semibold ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-pink-600' : 'text-pink-400'}`}>scalable architecture</span>.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={heroActionsReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <a
                    href="#projects"
                    className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 overflow-hidden ${isHacker ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 hover:shadow-[0_0_25px_rgba(0,255,65,0.2)]' : isLight ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-2xl hover:shadow-indigo-500/30' : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white hover:shadow-2xl hover:shadow-cyan-500/40'}`}
                  >
                    <span className="relative z-10">Explore Projects</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </a>

                  <a
                    href="/resume.pdf"
                    download
                    className={`group inline-flex items-center gap-3 px-8 py-4 backdrop-blur-xl border rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105 ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/20 text-[#00ff41]/70 hover:border-[#00ff41] hover:text-[#00ff41]' : isLight ? 'bg-white/70 border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-white' : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 hover:border-cyan-500 text-white'}`}
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Resume</span>
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 pt-4"
                  variants={heroSocialReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {[
                    { icon: Github, href: "https://github.com/ratul-notfound", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mahmud-hasan-ratul", label: "LinkedIn" },
                    { icon: Mail, href: "mailto:m.h.ratul18@gmail.com", label: "Email" }
                  ].map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-4 backdrop-blur-xl border rounded-xl transition-all hover:scale-110 ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-indigo-400 hover:shadow-lg shadow-sm' : 'bg-slate-800/30 border-slate-700 hover:border-cyan-500'}`}
                      aria-label={social.label}
                    >
                      <social.icon className={`w-6 h-6 transition-colors ${isHacker ? 'text-[#00ff41]/50 group-hover:text-[#00ff41]' : isLight ? 'text-slate-500 group-hover:text-indigo-600' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                    </a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                variants={heroCardReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                <HoloProfileCard isLight={isLight} isHacker={isHacker} />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <StatCard stat={stat} isLight={isLight} isHacker={isHacker} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-10 md:py-16 px-2 relative overflow-hidden">
          {/* Floating orbs */}
          <div className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl orb-float ${isHacker ? 'bg-[#00ff41]/4' : isLight ? 'bg-indigo-200/20' : 'bg-cyan-500/8'}`} />
          <div className={`absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl orb-float-delay ${isHacker ? 'bg-[#00ff41]/3' : isLight ? 'bg-purple-200/20' : 'bg-purple-500/8'}`} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <SectionBadge icon={Sparkles} label="About Me" isHacker={isHacker} isLight={isLight} />
              <SectionTitleLine isHacker={isHacker} isLight={isLight} />
              <ParallaxHeading>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  <span className={`kinetic-underline ${
                    isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-600' : 'text-cyan-400'
                  }`}>Passionate Developer</span>
                </h2>
              </ParallaxHeading>
              <motion.p
                className={`text-lg md:text-xl max-w-3xl mx-auto ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Building scalable systems and leveraging AI to solve real-world problems
              </motion.p>
            </div>

            <CompetencyConsole isLight={isLight} isHacker={isHacker} />

            {/* Removed Tech Marquee Belt */}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="relative bg-transparent" style={{ height: `${projects.length * 100 + 100}vh` }}>
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-4 md:py-8 z-10">
            <div className="text-center mb-2 md:mb-4 shrink-0 pointer-events-none">
              <SectionBadge icon={Rocket} label="Case Studies" isHacker={isHacker} isLight={isLight} />
              <SectionTitleLine isHacker={isHacker} isLight={isLight} />
              <ParallaxHeading>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3">
                  <span className={`kinetic-underline ${
                    isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-600' : 'text-purple-400'
                  }`}>Featured Work</span>
                </h2>
              </ParallaxHeading>
              <p className={`text-base md:text-lg ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Real-world applications with measurable impact
              </p>
            </div>

            <div 
              className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center shrink-0"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              {projects.map((project, index) => {
                const activeIndex = projects.findIndex(p => p.id === activeProject);
                const isBehind = index > activeIndex;
                return (
                  <ShufflingProjectWrapper
                    key={project.id}
                    index={index}
                    total={projects.length}
                    progress={snappyProjectsProgress}
                  >
                    <motion.div 
                      whileHover={{ y: -8, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`group relative backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl w-full h-full ${isHacker ? 'border-[#00ff41]/20 hover:border-[#00ff41]/60' : isLight ? 'border-slate-200 shadow-xl' : 'border-slate-700 shadow-cyan-500/10'}`}
                      style={{ backgroundColor: isHacker ? "#000a02" : isLight ? "#ffffff" : "#0f172a" }}
                    >
                      {/* Decorative HUD Corner Brackets */}
                      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 opacity-30 transition-all duration-500 group-hover:scale-110" style={{ borderColor: isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee' }} />
                      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 opacity-30 transition-all duration-500 group-hover:scale-110" style={{ borderColor: isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee' }} />
                      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 opacity-30 transition-all duration-500 group-hover:scale-110" style={{ borderColor: isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee' }} />
                      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 opacity-30 transition-all duration-500 group-hover:scale-110" style={{ borderColor: isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee' }} />

                      <div className={`flex flex-col md:flex-row h-full transition-opacity duration-300 ${isBehind ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      {/* Left: Image block (1/2 width) */}
                      <div className="relative w-full md:w-[42%] h-[160px] md:h-full bg-slate-800 overflow-hidden shrink-0">
                        <div className="w-full h-full overflow-hidden flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80';
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent"></div>
                        
                        {/* Sweeping Project Laser Scanner Beam */}
                        <motion.div 
                          className="absolute left-0 right-0 h-[1.5px] z-10"
                          style={{
                            background: `linear-gradient(to right, transparent, ${isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee'}, transparent)`,
                            boxShadow: `0 0 8px ${isHacker ? '#00ff41' : isLight ? '#818cf8' : '#22d3ee'}`,
                            top: 0
                          }}
                          animate={{ top: ['0%', '98%', '0%'] }}
                          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Live Cybernetic Telemetry Coordinates */}
                        <div className="absolute bottom-3 left-4 font-mono text-[8px] opacity-75 tracking-wider text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/5 pointer-events-none select-none z-10 flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                          </span>
                          <span>{`SYS.LATENCY: 12ms // CPU.ID_${project.id} // STAT: PASS`}</span>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white shadow-lg">
                            {project.category}
                          </span>
                        </div>

                        {/* Tech Logo with spinning HUD Compass background */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-black/45 backdrop-blur-md border border-white/10 rounded-xl p-2 group-hover:scale-110 transition-all duration-500 shadow-xl flex items-center justify-center z-10">
                          <div className="absolute inset-0 border border-dashed rounded-lg opacity-25 animate-spin pointer-events-none" style={{ borderColor: isHacker ? '#00ff41' : isLight ? '#4f46e5' : '#22d3ee', animationDuration: '8s' }} />
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain relative z-10"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>

                      {/* Right: Content block (1/2 width) */}
                      <div className="w-full md:w-[58%] p-5 md:p-7 flex flex-col justify-between overflow-hidden relative z-10">
                        {/* Interactive circuit grid lines background */}
                        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none z-0 overflow-hidden select-none" style={{ color: isHacker ? '#00ff41' : isLight ? '#6366f1' : '#22d3ee' }}>
                          <svg className="w-full h-full text-current" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
                            <path d="M10,20 L30,20 L40,30 L70,30 L80,40" />
                            <path d="M20,80 L40,80 L50,70 L80,70" strokeDasharray="2 2" />
                            <circle cx="10" cy="20" r="1.5" fill="currentColor" />
                            <circle cx="80" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="20" cy="80" r="1.5" fill="currentColor" />
                            <circle cx="80" cy="70" r="1.5" fill="currentColor" />
                          </svg>
                        </div>

                        <div className="space-y-3.5 relative z-10">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className={`text-xl md:text-3xl font-black transition-colors leading-tight ${isHacker ? 'text-[#00ff41] group-hover:drop-shadow-[0_0_6px_rgba(0,255,65,0.4)]' : isLight ? 'text-slate-800 group-hover:text-indigo-600' : 'text-white group-hover:text-cyan-300'}`}>
                              <span className="font-mono text-xs md:text-sm mr-2 opacity-50 font-bold block sm:inline">[0{project.id}] //</span>
                              {project.title}
                            </h3>
                            
                            {/* Project External Links & Registry ID */}
                            <div className="flex items-center gap-2 shrink-0 relative z-20">
                              <span className="font-mono text-[8px] opacity-25 uppercase tracking-widest hidden lg:inline">
                                REG_ID: 0x9F{project.id}
                              </span>

                              <div className="flex gap-1.5">
                                {project.links.code && (
                                  <a
                                    href={project.links.code}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 border rounded-xl transition-all hover:scale-105 ${isHacker ? 'bg-black border-[#00ff41]/20 hover:border-[#00ff41]' : isLight ? 'bg-slate-50 border-slate-200 hover:border-indigo-400' : 'bg-slate-800/80 border-slate-700 hover:border-cyan-500'}`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Github className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-650' : 'text-white'}`} />
                                  </a>
                                )}
                                {project.links.live && project.links.live !== '#' && (
                                  <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl transition-all hover:scale-105 shadow-md shadow-cyan-500/20"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="w-4 h-4 text-white" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className={`text-xs md:text-sm leading-relaxed ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-650' : 'text-slate-350'}`}>
                            {project.description}
                          </p>

                          {/* Metrics Grid with active pulsing indicator */}
                          <div className="grid grid-cols-2 gap-2.5">
                            {project.metrics.map((metric, j) => (
                              <div
                                key={j}
                                className={`relative group/metric py-1.5 px-3 backdrop-blur-sm border rounded-xl text-center transition-all hover:scale-105 cursor-default overflow-hidden ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/10 hover:border-[#00ff41]/30' : isLight ? 'bg-indigo-50/50 border-indigo-200 hover:border-indigo-400 shadow-sm' : 'bg-slate-800/30 border-slate-700 hover:border-cyan-500/50'}`}
                              >
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover/metric:opacity-10 transition-opacity`}></div>
                                <div className="relative flex items-center justify-center gap-1.5">
                                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 animate-duration-1000" style={{ backgroundColor: isHacker ? '#00ff41' : isLight ? '#6366f1' : '#22d3ee' }} />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: isHacker ? '#00ff41' : isLight ? '#6366f1' : '#22d3ee' }} />
                                  </span>
                                  <span className={`text-[10px] sm:text-xs font-bold leading-none ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-650' : 'text-cyan-400'}`}>{metric}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-slate-800/20">
                          {/* Tech list wrapped inside compilation brackets */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, j) => (
                              <span
                                key={j}
                                className={`px-2 py-0.5 border rounded-lg text-[9px] md:text-[10px] font-mono font-black transition-all ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00ff41]/75 hover:border-[#00ff41]/35' : isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-650 hover:border-indigo-300' : 'bg-[#0d1527]/60 border-slate-800 text-slate-400 hover:border-cyan-500/40'}`}
                              >
                                [{tech}]
                              </span>
                            ))}
                          </div>

                          <div className={`flex items-center gap-2 text-xs font-black transition-all duration-300 ${activeProject === project.id ? 'text-cyan-400 translate-x-2' : 'text-transparent'}`}>
                            <span>Explore Case Study</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform transition-transform duration-500 ${activeProject === project.id ? 'scale-x-100' : 'scale-x-0'}`}></div>
                  </motion.div>
                </ShufflingProjectWrapper>
                );
              })}
            </div>

            <div className="pb-4 w-full max-w-md px-6 shrink-0 z-50 pointer-events-none mt-6 md:mt-10">
              <div className="flex justify-between text-[10px] uppercase font-mono tracking-widest mb-2 text-slate-400">
                <span>Start</span>
                <span>End</span>
              </div>
              <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${isHacker ? 'bg-[#00ff41]' : isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`}
                  style={{ scaleX: snappyProjectsProgress, transformOrigin: "left" }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex justify-center pb-20 relative z-20">
          <a
            href="https://github.com/ratul-notfound"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-3 px-8 py-4 backdrop-blur-xl border rounded-2xl font-semibold transition-all hover:scale-105 hover:shadow-xl ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 text-[#00ff41]/70 hover:border-[#00ff41] hover:text-[#00ff41]' : isLight ? 'bg-white/70 border-slate-200 text-slate-700 hover:border-indigo-400 hover:shadow-indigo-200/50' : 'bg-slate-900/50 hover:bg-slate-800 border-slate-800 hover:border-cyan-500'}`}
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-10 md:py-16 px-2 relative overflow-hidden">
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[80px] orb-float-delay ${isHacker ? 'bg-[#00ff41]/4' : isLight ? 'bg-indigo-200/20' : 'bg-cyan-500/6'}`} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-8 md:mb-10">
              <SectionBadge icon={Zap} label="Tech Stack" isHacker={isHacker} isLight={isLight} />
              <SectionTitleLine isHacker={isHacker} isLight={isLight} />
              <ParallaxHeading>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
                  <span className={`kinetic-underline ${
                    isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-600' : 'text-cyan-400'
                  }`}>Technologies</span>
                </h2>
              </ParallaxHeading>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Modern tools and frameworks I use to craft exceptional digital experiences
              </p>
            </div>

            <div className="flex justify-center mb-12 md:mb-16">
              <div className={`inline-flex flex-wrap items-center gap-2 md:gap-3 p-2 backdrop-blur-2xl border rounded-2xl shadow-2xl ${isHacker ? 'bg-[#000a02]/90 border-[#00ff41]/15' : isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                {[
                  { id: 'all', label: 'All', icon: Star },
                  { id: 'frontend', label: 'Frontend', icon: Code2 },
                  { id: 'backend', label: 'Backend', icon: Server },
                  { id: 'ai', label: 'AI/ML', icon: Brain },
                  { id: 'infra', label: 'DevOps', icon: Globe }
                ].map(tech => (
                  <button
                    key={tech.id}
                    onClick={() => handleSetActiveTech(tech.id)}
                    className={`group relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 ${activeTech === tech.id
                      ? isHacker ? 'bg-[#00ff41]/15 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.15)]' : isLight ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                      : isHacker ? 'text-[#00cc32]/50 hover:text-[#00ff41] hover:bg-[#00ff41]/5' : isLight ? 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                  >
                    <tech.icon className="w-4 h-4" />
                    <span>{tech.label}</span>

                    {activeTech === tech.id && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(techStack).map(([category, skills]) => (
                (activeTech === 'all' || activeTech === category) && (
                  <div
                    key={category}
                    className="group relative animate-slide-up"
                  >
                    <div className="relative overflow-hidden mb-6">
                      <div className={`flex items-center gap-4 p-6 bg-gradient-to-r backdrop-blur-xl border rounded-2xl ${isHacker ? 'from-[#000a02]/80 to-[#000a02]/40 border-[#00ff41]/15' : isLight ? 'from-white/80 to-white/40 border-slate-200 shadow-sm' : 'from-slate-900/80 to-slate-900/40 border-slate-800'}`}>
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${isHacker ? 'via-[#00ff41]' : isLight ? 'via-indigo-400' : 'via-cyan-500'} to-transparent`}></div>

                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                          <div className={`relative w-14 h-14 border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${isHacker ? 'bg-[#000a02] border-[#00ff41]/20' : isLight ? 'bg-white border-slate-200 shadow' : 'bg-slate-900 border-slate-700'}`}>
                            {category === 'frontend' && <Code2 className={`w-7 h-7 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />}
                            {category === 'backend' && <Server className={`w-7 h-7 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-500' : 'text-purple-400'}`} />}
                            {category === 'ai' && <Brain className={`w-7 h-7 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-pink-500' : 'text-pink-400'}`} />}
                            {category === 'infra' && <Globe className={`w-7 h-7 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className={`text-2xl md:text-3xl font-black capitalize mb-1 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-white'}`}>
                            {category === 'ai' ? 'AI & Machine Learning' : category === 'infra' ? 'DevOps & Infrastructure' : category}
                          </h3>
                          <p className={`text-sm font-mono ${isHacker ? 'text-[#00cc32]/50' : isLight ? 'text-slate-400' : 'text-slate-400'}`}>
                            {skills.length} Technologies
                          </p>
                        </div>

                        <div className="hidden md:block">
                          <div className={`w-20 h-1 rounded-full bg-gradient-to-r ${isHacker ? 'from-[#00ff41]/50 to-[#00ff41]/10' : isLight ? 'from-indigo-400/50 to-purple-400/50' : 'from-cyan-500/50 to-purple-500/50'}`}></div>
                        </div>
                      </div>
                    </div>

                    <TechGrid skills={skills} isHacker={isHacker} isLight={isLight} />
                  </div>
                )
              ))}
            </div>

            <div className="text-center mt-16">
              <div className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-xl border rounded-full text-sm ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 text-[#00cc32]/60' : isLight ? 'bg-white/70 border-slate-200 text-slate-500' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
                <Sparkles className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-400' : 'text-cyan-400'}`} />
                <span>Always learning and exploring new technologies</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              ref={contactSpotlightRef}
              className={`relative p-6 md:p-10 backdrop-blur-2xl border rounded-2xl overflow-hidden spotlight-card-v2 animated-border-card group transition-all duration-500 ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 hover:border-[#00ff41]/40 hover:shadow-[0_0_30px_rgba(0,255,65,0.06)]' : isLight ? 'bg-white/80 border-slate-200 hover:border-indigo-400 shadow-xl hover:shadow-2xl' : 'bg-gradient-to-br from-slate-900/80 to-slate-900/50 border-slate-800 hover:border-cyan-500/50'}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.round(e.clientX - rect.left);
                const y = Math.round(e.clientY - rect.top);
                e.currentTarget.style.setProperty('--mx', `${x}px`);
                e.currentTarget.style.setProperty('--my', `${y}px`);
                setContactCoords({ x, y });
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Creative Interactive Spotlight Grid */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
                style={{
                  backgroundImage: isHacker
                    ? `radial-gradient(circle 140px at var(--mx, 50%) var(--my, 50%), rgba(0, 255, 65, 0.15), transparent 80%), 
                       linear-gradient(to right, rgba(0, 255, 65, 0.05) 1px, transparent 1px), 
                       linear-gradient(to bottom, rgba(0, 255, 65, 0.05) 1px, transparent 1px)`
                    : `radial-gradient(circle 160px at var(--mx, 50%) var(--my, 50%), ${isLight ? 'rgba(99, 102, 241, 0.18)' : 'rgba(34, 211, 238, 0.15)'}, transparent 80%), 
                       linear-gradient(to right, ${isLight ? 'rgba(99, 102, 241, 0.06)' : 'rgba(255, 255, 255, 0.04)'} 1px, transparent 1px), 
                       linear-gradient(to bottom, ${isLight ? 'rgba(99, 102, 241, 0.06)' : 'rgba(255, 255, 255, 0.04)'} 1px, transparent 1px)`,
                  backgroundSize: '100% 100%, 30px 30px, 30px 30px'
                }}
              />

              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ${isHacker ? 'bg-[#00ff41]/5' : isLight ? 'bg-indigo-300/20' : 'bg-cyan-500/10'}`}></div>
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ${isHacker ? 'bg-[#00ff41]/3' : isLight ? 'bg-purple-300/20' : 'bg-purple-500/10'}`}></div>

              <div className="relative z-10 text-center space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    <InteractiveText text="Let's Build Something" isHacker={isHacker} isLight={isLight} />
                    <br className="my-1" />
                    <InteractiveText text="Amazing Together" isHacker={isHacker} isLight={isLight} className={isHacker ? 'text-[#00ff41]/80' : isLight ? 'text-slate-800' : 'text-white'} />
                  </h2>
                  <p className={`text-xs md:text-sm max-w-md mx-auto leading-relaxed ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Bring the hands together in a digital handshake to establish a direct connection and reveal my contact details!
                  </p>
                </div>

                <HandshakeConnector 
                  isHacker={isHacker} 
                  isLight={isLight} 
                />

                <div className="flex justify-center gap-3 pt-4">
                  {[
                    { icon: Github, href: "https://github.com/ratul-notfound", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mahmud-hasan-ratul", label: "LinkedIn" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/social p-3.5 backdrop-blur-xl border rounded-xl transition-all hover:scale-110 ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-lg' : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 hover:border-cyan-500'}`}
                      aria-label={social.label}
                    >
                      <social.icon className={`w-5 h-5 transition-colors ${isHacker ? 'text-[#00ff41]/50 group-hover/social:text-[#00ff41]' : isLight ? 'text-slate-500 group-hover/social:text-indigo-600' : 'text-slate-400 group-hover/social:text-cyan-400'}`} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MemoFooter />
    </div>
  );
};

export default Portfolio;