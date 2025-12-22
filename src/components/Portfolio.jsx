'use client';

import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Download, 
  Terminal, Database, Cpu, Globe, ArrowRight, MapPin, 
  Code2, Sparkles, LayoutTemplate, Smartphone
} from 'lucide-react';

const Portfolio = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  // --- PROFESSIONAL DATA ---
  
  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Shipped", value: "15+" },
    { label: "Commits (2025)", value: "1.2k" },
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
      category: "SaaS Application",
      description: "An AI-powered ATS resume optimizer. Uses Google Gemini to analyze user profiles and generate industry-standard PDF resumes in real-time.",
      tech: ["Next.js", "Gemini AI", "PDF-lib", "Stripe"],
      links: {
        live: "https://cv-maker-ai-three.vercel.app/", // Replace with real link if available
        code: "https://github.com/ratul-notfound/cv-maker-ai"
      },
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      color: "purple"
    },
    {
      title: "Orivo Commerce",
      category: "E-Commerce Platform",
      description: "Enterprise-grade shopping platform with inventory management, real-time analytics dashboard, and secure payment processing.",
      tech: ["Next.js", "Firebase", "Redux", "Shadcn UI"],
      links: {
        live: "https://orivoshop.com", 
        code: "https://github.com/ratul-notfound/orivo"
      },
      icon: <LayoutTemplate className="w-6 h-6 text-orange-400" />,
      color: "orange"
    },
    {
      title: "BloodNet",
      category: "Social Impact / Mobile",
      description: "Emergency blood donation network connecting donors with hospitals via GPS. Features real-time alerts and donor matching algorithms.",
      tech: ["React Native", "Google Maps API", "GeoLocation"],
      links: {
        live: "#",
        code: "https://github.com/ratul-notfound/bloodnet"
      },
      icon: <Smartphone className="w-6 h-6 text-red-500" />,
      color: "red"
    },
    {
      title: "Lecture AI",
      category: "EdTech Solution",
      description: "Automated note-taking assistant for students. Transcribes audio lectures and generates summary notes using Whisper & LLMs.",
      tech: ["React", "Whisper API", "Python Backend"],
      links: {
        live: "https://lecture-ai-self.vercel.app/",
        code: "https://github.com/ratul-notfound/lecture-ai"
      },
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      color: "blue"
    },
    {
      title: "DIU CPC HUB",
      category: "EdTech Solution",
      description: "Learning Platform",
      tech: ["Html","Css"],
      links: {
        live: "https://diu-cpc-hub.vercel.app/",
        code: "https://https://github.com/Ratul-NotFound/DIU-CPC-HUB"
      },
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      color: "blue"
    }

  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* --- BACKGROUND GRADIENTS --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-emerald-900/10 rounded-full blur-[100px]" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-slate-800 py-4' : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight text-slate-100 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-mono">R</span>
            </div>
            Ratul.dev
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-indigo-400 transition-colors"
              >
                {item}
              </button>
            ))}
            <a 
              href="mailto:m.h.ratul18@gmail.com"
              className="px-4 py-2 bg-slate-100 text-slate-900 rounded-full hover:bg-white transition-colors font-semibold"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">

        {/* --- HERO SECTION --- */}
        <section id="about" className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-32">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Available for new projects
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-100 tracking-tight leading-[1.1]">
              Building digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                products that scale.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hi, I'm <strong className="text-slate-200">Mahmud Hasan Ratul</strong>. 
              A Full Stack Developer & AI Engineer based in Bangladesh. 
              I transform complex problems into elegant, production-ready solutions using 
              Next.js, Cloud Architecture, and Artificial Intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                View My Work <ArrowRight size={18} />
              </button>
              <a 
                href="/resume.pdf" // Ensure you have a resume.pdf in public folder
                target="_blank"
                className="px-8 py-3.5 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Download size={18} /> Download CV
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 justify-center lg:justify-start text-slate-500">
              <a href="https://github.com/ratul-notfound" target="_blank" className="hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://linkedin.com/in/mahmud-hasan-ratul" target="_blank" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="mailto:m.h.ratul18@gmail.com" className="hover:text-white transition-colors"><Mail size={24} /></a>

            </div>
          </div>

          {/* Profile Picture & Stats Grid */}
          <div className="relative w-full max-w-md lg:w-[450px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-[2rem] rotate-3 opacity-20 blur-2xl"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-[2rem] p-4 overflow-hidden shadow-2xl">
              <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-slate-800 relative group">
                {/* IMAGE PLACEHOLDER - Make sure profile.jpg is in public/ */}
                <img 
                  src="/profile.jpg" 
                  alt="Mahmud Hasan Ratul"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"; // Professional fallback
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-lg">Mahmud Hasan Ratul</p>
                  <p className="text-slate-300 text-sm flex items-center gap-1">
                    <MapPin size={14} className="text-indigo-400" /> Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Mini Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-800">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-2">Featured Projects</h2>
              <p className="text-slate-400">Real-world solutions shipped to production.</p>
            </div>
            <a href="https://github.com/ratul-notfound?tab=repositories" target="_blank" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-sm font-medium">
              View all GitHub <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="group bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-2xl p-8 hover:bg-slate-900 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-${project.color}-500/10 text-${project.color}-400`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-3">
                    {project.links.code && (
                      <a href={project.links.code} target="_blank" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-indigo-400/80 mb-4 uppercase tracking-widest">
                  {project.category}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 h-20">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SKILLS SECTION (Bento Style) --- */}
        <section id="skills" className="mb-32 scroll-mt-24">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Technical Arsenal</h2>
            <p className="text-slate-400">The tools I use to build scalable products.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Frontend - Wide */}
            <div className="col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <LayoutTemplate size={100} />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                <Globe size={18} className="text-cyan-400" /> Frontend Engineering
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl group hover:border-indigo-500/30 transition-colors">
              <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                <Database size={18} className="text-indigo-400" /> Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI/ML */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl group hover:border-purple-500/30 transition-colors">
              <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                <Cpu size={18} className="text-purple-400" /> AI / ML
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.ai.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-purple-950/30 border border-purple-500/20 text-purple-300 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools - Wide Bottom */}
            <div className="col-span-full bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
                  <Terminal size={18} className="text-emerald-400" /> DevOps & Tools
                </h3>
                <p className="text-slate-400 text-sm">Essential tools for deployment, version control, and collaboration.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.tools.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="max-w-3xl mx-auto text-center py-12">
          <h2 className="text-4xl font-bold text-slate-100 mb-6">Let's work together</h2>
          <p className="text-lg text-slate-400 mb-10">
            I'm currently looking for full-time opportunities or high-impact freelance projects. 
            If you have an idea or need a robust technical solution, my inbox is open.
          </p>
          
          <a href="mailto:m.h.ratul18@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-indigo-500/20">
            <Mail size={22} />
            Say Hello
          </a>

          <div className="mt-16 flex justify-center gap-8 text-slate-500">
             <a href="https://linkedin.com/in/mahmud-hasan-ratul" target="_blank" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <Linkedin size={20} /> <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="https://github.com/ratul-notfound" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
              <Github size={20} /> <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 py-8 text-center bg-slate-950">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Mahmud Hasan Ratul. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Portfolio;