'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Github, Linkedin, Mail, ExternalLink, Download, Terminal, Code2, Sparkles, Zap, Brain, Server, Globe, ArrowRight, MapPin, CheckCircle, Star, Cpu, Binary, Network, Layers, Award, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTech, setActiveTech] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [codeLines, setCodeLines] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Mouse tracking
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Generate particles
    const particlesArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(particlesArray);

    // Generate code lines
    const snippets = [
      'const ai = new AIEngine();',
      'async function deploy() {',
      '  return await cloud.scale();',
      '}',
      'npm run build --production',
      'docker-compose up -d',
      'kubectl apply -f deployment.yml',
      '// Optimizing performance...',
      'export default Portfolio;',
      'redis-cli --cluster create',
      'terraform apply --auto-approve'
    ];

    const linesArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.3 + 0.1
    }));
    setCodeLines(linesArray);

    // Animate
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.05
      })));
      
      setCodeLines(prev => prev.map(line => ({
        ...line,
        y: (line.y + line.speed) % 100
      })));
    }, 50);

    window.addEventListener('mousemove', handleMouse);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const stats = [
    { value: "3+", label: "Years", desc: "Experience", icon: TrendingUp },
    { value: "15+", label: "Projects", desc: "Shipped", icon: Sparkles },
    { value: "10K+", label: "Users", desc: "Reached", icon: Star },
    { value: "2K+", label: "Commits", desc: "GitHub", icon: Code2 }
  ];

  const techStack = {
    frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "PostgreSQL", "Redis", "Firebase"],
    ai: ["OpenAI GPT-4", "Gemini Pro", "LangChain", "TensorFlow", "PyTorch"],
    infra: ["Docker", "Kubernetes", "AWS", "Vercel", "GitHub Actions"]
  };

  const projects = [
    {
      title: "CV Maker AI",
      category: "SaaS • ML",
      description: "LLM-powered resume analyzer with ATS optimization, processing 50+ resumes weekly with 92% accuracy.",
      tech: ["Next.js 14", "Gemini API", "Stripe", "TypeScript"],
      links: { live: "https://cv-maker-ai-three.vercel.app/", code: "https://github.com/ratul-notfound/cv-maker-ai" },
      icon: Brain,
      color: "purple",
      metrics: ["500+ Users", "92% ATS", "ML-Powered"]
    },
    {
      title: "Orivo Commerce",
      category: "E-Commerce",
      description: "Scalable platform handling 10K+ concurrent users with real-time inventory and payment processing.",
      tech: ["Next.js 14", "Firebase", "Redux", "Stripe"],
      links: { live: "https://orivoshop.com", code: "https://github.com/ratul-notfound/orivo" },
      icon: Globe,
      color: "orange",
      metrics: ["10K+ Users", "Real-time", "99.9% Uptime"]
    },
    {
      title: "BloodNet",
      category: "Mobile • Algorithms",
      description: "Geospatial donor matching using A* pathfinding with O(log n) complexity for optimal route finding.",
      tech: ["React Native", "Maps API", "Node.js", "MongoDB"],
      links: { live: "#", code: "https://github.com/ratul-notfound/bloodnet" },
      icon: Network,
      color: "red",
      metrics: ["1K+ Donors", "A* Algorithm", "O(log n)"]
    },
    {
      title: "Lecture AI",
      category: "NLP • Research",
      description: "Audio processing pipeline with Whisper API achieving 92% transcription accuracy for education.",
      tech: ["React", "Whisper API", "GPT-4", "FastAPI"],
      links: { live: "https://lecture-ai-self.vercel.app/", code: "https://github.com/ratul-notfound/lecture-ai" },
      icon: Cpu,
      color: "blue",
      metrics: ["100+ Hours", "92% Accuracy", "NLP"]
    }
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        {/* Floating particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
            }}
          />
        ))}

        {/* Code rain */}
        {codeLines.map(line => (
          <div
            key={line.id}
            className="absolute text-xs font-mono text-slate-700 whitespace-nowrap"
            style={{
              left: `${line.x}%`,
              top: `${line.y}%`,
              transform: 'translateY(-50%)'
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Mouse follower */}
        <div
          className="absolute w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192
          }}
        />
      </div>

      {/* Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-slate-300 font-mono">Available for hire</span>
                </div>

                {/* Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="block text-slate-300">Building</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                      Scalable Systems
                    </span>
                    <span className="block text-slate-300">with AI</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
                    Full Stack Engineer & AI Researcher specializing in high-performance applications, machine learning integration, and scalable architecture.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <a
                    href="/resume.pdf"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl font-semibold transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span>Resume</span>
                  </a>
                </div>

                {/* Social Links */}
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
                      className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-lg transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right - Profile Card */}
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Rotating border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                  
                  {/* Card */}
                  <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 space-y-6">
                    {/* Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-slate-700">
                      <img
                        src="/profile.jpg"
                        alt="Mahmud Hasan Ratul"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000";
                        }}
                      />
                      {/* Scan line effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan"></div>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Mahmud Hasan Ratul</h3>
                        <p className="text-slate-400 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Dhaka, Bangladesh
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {['Full Stack', 'AI/ML', 'DevOps'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 rounded-2xl transition-all hover:scale-105"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-300">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Passionate about building scalable systems and leveraging AI to solve real-world problems
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Code2,
                  title: "Full Stack Development",
                  desc: "Expert in modern web technologies, building responsive and scalable applications from frontend to backend."
                },
                {
                  icon: Brain,
                  title: "AI & Machine Learning",
                  desc: "Integrating cutting-edge AI models and ML algorithms to create intelligent, data-driven solutions."
                },
                {
                  icon: Server,
                  title: "Cloud Architecture",
                  desc: "Designing and deploying robust cloud infrastructure with focus on performance and reliability."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 rounded-2xl transition-all hover:scale-105"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Production systems with measurable impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 rounded-2xl transition-all hover:scale-[1.02]"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br from-${project.color}-500/20 to-${project.color}-600/20 rounded-2xl flex items-center justify-center mb-6`}>
                    <project.icon className={`w-8 h-8 text-${project.color}-400`} />
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-400">{project.category}</p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6">{project.description}</p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.metrics.map((metric, j) => (
                      <span key={j} className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-xs text-slate-300">
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.links.code && (
                      <a
                        href={project.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-all"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.links.live && project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg text-sm font-medium transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Technical Stack
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Tools & technologies I work with
              </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['all', 'frontend', 'backend', 'ai', 'infra'].map(tech => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTech === tech
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
                  }`}
                >
                  {tech.charAt(0).toUpperCase() + tech.slice(1)}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="space-y-8">
              {Object.entries(techStack).map(([category, skills]) => (
                (activeTech === 'all' || activeTech === category) && (
                  <div key={category} className="p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6 capitalize">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {skills.map((skill, i) => (
                        <div
                          key={i}
                          className="group p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-xl transition-all hover:scale-105 text-center"
                        >
                          <CheckCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                          <div className="text-sm font-medium text-slate-300">{skill}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl">
              <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Ready to turn your idea into a scalable, production-ready application?
              </p>
              
              <a
                href="mailto:m.h.ratul18@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <Mail className="w-6 h-6" />
                Start Conversation
              </a>

              <div className="flex justify-center gap-4 mt-8">
                {[
                  { icon: Github, href: "https://github.com/ratul-notfound" },
                  { icon: Linkedin, href: "https://linkedin.com/in/mahmud-hasan-ratul" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-xl transition-all hover:scale-110"
                  >
                    <social.icon className="w-6 h-6 text-slate-400 hover:text-cyan-400" />
                  </a>
                ))}
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