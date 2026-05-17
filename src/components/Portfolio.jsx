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
  Circle, ChevronRight, ChevronDown, Hand
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
function StatCard({ stat, isLight, isHacker }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const displayed = useCountUp(stat.value, 1600, inView);
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative p-6 md:p-8 backdrop-blur-xl border rounded-2xl cursor-default overflow-hidden card-glow-hover ${
        isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/10'
        : isLight ? 'bg-white/70 border-slate-200 shadow-sm'
        : 'bg-slate-900/50 border-slate-800'}`}
    >
      <div className="relative z-10">
        <motion.div whileHover={{ rotate: 12, scale: 1.2 }} transition={{ type: 'spring', stiffness: 400 }}>
          <stat.icon className={`w-8 h-8 md:w-10 md:h-10 mb-4 ${
            isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />
        </motion.div>
        <div className="stat-number text-3xl md:text-4xl font-black mb-2">{displayed || stat.value}</div>
        <div className={`text-sm md:text-base font-semibold mb-1 ${
          isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-700' : 'text-slate-300'}`}>{stat.label}</div>
        <div className={`text-xs ${
          isHacker ? 'text-[#00ff41]/30' : isLight ? 'text-slate-400' : 'text-slate-500'}`}>{stat.desc}</div>
      </div>
      {/* corner accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
        isHacker ? 'from-[#00ff41]/0 via-[#00ff41]/50 to-[#00ff41]/0'
        : 'from-transparent via-cyan-500/60 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
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

  const fullText = "Building scalable systems with precision...";

  useEffect(() => {
    setIsMounted(true);

    // Typing effect
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length) {
      const timeout1 = setTimeout(() => {
        setIsTyping(false);
        const timeout2 = setTimeout(() => {
          setTypedText('');
          setIsTyping(true);
        }, 2000);
        return () => clearTimeout(timeout2);
      }, 2000);
      return () => clearTimeout(timeout1);
    }
  }, [typedText, isTyping, fullText.length]);

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
    { value: "10K+", label: "Users", desc: "Active", icon: Star },
    { value: "2K+", label: "Commits", desc: "GitHub", icon: Code2 }
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
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none">
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
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className={`absolute inset-0 rounded-3xl blur-3xl ${isHacker ? 'bg-[#00ff41]/10' : isLight ? 'bg-gradient-to-r from-indigo-300/30 via-purple-300/20 to-pink-300/20' : 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20'}`}></div>
                  <div className={`relative backdrop-blur-2xl border rounded-3xl p-8 space-y-6 transition-all duration-500 ${isHacker ? 'bg-[#000a02]/90 border-[#00ff41]/15 hover:border-[#00ff41]/40 hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]' : isLight ? 'bg-white/80 border-slate-200 hover:border-indigo-400 shadow-xl hover:shadow-2xl' : 'bg-slate-900/90 border-slate-700 hover:border-cyan-500/50'}`}>
                    <motion.div
                      className={`relative aspect-square rounded-2xl overflow-hidden border-4 group shadow-xl transition-shadow duration-500 ${isHacker ? 'border-[#00ff41]/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]' : isLight ? 'border-slate-200 hover:shadow-indigo-300/30' : 'border-slate-700 hover:shadow-cyan-500/30'}`}
                      variants={heroImageReveal}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-80px' }}
                    >
                      <img
                        src="/profile.jpg"
                        alt="Mahmud Hasan Ratul"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/profile.jpg";
                        }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${isHacker ? 'from-[#000600]' : isLight ? 'from-white' : 'from-slate-900'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </motion.div>

                    <div className="space-y-4">
                      <div>
                        <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-white'}`}>Mahmud Hasan Ratul</h3>
                        <p className={`flex items-center gap-2 text-sm md:text-base ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <MapPin className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />
                          Dhaka, Bangladesh • GMT+6
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {['Full Stack', 'AI/ML', 'DevOps', 'System Design'].map((tag, i) => (
                          <span
                            key={tag}
                            className={`px-4 py-2 backdrop-blur-xl border rounded-lg text-sm transition-all cursor-default hover:scale-105 ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00cc32]/70 hover:border-[#00ff41]/40 hover:text-[#00ff41]' : isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:border-indigo-400' : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-300'}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Circle className={`w-2 h-2 ${isHacker ? 'fill-[#00ff41] text-[#00ff41]' : 'fill-green-500 text-green-500'}`} />
                          <span className={`text-xs ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Coffee className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]/40' : isLight ? 'text-slate-400' : 'text-slate-400'}`} />
                          <span className={`text-xs ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>Fueled by coffee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

            <motion.div
              className="grid md:grid-cols-3 gap-3 md:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                {
                  icon: Code2,
                  title: "Full Stack Development",
                  desc: "Expert in modern web technologies, building responsive and performant applications from frontend to backend with focus on scalability.",
                  skills: ["React", "Next.js", "Node.js", "TypeScript"]
                },
                {
                  icon: Brain,
                  title: "AI & Machine Learning",
                  desc: "Integrating cutting-edge AI models and ML algorithms to create intelligent, data-driven solutions that automate and optimize workflows.",
                  skills: ["GPT-4", "TensorFlow", "LangChain", "NLP"]
                },
                {
                  icon: Server,
                  title: "Cloud Architecture",
                  desc: "Designing and deploying robust cloud infrastructure with focus on performance, reliability, and cost-effectiveness at scale.",
                  skills: ["AWS", "Docker", "Kubernetes", "CI/CD"]
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className={`group relative p-8 backdrop-blur-xl border rounded-2xl overflow-hidden card-glow-hover ${
                    isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/10'
                    : isLight ? 'bg-white/70 border-slate-200 shadow-sm'
                    : 'bg-slate-900/50 border-slate-800'}`}
                >
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        isHacker ? 'bg-[#00ff41]/10' : isLight ? 'bg-gradient-to-br from-indigo-100 to-purple-100' : 'bg-gradient-to-br from-cyan-500/20 to-purple-600/10'
                      }`}
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <item.icon className={`w-8 h-8 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />
                    </motion.div>
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 kinetic-underline ${
                      isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-800 group-hover:text-indigo-600' : 'text-white group-hover:text-cyan-300'
                    }`}>{item.title}</h3>
                    <p className={`mb-6 leading-relaxed ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, j) => (
                        <motion.span
                          key={j}
                          whileHover={{ scale: 1.08 }}
                          className={`px-3 py-1 border rounded-lg text-xs transition-colors ${
                            isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00cc32]/60 hover:border-[#00ff41]/40 hover:text-[#00ff41]'
                            : isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-500 hover:border-indigo-400'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300'
                          }`}
                        >{skill}</motion.span>
                      ))}
                    </div>
                  </div>
                  {/* bottom accent bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    isHacker ? 'bg-[#00ff41]/50' : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                  }`} />
                </motion.div>
              ))}
            </motion.div>

            {/* ── Tech Marquee Belt ── */}
            <div className="py-8 overflow-hidden">
              {[
                ['Next.js','React','TypeScript','Node.js','Python','TensorFlow','Docker','AWS','MongoDB','PostgreSQL','Redis','GraphQL','FastAPI','Kubernetes','PyTorch','OpenAI'],
                ['System Design','CI/CD','Microservices','REST APIs','WebSockets','Redis Cache','JWT Auth','OAuth2','Stripe','Firebase','Vercel','Nginx','Linux','Git','LangChain','Whisper']
              ].map((row, ri) => (
                <div key={ri} className="ticker-container mb-3">
                  <div className={`marquee-track ${ri === 0 ? 'marquee-track--left' : 'marquee-track--right'}`}>
                    {[...row, ...row].map((tech, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-2 mx-3 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors cursor-default ${
                          isHacker
                            ? 'bg-[#000a02]/80 border-[#00ff41]/15 text-[#00cc32]/70 hover:text-[#00ff41] hover:border-[#00ff41]/40'
                            : isLight
                              ? 'bg-white/80 border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 shadow-sm'
                              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isHacker ? 'bg-[#00ff41]' : ri === 0 ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white shadow-lg">
                            {project.category}
                          </span>

                        </div>

                        {/* Tech Logo */}
                        <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1.5 group-hover:scale-105 transition-all duration-500 shadow-xl">
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>

                      {/* Right: Content block (1/2 width) */}
                      <div className="w-full md:w-[58%] p-5 md:p-7 flex flex-col justify-between overflow-hidden">
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className={`text-xl md:text-3xl font-black transition-colors leading-tight ${isHacker ? 'text-[#00ff41] group-hover:drop-shadow-[0_0_6px_rgba(0,255,65,0.4)]' : isLight ? 'text-slate-800 group-hover:text-indigo-600' : 'text-white group-hover:text-cyan-300'}`}>
                              {project.title}
                            </h3>
                            
                            {/* Project External Links */}
                            <div className="flex gap-1.5 shrink-0 relative z-20">
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
                          
                          <p className={`text-xs md:text-sm leading-relaxed ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-600' : 'text-slate-350'}`}>
                            {project.description}
                          </p>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-2 gap-2.5">
                            {project.metrics.map((metric, j) => (
                              <div
                                key={j}
                                className={`relative group/metric py-1.5 px-3 backdrop-blur-sm border rounded-xl text-center transition-all hover:scale-105 cursor-default overflow-hidden ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/10 hover:border-[#00ff41]/30' : isLight ? 'bg-indigo-50/50 border-indigo-200 hover:border-indigo-400 shadow-sm' : 'bg-slate-800/30 border-slate-700 hover:border-cyan-500/50'}`}
                              >
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover/metric:opacity-10 transition-opacity`}></div>
                                <span className={`relative text-xs font-bold ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-600' : 'text-cyan-400'}`}>{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-slate-800/20">
                          {/* Tech list */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, j) => (
                              <span
                                key={j}
                                className={`px-2.5 py-1 border rounded-lg text-[10px] font-semibold transition-all ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00ff41]/75 hover:border-[#00ff41]/35' : isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-650 hover:border-indigo-300' : 'bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border-slate-700 text-slate-300 hover:border-cyan-500/40'}`}
                              >
                                {tech}
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