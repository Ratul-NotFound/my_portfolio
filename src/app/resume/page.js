/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect } from 'react';
import { Download, Mail, Github, Linkedin, MapPin, Award, BookOpen, Briefcase, Code, Compass, FileText, Printer, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import LightweightParticles from '../../components/LightweightParticles';

// Self-contained dynamic IDE syntax highligher component for robust Hacker theme coloring
const SyntaxHighlight = ({ text, isHacker }) => {
  if (!isHacker) return <>{text}</>;

  // Tokenize using typical IDE / shell command separator
  const parts = text.split(/(\s+|\(|\)|\[|\]|\{|\}|\:|\.|\,|;|=|->|::|•|"[^"]+")/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // JSON keys / Code keywords (pink)
        if (/^(const|let|var|function|import|export|default|await|while|new|sudo|git|npm|process|docker-compose|sys|SYS|NET|GPU|DB|API|ML|MODEL|AGENT|VEC|FLOW|COMP_SELECTOR_01|LIVE|MONITOR|STATUS|COMPILED|LATENCY|SYNERGY|and|to|via|with|on|in|using|for|through|or|as|of)$/i.test(part) || /^"[a-z0-9_]+"$/.test(part)) {
          return <span key={idx} className="text-[#ff79c6] font-semibold">{part}</span>;
        }
        // Functions / Action words (blue)
        if (/^(log|generate|sync|resolve|push|run|checkout|random|getItem|sin|write|keys|useRef|useEffect|commit|apt|update|establishing|initializing|loading|binding|adjusting|validation|completed|launching|validating|routing|scaling|optimizing|investigating|engineering|developing|building|leveraging|solve)$/i.test(part)) {
          return <span key={idx} className="text-[#00bfff]">{part}</span>;
        }
        // Constants / Numbers / Metrics / Values / JSON String values (orange/yellow)
        if (/^(true|false|\d+|FPS|NOT|FOUND|Antigravity|PORT|bin|adam|0\.0042|1e-4|0\.024|\d+ms|v\d+\.\d+|\d+\%|\d+\+?|avg|Pinecone|Redis|CUDA|RAG|LLM|MLOps)$/i.test(part) || /^"[^"]+"$/.test(part)) {
          return <span key={idx} className="text-[#ffb86c]">{part}</span>;
        }
        // Types / Core subjects (neon green)
        if (/^(Object|GPT_4|GPT_5|Promise|AI|Math|localStorage|weights|state|dispatch|ref|inView|prev|data|response|target|Full|Stack|Development|Machine|Learning|Automation|Research|Scientist|Compiler|Theory|Cloud|Scale|systems|problems|backends|protocols|layers|controls|embeddings|transformers|frameworks|paradigms|nodes|clusters|pipelines)$/i.test(part)) {
          return <span key={idx} className="text-[#39ff14] font-semibold">{part}</span>;
        }
        // Operators & punctuation (bright grey/white)
        if (/^(\(|\)|\[|\]|\{|\}|\:|\.|\,|;|=|->|::|•)$/.test(part)) {
          return <span key={idx} className="text-[#e2e8f0] opacity-90">{part}</span>;
        }
        // Normal text (code silver-grey)
        return <span key={idx} className="text-[#abb2bf]">{part}</span>;
      })}
    </>
  );
};

