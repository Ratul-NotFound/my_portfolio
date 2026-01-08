/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  Github, Linkedin, Mail, ExternalLink, Download, Terminal, Code2, 
  Sparkles, Zap, Brain, Server, Globe, ArrowRight, MapPin,
  Star, Cpu, Network, Award, TrendingUp, Coffee, Rocket, 
  Circle, ChevronRight
} from 'lucide-react';

const Portfolio = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTech, setActiveTech] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [codeLines, setCodeLines] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  
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
      setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setTypedText('');
          setIsTyping(true);
        }, 2000);
      }, 2000);
    }
  }, [typedText, isTyping, fullText.length]);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    const particlesArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['cyan', 'purple', 'pink'][Math.floor(Math.random() * 3)]
    }));
    setParticles(particlesArray);

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

    const linesArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.15 + 0.05
    }));
    setCodeLines(linesArray);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 110,
        x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.05
      })));
      
      setCodeLines(prev => prev.map(line => ({
        ...line,
        y: (line.y + line.speed) % 110
      })));
    }, 50);

    window.addEventListener('mousemove', handleMouse);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [isMounted]);

  const stats = [
    { value: "3+", label: "Years", desc: "Experience", icon: TrendingUp },
    { value: "15+", label: "Projects", desc: "Deployed", icon: Rocket },
    { value: "10K+", label: "Users", desc: "Active", icon: Star },
    { value: "2K+", label: "Commits", desc: "GitHub", icon: Code2 }
  ];

  const techStack = {
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
  };

  const projects = [
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
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full transition-all duration-300"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              background: p.color === 'cyan' ? '#06b6d4' : p.color === 'purple' ? '#8b5cf6' : '#ec4899',
              boxShadow: `0 0 ${p.size * 4}px ${p.color === 'cyan' ? 'rgba(6, 182, 212, 0.6)' : p.color === 'purple' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(236, 72, 153, 0.6)'}`
            }}
          />
        ))}

        {codeLines.map(line => (
          <div
            key={line.id}
            className="absolute text-xs md:text-sm font-mono whitespace-nowrap pointer-events-none select-none"
            style={{
              left: `${line.x}%`,
              top: `${line.y}%`,
              color: '#06b6d4',
              opacity: line.opacity,
              textShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
            }}
          >
            {line.text}
          </div>
        ))}

        <div
          className="absolute w-[500px] h-[500px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8 animate-slide-up">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full text-sm hover:border-cyan-500/50 transition-all duration-300 cursor-default group">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-slate-300 font-mono text-xs md:text-sm">system.status = <span className="text-green-400">&quot;available&quot;</span></span>
                  <Coffee className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>

                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                    <span className="block text-slate-200 mb-2">Building</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      Scalable
                    </span>
                    <span className="block text-slate-200 mb-2">Systems</span>
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      with AI
                    </span>
                  </h1>
                  
                  <div className="flex items-center gap-2 text-lg md:text-xl text-slate-400 font-mono h-8">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-400">$</span>
                    <span>{typedText}</span>
                    <span className="w-2 h-5 bg-cyan-400 animate-blink"></span>
                  </div>

                  <p className="text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed">
                    Full Stack Engineer & AI Researcher specializing in <span className="text-cyan-400 font-semibold">high-performance applications</span>, <span className="text-purple-400 font-semibold">machine learning</span>, and <span className="text-pink-400 font-semibold">scalable architecture</span>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10">Explore Projects</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </a>
                  
                  <a
                    href="/resume.pdf"
                    download
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-xl border border-slate-700 hover:border-cyan-500 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Resume</span>
                  </a>
                </div>

                <div className="flex items-center gap-4 pt-4">
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
                      className="group p-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700 hover:border-cyan-500 rounded-xl transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative animate-float">
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
                  
                  <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-slate-700 rounded-3xl p-8 space-y-6 hover:border-cyan-500/50 transition-all duration-500">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-slate-700 group">
                      <img
                        src="/profile.jpg"
                        alt="Mahmud Hasan Ratul"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "/profile.jpg";
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Mahmud Hasan Ratul</h3>
                        <p className="text-slate-400 flex items-center gap-2 text-sm md:text-base">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          Dhaka, Bangladesh • GMT+6
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {['Full Stack', 'AI/ML', 'DevOps', 'System Design'].map((tag, i) => (
                          <span 
                            key={tag} 
                            className="px-4 py-2 bg-slate-800/50 backdrop-blur-xl border border-slate-600 hover:border-cyan-500 rounded-lg text-sm text-slate-300 hover:text-cyan-300 transition-all cursor-default hover:scale-105"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                          <span className="text-xs text-slate-400">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Coffee className="w-4 h-4 text-slate-400" />
                          <span className="text-xs text-slate-400">Fueled by coffee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 md:p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 rounded-2xl transition-all hover:scale-105 hover:shadow-2xl cursor-default overflow-hidden"
                >
                  <div className="relative z-10">
                    <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                    <div className="text-sm md:text-base font-semibold text-slate-300 mb-1">{stat.label}</div>
                    <div className="text-xs text-slate-500">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300 mb-6">
                <Sparkles className="w-4 h-4" />
                About Me
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Passionate Developer
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                Building scalable systems and leveraging AI to solve real-world problems
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
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
                <div
                  key={i}
                  className="group relative p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <item.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{item.desc}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, j) => (
                        <span key={j} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-400 group-hover:border-cyan-500/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300 mb-6 animate-pulse">
                <Rocket className="w-4 h-4" />
                <span className="font-mono">Case Studies</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Featured Work
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400">
                Real-world applications with measurable impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    
                    <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                      <img 
                        src={project.logo}
                        alt={`${project.title} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-xs font-bold text-white shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 transition-all duration-500 ${
                      activeProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}>
                      {project.links.code && (
                        <a
                          href={project.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-2xl transition-all hover:scale-110 shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-6 h-6 text-white" />
                        </a>
                      )}
                      {project.links.live && project.links.live !== '#' && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-2xl transition-all hover:scale-110 shadow-2xl shadow-cyan-500/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-6 h-6 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((metric, j) => (
                        <div 
                          key={j} 
                          className="relative group/metric p-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 rounded-xl text-center transition-all hover:scale-105 cursor-default overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover/metric:opacity-10 transition-opacity`}></div>
                          <span className="relative text-xs font-bold text-cyan-400">{metric}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                      {project.tech.map((tech, j) => (
                        <span 
                          key={j} 
                          className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg text-xs font-medium text-cyan-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 ${
                      activeProject === project.id 
                        ? 'text-cyan-400 translate-x-2' 
                        : 'text-transparent'
                    }`}>
                      <span>View Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform transition-transform duration-500 ${
                    activeProject === project.id ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16">
              <a
                href="https://github.com/ratul-notfound"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900/50 hover:bg-slate-800 backdrop-blur-xl border border-slate-800 hover:border-cyan-500 rounded-2xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
              >
                <Github className="w-5 h-5" />
                <span>View All Projects on GitHub</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300 mb-6 animate-pulse">
                <Zap className="w-4 h-4" />
                <span className="font-mono">Tech Stack</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Technologies
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                Modern tools and frameworks I use to craft exceptional digital experiences
              </p>
            </div>

            <div className="flex justify-center mb-12 md:mb-16">
              <div className="inline-flex flex-wrap items-center gap-2 md:gap-3 p-2 bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl">
                {[
                  { id: 'all', label: 'All', icon: Star },
                  { id: 'frontend', label: 'Frontend', icon: Code2 },
                  { id: 'backend', label: 'Backend', icon: Server },
                  { id: 'ai', label: 'AI/ML', icon: Brain },
                  { id: 'infra', label: 'DevOps', icon: Globe }
                ].map(tech => (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTech(tech.id)}
                    className={`group relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 ${
                      activeTech === tech.id
                        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
                      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-slate-900/80 to-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative w-14 h-14 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            {category === 'frontend' && <Code2 className="w-7 h-7 text-cyan-400" />}
                            {category === 'backend' && <Server className="w-7 h-7 text-purple-400" />}
                            {category === 'ai' && <Brain className="w-7 h-7 text-pink-400" />}
                            {category === 'infra' && <Globe className="w-7 h-7 text-cyan-400" />}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-black text-white capitalize mb-1">
                            {category === 'ai' ? 'AI & Machine Learning' : category === 'infra' ? 'DevOps & Infrastructure' : category}
                          </h3>
                          <p className="text-sm text-slate-400 font-mono">
                            {skills.length} Technologies
                          </p>
                        </div>

                        <div className="hidden md:block">
                          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                      {skills.map((skill, i) => (
                        <div
                          key={i}
                          className="group/card relative p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-default overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover/card:from-cyan-500/5 group-hover/card:to-purple-500/5 transition-all duration-500"></div>
                          
                          <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                              
                              <div className="relative w-full h-full p-2 bg-slate-800/50 rounded-xl border border-slate-700 group-hover/card:border-slate-600 transition-all group-hover/card:scale-110">
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
                              <span className="text-sm font-semibold text-slate-300 group-hover/card:text-cyan-300 transition-colors block">
                                {skill.name}
                              </span>
                            </div>
                          </div>

                          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full text-sm text-slate-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Always learning and exploring new technologies</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-12 md:p-16 bg-gradient-to-br from-slate-900/80 to-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Sparkles className="w-10 h-10 text-cyan-400" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Let&apos;s Build Something
                    </span>
                    <br />
                    <span className="text-white">Amazing Together</span>
                  </h2>
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                    Have a project in mind? Let&apos;s discuss how we can turn your vision into a scalable, production-ready solution.
                  </p>
                </div>

                <a
                  href="mailto:m.h.ratul18@gmail.com"
                  className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 overflow-hidden relative"
                >
                  <Mail className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Start Conversation</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                </a>

                <div className="flex justify-center gap-4 pt-8">
                  {[
                    { icon: Github, href: "https://github.com/ratul-notfound", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mahmud-hasan-ratul", label: "LinkedIn" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social p-5 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-xl border border-slate-700 hover:border-cyan-500 rounded-xl transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-7 h-7 text-slate-400 group-hover/social:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;