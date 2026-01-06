'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  Github, Linkedin, Mail, ExternalLink, Download, 
  Terminal, Database, Cpu, Globe, ArrowRight, MapPin, 
  Code2, Sparkles, LayoutTemplate, Smartphone
} from 'lucide-react';

const Portfolio = () => {
  const [isMounted, setIsMounted] = useState(false);

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
    ai: ["OpenAI API", "Google Gemini", "LangChain", "TensorFlow"],
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
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      color: "blue"
    }
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-emerald-900/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-24 md:pb-32 relative z-10">
        <div className="absolute top-32 left-0 text-indigo-500/10 text-sm md:text-base font-mono whitespace-pre pointer-events-none hidden lg:block overflow-hidden">
          <div className="animate-pulse">
            {'// Research-driven full-stack engineering\nconst expertise = {\n  ML: ["LLMs", "NLP", "optimization"],\n  backend: ["architecture", "databases", "APIs"],\n  impact: "solving complex problems at scale"\n}'}
          </div>
        </div>

        <section id="about" className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 mb-28 md:mb-40">
          <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-green-950/50 to-emerald-950/40 border border-green-500/40 text-green-300 text-xs md:text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <code className="text-green-300">system.status === 'open_to_collaborate'</code>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-slate-100 tracking-tight leading-tight mt-8">
              <span className="text-green-400 font-mono text-xs md:text-sm block mb-4 font-bold tracking-wider">{'> npm run impact'}</span>
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">digital products</span> <br className="hidden sm:block" />
              that <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">scale globally</span>
            </h1>

            <p className="text-base sm:text-lg md:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-mono mt-8 space-y-3">
              <div><span className="text-cyan-400">{'$'} </span><strong className="text-cyan-200 font-semibold">Mahmud Hasan Ratul</strong> — Full Stack Engineer & AI/ML Researcher</div>
              <div><span className="text-cyan-400">{'$'} </span>Expertise: <span className="text-yellow-300">Scalable Systems</span> • <span className="text-purple-300">AI/ML</span> • <span className="text-blue-300">Optimization</span></div>
              <div><span className="text-cyan-400">{'$'} </span><span className="text-green-300">3+ years</span> building production systems • <span className="text-rose-300">15+ shipped</span> projects</div>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 justify-center lg:justify-start mt-9">
              <button 
                onClick={() => scrollTo('projects')}
                className="group px-8 md:px-10 py-3.5 md:py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white rounded-xl font-bold text-sm md:text-base hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-500 transition-all duration-300 flex items-center gap-2.5 w-full sm:w-auto justify-center shadow-xl shadow-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/60 hover:-translate-y-1 active:translate-y-0"
              >
                <code className="text-green-300 font-mono">{'<'}</code> Explore Projects <code className="text-green-300 font-mono">{'/>'}</code> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 md:px-10 py-3.5 md:py-4 bg-slate-900 border border-slate-700/60 text-slate-200 rounded-xl font-semibold hover:bg-slate-800 hover:border-indigo-500/70 transition-all duration-300 flex items-center gap-2.5 w-full sm:w-auto justify-center text-sm md:text-base hover:text-indigo-300 hover:-translate-y-1 active:translate-y-0"
              >
                <Download size={18} /> Download CV
              </a>
            </div>

            <div className="pt-8 md:pt-9 flex items-center gap-6 md:gap-8 justify-center lg:justify-start text-slate-500">
              <a href="https://github.com/ratul-notfound" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors duration-300 p-2 hover:bg-slate-800/50 rounded-lg" aria-label="GitHub"><Github size={22} className="md:w-6 md:h-6" /></a>
              <a href="https://linkedin.com/in/mahmud-hasan-ratul" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors duration-300 p-2 hover:bg-slate-800/50 rounded-lg" aria-label="LinkedIn"><Linkedin size={22} className="md:w-6 md:h-6" /></a>
              <a href="mailto:m.h.ratul18@gmail.com" className="hover:text-indigo-300 transition-colors duration-300 p-2 hover:bg-slate-800/50 rounded-lg" aria-label="Email"><Mail size={22} className="md:w-6 md:h-6" /></a>
            </div>
          </div>

          <div className="flex-1 lg:flex-shrink-0 lg:max-w-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/80 rounded-3xl overflow-hidden border border-slate-800/50 backdrop-blur aspect-square lg:aspect-auto lg:h-96">
                <img 
                  src="/profile.jpg" 
                  alt="Mahmud Hasan Ratul"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                  <p className="font-bold text-base md:text-lg">Mahmud Hasan Ratul</p>
                  <p className="text-slate-300 text-xs md:text-sm flex items-center gap-1">
                    <MapPin size={12} className="text-indigo-400 md:w-4 md:h-4" /> Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-800">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-base md:text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center mt-3">
                {['Algorithm Design', 'AI/ML', 'System Architecture', 'Production Scaling'].map((badge) => (
                  <span key={badge} className="px-2 md:px-2.5 py-0.5 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/30 rounded-full text-xs text-indigo-300 font-semibold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mb-32 md:mb-48 scroll-mt-28" aria-labelledby="projects-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-18 gap-6">
            <div>
              <div className="flex items-center gap-4.5 mb-5">
                <div className="w-2.5 h-12 bg-gradient-to-b from-indigo-400 via-purple-400 to-purple-500 rounded-full shadow-lg shadow-indigo-400/30"></div>
                <h2 id="projects-heading" className="text-3xl md:text-4xl font-black text-slate-100">Case Studies & Impact</h2>
              </div>
              <p className="text-slate-400 text-base md:text-lg ml-9 tracking-wide">Production systems with measurable impact & technical depth</p>
            </div>
            <a href="https://github.com/ratul-notfound?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs md:text-sm font-semibold group">
              View all GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800/50 hover:border-indigo-500/70 rounded-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-2 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-indigo-600/10 to-purple-600/5 rounded-full -mr-28 -mt-28 pointer-events-none"></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br from-${project.color}-600/20 to-${project.color}-500/10 text-${project.color}-400 group-hover:from-${project.color}-600/30 group-hover:to-${project.color}-500/20 transition-all`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-2 md:gap-3">
                    {project.links.code && (
                      <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="p-2 md:p-2.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group-hover:bg-indigo-600/10" aria-label="View source code">
                        <Github size={18} className="md:w-5 md:h-5" />
                      </a>
                    )}
                    {project.links.live && project.links.live !== '#' && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-2 md:p-2.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group-hover:bg-indigo-600/10" aria-label="View live demo">
                        <ExternalLink size={18} className="md:w-5 md:h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="relative z-10 text-lg md:text-xl font-black text-slate-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                  {project.title}
                </h3>
                <p className="relative z-10 text-xs md:text-sm font-bold text-indigo-400/90 mb-4 uppercase tracking-wider">
                  {project.category}
                </p>
                <p className="relative z-10 text-slate-300 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 md:h-20">
                  {project.description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/20 hover:border-indigo-500/50 rounded-md text-xs text-indigo-300 group-hover:text-indigo-200 transition-all font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-28 md:mb-40 scroll-mt-24" aria-labelledby="skills-heading">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
              <h2 id="skills-heading" className="text-3xl md:text-4xl font-black text-slate-100">Technical Arsenal</h2>
            </div>
            <p className="text-slate-400 text-base md:text-lg font-mono ml-8">
              <span className="text-green-400">const</span> <span className="text-yellow-400">expertise</span> <span className="text-green-400">=</span> {'['}<span className="text-blue-400">...</span>{'all the proven tools]'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-cyan-500/20 p-6 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe size={80} className="md:w-[100px] md:h-[100px]" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-100 mb-6 flex items-center gap-2 font-mono">
                <code className="text-cyan-400">{'//'}</code>
                <Globe size={16} className="md:w-[18px] md:h-[18px] text-cyan-400" /> Frontend Engineering
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 rounded-md text-xs md:text-sm hover:bg-cyan-950/50 transition-colors font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-indigo-500/20 p-6 md:p-8 rounded-xl md:rounded-2xl group hover:border-indigo-500/40 transition-colors">
              <h3 className="text-base md:text-lg font-bold text-slate-100 mb-6 flex items-center gap-2 font-mono">
                <code className="text-indigo-400">{'//'}</code>
                <Database size={16} className="md:w-[18px] md:h-[18px] text-indigo-400" /> Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-indigo-950/30 border border-indigo-500/30 text-indigo-300 rounded-md text-xs md:text-sm hover:bg-indigo-950/50 transition-colors font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-purple-950/40 to-slate-900/50 border border-purple-500/30 p-6 md:p-8 rounded-xl md:rounded-2xl group hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
              <h3 className="text-base md:text-lg font-bold text-slate-100 mb-6 flex items-center gap-2 font-mono">
                <code className="text-purple-400">{'//'}</code>
                <Cpu size={16} className="md:w-[18px] md:h-[18px] text-purple-400" /> AI / ML & Research
              </h3>
              <div className="space-y-3">
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-mono">
                  <span className="text-purple-300 font-semibold">LLMs & Generative AI:</span> OpenAI GPT-4, Google Gemini, LangChain chains & agents
                </p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-mono">
                  <span className="text-purple-300 font-semibold">Deep Learning:</span> TensorFlow, PyTorch, NLP pipelines, model fine-tuning
                </p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-mono">
                  <span className="text-purple-300 font-semibold">Algorithms:</span> A*, Dijkstra, dynamic programming, graph optimization
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {techStack.ai.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-purple-950/40 border border-purple-500/30 text-purple-300 rounded-md text-xs md:text-sm hover:bg-purple-950/60 transition-colors font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-full bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900/50 border border-emerald-500/20 p-6 md:p-8 rounded-xl md:rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-emerald-500/40 transition-colors">
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-100 mb-2 flex items-center gap-2 font-mono">
                  <code className="text-emerald-400">{'> '}</code>
                  <Terminal size={16} className="md:w-[18px] md:h-[18px] text-emerald-400" /> DevOps & Tools
                </h3>
                <p className="text-slate-400 text-xs md:text-sm">Essential tools for deployment, version control, and collaboration.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {techStack.tools.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs md:text-sm font-medium hover:bg-emerald-950/50 hover:border-emerald-500/50 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-4xl mx-auto text-center py-16 md:py-20 relative mb-12" aria-labelledby="contact-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-3xl pointer-events-none"></div>
          
          <div className="relative">
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-green-400 font-mono">{'<'}/</span>
                <code className="text-slate-300 font-mono text-sm">Contact</code>
                <span className="text-green-400 font-mono">{'>'}</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 mb-6 md:mb-8" id="contact-heading">
              <span className="text-green-400 font-mono">{'> '}</span>
              Let's architect solutions together
            </h2>
            <p className="text-base sm:text-lg md:text-lg text-slate-400 mb-10 md:mb-12 px-4 font-mono leading-relaxed">
              <span className="text-cyan-400">if</span> (yourProject <span className="text-green-400">involves</span> {'{'}
              <span className="text-blue-400">AI</span>, <span className="text-purple-400">optimization</span>, <span className="text-yellow-400">architecture</span> {'}'})<br />
              &nbsp;&nbsp;<span className="text-cyan-400">return</span> <span className="text-yellow-400">let's.collaborate</span>();
            </p>
            
            <a href="mailto:m.h.ratul18@gmail.com" className="inline-flex items-center gap-3 px-9 md:px-12 py-4 md:py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-500 text-white rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 shadow-xl shadow-indigo-500/30">
              <Mail size={20} className="md:w-[24px] md:h-[24px]" />
              Start conversation
            </a>

            <div className="mt-10 md:mt-12 text-slate-500 text-sm md:text-base font-mono">
              <p className="mb-3">Available for: Freelance • Consulting • Research Collaboration</p>
            </div>

            <div className="mt-8 md:mt-10 flex justify-center gap-8 md:gap-12 text-slate-500">
              <a href="https://linkedin.com/in/mahmud-hasan-ratul" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-indigo-300 transition-colors text-sm md:text-base hover:bg-slate-800/40 px-3 py-2 rounded-lg" aria-label="LinkedIn">
                <Linkedin size={20} className="md:w-5 md:h-5" /> <span className="text-xs md:text-sm font-semibold">LinkedIn</span>
              </a>
              <a href="https://github.com/ratul-notfound" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-indigo-300 transition-colors text-sm md:text-base hover:bg-slate-800/40 px-3 py-2 rounded-lg" aria-label="GitHub">
                <Github size={20} className="md:w-5 md:h-5" /> <span className="text-xs md:text-sm font-semibold">GitHub</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