export default function Resume() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isHacker = theme === 'hacker';
  const isCreative = theme === 'creative';

  // Trigger print view which is mapped directly to standard PDF saving by the browser
  const handleDownloadPDF = () => {
    window.print();
  };

  useEffect(() => {
    // Add page metadata title dynamically
    document.title = 'Mahmud Hasan Ratul | Professional CV';
  }, []);

  const info = {
    name: 'Mahmud Hasan Ratul',
    title: 'Software Engineer & AI Researcher',
    location: 'Dhaka, Bangladesh',
    email: 'm.h.ratul18@gmail.com',
    github: 'github.com/ratul-notfound',
    linkedin: 'linkedin.com/in/mahmud-hasan-ratul',
    summary: 'Results-driven Software Engineer and AI Researcher with extensive experience building scalable, high-performance web applications, intelligent automation systems, and real-time distributed pipelines. Active technical leader skilled at optimizing product architecture, conducting developer mentoring, and executing complex software integrations from inception to launch.',
  };

  const skills = [
    { category: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'HTML5', 'CSS3'] },
    { category: 'Frameworks & Libraries', items: ['Next.js 14', 'React 18', 'React Native', 'Redux Toolkit', 'FastAPI', 'Node.js', 'Express'] },
    { category: 'Database & Cloud', items: ['MongoDB', 'Firebase', 'PostgreSQL', 'Redis', 'Vercel'] },
    { category: 'AI & APIs', items: ['Gemini Pro API', 'OpenAI Whisper', 'GPT-4 API', 'Stripe', 'Socket.io', 'Google Maps API'] }
  ];

  const experience = [
    {
      role: 'Vice President',
      org: 'Daffodil International University Computer & Programming Club (DIUCPC)',
      duration: 'Jan 2023 - Present',
      location: 'Dhaka, Bangladesh',
      bullets: [
        'Directing technical initiatives and organizing programming contests, scaling active community members from 200 to over 500+ active developers.',
        'Lead organizer for 15+ national hackathons and events, managing volunteer teams and coordinating strategic alignments with industry partners.',
        'Conducting technical workshops on Full Stack development, code reviews, and competitive programming mentoring sessions.'
      ]
    },
    {
      role: 'Co-Lead Volunteer (Crowd Control Management Head)',
      org: 'ICPC Dhaka Regional Contest 2024',
      duration: 'Dec 2024',
      location: 'Dhaka, Bangladesh',
      bullets: [
        'Engineered volunteer pipelines coordinating technical room layout setup, contest system initialization, and crowd management for 100+ competing universities.',
        'Successfully maintained operational workflow integrity and security parameters throughout high-stakes algorithmic challenges.'
      ]
    },
    {
      role: 'Lead Workshop Organizer',
      org: 'Daffodil International University Department of CSE',
      duration: 'Nov 2025',
      location: 'Dhaka, Bangladesh',
      bullets: [
        'Curated and delivered a 3-day intensive boot-camp covering modern React hooks, Node.js REST API construction, and MongoDB database modeling.',
        'Coordinated direct support and hands-on laboratory exercises for 100+ student participants, achieving a 4.8/5 satisfaction rate.'
      ]
    }
  ];

  const projects = [
    {
      title: 'CV Maker AI',
      category: 'SaaS / AI Product',
      tech: 'Next.js 14, Gemini Pro API, Stripe, TypeScript, Tailwind',
      desc: 'LLM-powered resume analyzer with built-in ATS optimization engine. Handles weekly analysis workflows with an average 15ms processing latency and 92% assessment accuracy.',
      link: 'https://cv-maker-ai-v1.vercel.app'
    },
    {
      title: 'UniVibe',
      category: 'High-Performance Web Starter',
      tech: 'React 18, TypeScript, Vite, ESLint, Tailwind CSS',
      desc: 'Sleek, modular React web architecture template loaded with instant HMR compilation, type-safe development environment rules, and pre-configured deployment templates.',
      link: 'https://univibe-diu.vercel.app'
    },
    {
      title: 'Dhaka 8 No Ward',
      category: 'Arcade Parody Game',
      tech: 'HTML5 Canvas, CSS3, Vanilla JavaScript, Vercel',
      desc: 'High-performance canvas game capturing Bangladesh election satires. Playable arcade framework optimized with native frame looping handling over 50K+ distinct gameplay sessions.',
      link: 'https://abbas-vs-nasir.vercel.app'
    },
    {
      title: 'NeuroStack',
      category: 'Intelligent Knowledge PWA',
      tech: 'React 18, Firebase, Gemini 1.5 Flash, Tailwind, PWA',
      desc: 'Automation repository that fetches RSS and YouTube feeds daily, generating clean markdown summarization logs in an offline-ready Progressive Web Application dashboard.'
    }
  ];

  const achievements = [
    {
      title: 'Best Innovation Award',
      issuer: 'DIU Innovation Challenge 2023',
      date: 'Nov 2023',
      desc: 'Awarded first place and a $2,000 research grant for "CodeMentor AI", an interactive AI-powered learning platform designed for structured programming pathways.'
    }
  ];

  const certificates = [
    { name: 'Google Gemini AI Developer', issuer: 'Google Cloud & DeepLearning.AI', date: 'Dec 2025' },
    { name: 'Machine Learning Specialization', issuer: 'Stanford University - Coursera', date: 'Oct 2023' },
    { name: 'Full Stack Web Development Professional', issuer: 'Meta', date: 'Sep 2023' }
  ];

  return (
    <div className={`min-h-screen ${isHacker ? 'bg-[#000600] text-[#00ff41]' : isCreative ? 'bg-[#030303] text-white' : isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'} relative overflow-hidden print:bg-white print:text-black`}>
      
      {/* Embedded print styles to completely override screen layout for perfect A4 paper boundaries */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide interactive assets, cursor, navbar, footer, buttons */
          .no-print, nav, footer, .custom-cursor, #floating-contact-btn {
            display: none !important;
          }
          body, html, main {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 2.5cm 2cm !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          a {
            text-decoration: none !important;
            color: #000000 !important;
          }
          .section-divider {
            border-bottom: 1px solid #111111 !important;
            margin-bottom: 8px !important;
          }
          h2 {
            font-size: 13px !important;
            text-transform: uppercase !important;
            font-weight: 700 !important;
            letter-spacing: 0.5px !important;
          }
          .bullet-point::before {
            content: "• " !important;
          }
        }
      `}} />

      {/* Ambient background particles for screen experience */}
      <div className="no-print">
        <LightweightParticles />
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-32 pb-24 relative z-10 print:p-0 print:pt-0">
        
        {/* CV Utility Header Dashboard */}
        <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 p-6 backdrop-blur-xl border rounded-2xl transition-all duration-300 bg-white/5 border-white/10 hover:border-white/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400">
              <FileText className="w-3.5 h-3.5" />
              <span>ATS-Optimized Executive Format</span>
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isHacker ? 'font-mono' : ''}`}>Curriculum Vitae</h1>
            <p className="text-slate-450 text-sm">Download or print this professional portfolio layout natively to PDF.</p>
          </div>
          
          <button
            onClick={handleDownloadPDF}
            className={`group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 ${isHacker ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]' : isLight ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/15' : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/20'}`}
          >
            <Printer className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Print / Save PDF</span>
            <Download className="w-4 h-4 ml-1 opacity-70 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Executive Curriculum Vitae Sheet */}
        <div className={`print-container bg-white/30 backdrop-blur-xl border rounded-3xl p-8 md:p-14 shadow-2xl transition-all duration-500 ${isHacker ? 'bg-black/90 border-[#00ff41]/10 hover:border-[#00ff41]/20 shadow-[#00ff41]/5' : isLight ? 'bg-white border-slate-200/80 shadow-slate-100' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'} print:border-none print:shadow-none print:p-0 print:bg-white`}>
          
          {/* Header Block */}
          <header className="border-b border-slate-800/20 pb-8 mb-8 print:pb-4 print:mb-4 print:border-black">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-900' : 'text-white'} print:text-black print:text-3xl print:font-bold`}>
                  {info.name}
                </h1>
                <p className={`text-lg md:text-xl mt-2 font-mono font-medium ${isHacker ? 'text-[#39ff14]' : isLight ? 'text-indigo-650' : 'text-cyan-400'} print:text-black print:text-sm print:mt-1`}>
                  {info.title}
                </p>
              </div>
              <div className="flex flex-col gap-2 font-mono text-sm text-slate-455 print:text-black print:text-[10px] print:items-end">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 print:hidden" />
                  <span>{info.location}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500 print:hidden" />
                  <a href={`mailto:${info.email}`} className="hover:text-cyan-400 print:hover:text-black">{info.email}</a>
                </span>
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-500 print:hidden" />
                  <a href={`https://${info.github}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 print:hover:text-black">{info.github}</a>
                </span>
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-slate-500 print:hidden" />
                  <a href={`https://${info.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 print:hover:text-black">{info.linkedin}</a>
                </span>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mb-8 print:mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'} print:text-black print:text-sm print:mb-1 print:font-bold`}>
              <Compass className="w-5 h-5 text-slate-500 print:hidden" />
              <span>Professional Summary</span>
            </h2>
            <div className="section-divider hidden print:block"></div>
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'} print:text-black print:text-justify`}>
              {info.summary}
            </p>
          </section>

          {/* Core Skills Grid */}
          <section className="mb-8 print:mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'} print:text-black print:text-sm print:mb-1 print:font-bold`}>
              <Code className="w-5 h-5 text-slate-500 print:hidden" />
              <span>Core Technical Stack</span>
            </h2>
            <div className="section-divider hidden print:block"></div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 print:grid-cols-4 print:gap-2">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className={`p-4 border rounded-xl bg-white/5 border-white/5 print:border-none print:bg-transparent print:p-0`}>
                  <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2.5 print:mb-1 print:text-[9px] print:font-bold">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all duration-300 border bg-white/5 border-white/10 text-slate-300 print:border-none print:bg-transparent print:p-0 print:text-black print:after:content-[",_"] print:last:after:content-none`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="mb-8 print:mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'} print:text-black print:text-sm print:mb-1 print:font-bold`}>
              <Briefcase className="w-5 h-5 text-slate-500 print:hidden" />
              <span>Professional & Leadership Experience</span>
            </h2>
            <div className="section-divider hidden print:block"></div>

            <div className="space-y-6 print:space-y-3">
              {experience.map((exp) => (
                <div key={exp.role} className="relative group">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h3 className={`text-lg font-bold ${isHacker ? 'font-mono text-[#abb2bf]' : isLight ? 'text-slate-909' : 'text-white'} print:text-black print:text-xs print:font-bold`}>
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-slate-500 print:text-black print:text-[10px]">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1 font-mono text-xs mt-1 text-slate-500 print:text-black print:text-[9px]">
                    <span className="font-semibold">{exp.org}</span>
                    <span>{exp.location}</span>
                  </div>

                  <ul className="mt-3 space-y-1.5 print:mt-1 print:space-y-0.5">
                    {exp.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className={`bullet-point text-sm flex items-start gap-2.5 leading-relaxed text-slate-400 print:text-black print:text-[10px]`}
                      >
                        <CheckCircle className="w-4 h-4 mt-0.5 text-[#39ff14]/30 shrink-0 print:hidden" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-8 print:mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'} print:text-black print:text-sm print:mb-1 print:font-bold`}>
              <Award className="w-5 h-5 text-slate-500 print:hidden" />
              <span>Featured Engineering Projects</span>
            </h2>
            <div className="section-divider hidden print:block"></div>

            <div className="grid sm:grid-cols-2 gap-6 print:grid-cols-2 print:gap-x-4 print:gap-y-2">
              {projects.map((proj) => (
                <div
                  key={proj.title}
                  className={`p-5 border rounded-2xl bg-white/5 border-white/5 print:border-none print:bg-transparent print:p-0`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <h3 className={`font-bold ${isHacker ? 'font-mono text-[#00bfff]' : isLight ? 'text-indigo-650' : 'text-cyan-400'} print:text-black print:text-xs print:font-bold`}>
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider print:text-black print:text-[8px]">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#abb2bf]/60 mt-1 print:text-black print:text-[8px]">
                    <span className="font-semibold">Stack:</span> {proj.tech}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 print:text-black print:text-[10px] print:mt-1">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Awards & Certifications */}
          <div className="grid sm:grid-cols-2 gap-8 print:grid-cols-2 print:gap-x-4 print:gap-0">
            {/* Achievements */}
            <section className="print:mb-4">
              <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'} print:text-black print:text-sm print:mb-1 print:font-bold`}>
                <Award className="w-5 h-5 text-slate-500 print:hidden" />
                <span>Honors & Awards</span>
              </h2>
              <div className="section-divider hidden print:block"></div>

              <div className="space-y-4 print:space-y-1">
                {achievements.map((ach) => (
                  <div key={ach.title}>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`font-bold ${isHacker ? 'font-mono text-[#abb2bf]' : isLight ? 'text-slate-900' : 'text-white'} print:text-black print:text-xs print:font-bold`}>
                        {ach.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 print:text-black print:text-[9px]">
                        {ach.date}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#ffb86c] print:text-black print:text-[9px]">
                      {ach.issuer}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 print:text-black print:text-[9px] print:mt-0">
                      {ach.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="print:mb-4">
              <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'} print:text-black print:text-sm print:mb-1 print:font-bold`}>
                <BookOpen className="w-5 h-5 text-slate-500 print:hidden" />
                <span>Certifications</span>
              </h2>
              <div className="section-divider hidden print:block"></div>

              <div className="space-y-3.5 print:space-y-1">
                {certificates.map((cert) => (
                  <div key={cert.name} className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className={`font-bold text-xs ${isHacker ? 'font-mono text-[#abb2bf]' : isLight ? 'text-slate-900' : 'text-white'} print:text-black print:text-[10px] print:font-bold`}>
                        {cert.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 print:text-black print:text-[9px]">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 print:text-black print:text-[9px]">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
