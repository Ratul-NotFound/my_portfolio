'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, Download, 
  Terminal, Database, Cpu, Globe, ArrowRight, MapPin, 
  Code2, Sparkles, LayoutTemplate, Smartphone, ChevronRight
} from 'lucide-react';

// --- Utility Components for Animations ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, type: "spring", stiffness: 50 }}
    className={className}
  >
    {children}
  </motion.div>
);

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-slate-800 bg-slate-950/50 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Main Component ---

const Portfolio = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Products Built", value: "15+" },
    { label: "Tech Deep Dives", value: "20+" },
  ];

  const techStack = {
    frontend: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "Firebase", "Supabase", "PostgreSQL"],
    ai: ["OpenAI API", "Google Gemini", "LangChain", "TensorFlow", "RAG Pipelines"],
    tools: ["Docker", "Git", "Vercel", "Linux", "Figma"]
  };

  const projects = [
    {
      title: "CV Maker AI",
      category: "SaaS Application | ML-Powered",
      description: "LLM-driven resume analyzer & generator using Google Gemini. Implements semantic text analysis & ATS optimization algorithms. 500+ users, 50+ resumes generated weekly.",
      tech: ["Next.js 14", "Gemini API", "PDF-lib", "Stripe", "TypeScript"],
      links: {
        live: "https://cv-maker-ai-three.vercel.app/",
        code: "https://github.com/ratul-notfound/cv-maker-ai"
      },
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      color: "purple"
    },
    {
      title: "Orivo Commerce",
      category: "Production E-Commerce | Architecture",
      description: "Enterprise-scale platform with real-time inventory sync, serverless payment pipeline, & Redis-optimized analytics. Handles 10k+ concurrent users.",
      tech: ["Next.js 14", "Firebase", "Redux", "Vercel", "Shadcn UI"],
      links: {
        live: "https://orivoshop.com", 
        code: "https://github.com/ratul-notfound/orivo"
      },
      icon: <LayoutTemplate className="w-6 h-6 text-orange-400" />,
      color: "orange"
    },
    {
      title: "BloodNet",
      category: "Mobile Development | Algorithms",
      description: "Geospatial matching system connecting 1000+ donors with hospitals. Custom A* pathfinding & proximity-based algorithms. O(n log n) donor matching.",
      tech: ["React Native", "Maps API", "Node.js", "MongoDB", "Firebase"],
      links: {
        live: "#",
        code: "https://github.com/ratul-notfound/bloodnet"
      },
      icon: <Smartphone className="w-6 h-6 text-red-500" />,
      color: "red"
    },
    {
      title: "Lecture AI",
      category: "NLP Pipeline | Research",
      description: "End-to-end audio processing: Whisper transcription → GPT summarization → Spaced repetition algorithm. Processes 100+ hours with 92% accuracy.",
      tech: ["React", "Whisper API", "OpenAI GPT-4", "Python", "FastAPI"],
      links: {
        live: "https://lecture-ai-self.vercel.app/",
        code: "https://github.com/ratul-notfound/lecture-ai"
      },
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      color: "blue"
    },
    {
      title: "DIU CPC HUB",
      category: "EdTech | Competitive Programming",
      description: "Adaptive learning platform with 200+ DSA problems, difficulty categorization algorithms. Hosts 1000+ active learners preparing for ACM-ICPC.",
      tech: ["Next.js", "JavaScript", "CSS3", "Problem Database"],
      links: {
        live: "https://diu-cpc-hub.vercel.app/",
        code: "https://github.com/Ratul-NotFound/DIU-CPC-HUB"
      },
      icon: <Terminal className="w-6 h-6 text-green-400" />,
      color: "green"
    }
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-slate-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,#0f172a_100%)]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-24 md:pb-32 relative z-10">
        
        {/* --- Hero Section --- */}
        <section id="about" className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-32 md:mb-48 min-h-[80vh] justify-center">
          <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
            
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-green-400 text-xs md:text-sm font-mono backdrop-blur-md hover:border-green-500/30 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>System.status === 'open_to_work'</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black text-slate-100 tracking-tight leading-[1.1] mt-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500">Architecting</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Digital Intelligence</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                <strong className="text-slate-100 font-semibold">Mahmud Hasan Ratul</strong> — Full Stack Engineer & AI Researcher. 
                I bridge the gap between <span className="text-indigo-300">complex algorithms</span> and <span className="text-purple-300">intuitive user experiences</span>.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-8">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 bg-slate-100 text-slate-950 rounded-xl font-bold text-base transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    View Case Studies <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-slate-900/50 border border-slate-700/50 text-slate-300 rounded-xl font-semibold hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <Download size={18} className="group-hover:text-indigo-400 transition-colors" /> Download CV
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="pt-8 flex items-center gap-6 justify-center lg:justify-start text-slate-500">
                <a href="https://github.com/ratul-notfound" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={24} /></a>
                <a href="https://linkedin.com/in/mahmud-hasan-ratul" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
                <a href="mailto:m.h.ratul18@gmail.com" className="hover:text-white transition-colors"><Mail size={24} /></a>
              </div>
            </FadeIn>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 lg:flex-shrink-0 relative group"
          >
            <div className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-800 shadow-2xl shadow-indigo-500/20 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full animate-spin-slow pointer-events-none"></div>
              <img 
                src="/profile.jpg" 
                alt="Mahmud Hasan Ratul"
                className="w-full h-full object-cover rounded-full border-4 border-slate-950 relative z-10"
                onError={(e) => {
                   e.target.onerror = null; 
                   e.target.src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80";
                }}
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 -left-4 md:bottom-10 md:-left-10 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Code2 size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono">Current Focus</p>
                    <p className="text-sm font-bold text-slate-100">Generative AI</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* --- Stats Section --- */}
        <section className="mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y border-slate-800/50 py-8 bg-slate-950/30 backdrop-blur-sm">
             {[...stats, {label: "Commits", value: "2k+"}].map((stat, i) => (
               <FadeIn key={i} delay={i * 0.1} className="text-center group cursor-default">
                 <h3 className="text-3xl md:text-4xl font-black text-slate-100 group-hover:text-indigo-400 transition-colors duration-300">{stat.value}</h3>
                 <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
               </FadeIn>
             ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="mb-32 md:mb-48 scroll-mt-32">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-100 mb-4 tracking-tight">
                Selected Work
              </h2>
              <p className="text-slate-400 text-lg max-w-xl">
                A collection of research-driven applications focusing on scalability, performance, and AI integration.
              </p>
            </div>
            <a href="https://github.com/ratul-notfound?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 group">
              View Github Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard className="h-full group">
                  <div className="p-8 h-full flex flex-col relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-3 rounded-xl bg-${project.color}-500/10 text-${project.color}-400 ring-1 ring-${project.color}-500/20`}>
                        {project.icon}
                      </div>
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        {project.links.code && (
                          <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <Github size={20} />
                          </a>
                        )}
                        {project.links.live && project.links.live !== '#' && (
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{project.category}</span>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="mb-32 md:mb-48 scroll-mt-24">
          <FadeIn className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">
              Technical Arsenal
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <FadeIn delay={0.1} className="md:col-span-2">
              <SpotlightCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-cyan-400" />
                  <h3 className="text-xl font-bold text-slate-100 font-mono">Frontend Engineering</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.frontend.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Backend */}
            <FadeIn delay={0.2}>
              <SpotlightCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="text-indigo-400" />
                  <h3 className="text-xl font-bold text-slate-100 font-mono">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.backend.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* AI/ML */}
            <FadeIn delay={0.3} className="md:col-span-2 md:order-last">
               <SpotlightCard className="p-8 h-full bg-gradient-to-br from-slate-950 to-purple-950/20">
                <div className="flex items-center gap-3 mb-6">
                  <Cpu className="text-purple-400" />
                  <h3 className="text-xl font-bold text-slate-100 font-mono">AI / ML & Research</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <p className="text-purple-300 text-xs font-bold mb-2 uppercase">Generative AI</p>
                    <p className="text-slate-400 text-sm">RAG, LangChain, Prompt Engineering, LLM Fine-tuning</p>
                  </div>
                   <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <p className="text-purple-300 text-xs font-bold mb-2 uppercase">Core ML</p>
                    <p className="text-slate-400 text-sm">TensorFlow, PyTorch, Data Pipelines, NLP</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.ai.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-purple-950/30 border border-purple-500/20 text-purple-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </FadeIn>

             {/* Tools */}
             <FadeIn delay={0.4}>
              <SpotlightCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="text-emerald-400" />
                  <h3 className="text-xl font-bold text-slate-100 font-mono">DevOps & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </FadeIn>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="max-w-4xl mx-auto py-20 md:py-32">
          <SpotlightCard className="p-8 md:p-16 text-center bg-gradient-to-b from-slate-900/50 to-slate-950">
            <FadeIn>
              <div className="inline-block p-3 rounded-full bg-slate-900 border border-slate-800 mb-8 text-indigo-400">
                <Mail size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-6">
                Let's Build the Future.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                Whether you have a complex ML problem or need a scalable web architecture, I'm ready to collaborate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:m.h.ratul18@gmail.com" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-1">
                  Start a Conversation
                </a>
                <a href="https://linkedin.com/in/mahmud-hasan-ratul" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-lg transition-all border border-slate-700">
                  Connect on LinkedIn
                </a>
              </div>
            </FadeIn>
          </SpotlightCard>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;