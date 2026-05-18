/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { Download, Mail, Github, Linkedin, MapPin, Award, BookOpen, Briefcase, Code, Compass, FileText, Printer, CheckCircle, Eye, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import LightweightParticles from '../../components/LightweightParticles';

// Self-contained dynamic IDE syntax highligher component for robust Hacker theme coloring
const SyntaxHighlight = ({ text, isHacker }) => {
  if (!isHacker) return <>{text}</>;

  const parts = text.split(/(\s+|\(|\)|\[|\]|\{|\}|\:|\.|\,|;|=|->|::|•|"[^"]+")/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        if (/^(const|let|var|function|import|export|default|await|while|new|sudo|git|npm|process|docker-compose|sys|SYS|NET|GPU|DB|API|ML|MODEL|AGENT|VEC|FLOW|COMP_SELECTOR_01|LIVE|MONITOR|STATUS|COMPILED|LATENCY|SYNERGY|and|to|via|with|on|in|using|for|through|or|as|of)$/i.test(part) || /^"[a-z0-9_]+"$/.test(part)) {
          return <span key={idx} className="text-[#ff79c6] font-semibold">{part}</span>;
        }
        if (/^(log|generate|sync|resolve|push|run|checkout|random|getItem|sin|write|keys|useRef|useEffect|commit|apt|update|establishing|initializing|loading|binding|adjusting|validation|completed|launching|validating|routing|scaling|optimizing|investigating|engineering|developing|building|leveraging|solve)$/i.test(part)) {
          return <span key={idx} className="text-[#00bfff]">{part}</span>;
        }
        if (/^(true|false|\d+|FPS|NOT|FOUND|Antigravity|PORT|bin|adam|0\.0042|1e-4|0\.024|\d+ms|v\d+\.\d+|\d+\%|\d+\+?|avg|Pinecone|Redis|CUDA|RAG|LLM|MLOps)$/i.test(part) || /^"[^"]+"$/.test(part)) {
          return <span key={idx} className="text-[#ffb86c]">{part}</span>;
        }
        if (/^(Object|GPT_4|GPT_5|Promise|AI|Math|localStorage|weights|state|dispatch|ref|inView|prev|data|response|target|Full|Stack|Development|Machine|Learning|Automation|Research|Scientist|Compiler|Theory|Cloud|Scale|systems|problems|backends|protocols|layers|controls|embeddings|transformers|frameworks|paradigms|nodes|clusters|pipelines)$/i.test(part)) {
          return <span key={idx} className="text-[#39ff14] font-semibold">{part}</span>;
        }
        if (/^(\(|\)|\[|\]|\{|\}|\:|\.|\,|;|=|->|::|•)$/.test(part)) {
          return <span key={idx} className="text-[#e2e8f0] opacity-90">{part}</span>;
        }
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

  // Toggle layout format: Modern Interactive vs. Standard Executive WYSIWYG
  const [isFormalView, setIsFormalView] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Direct programmatic vector PDF download using html2pdf.js
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // Dynamic import to bypass server-side rendering checks
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Target the pre-rendered offscreen formal resume node
      const element = document.getElementById('formal-resume-document');
      
      const opt = {
        margin:       [0.4, 0.4, 0.4, 0.4], // Clean standard formal margins
        filename:     'Mahmud_Hasan_Ratul_CV.pdf',
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 2.2, // Crisp, ultra high-resolution text vectors
          useCORS: true, 
          letterRendering: true,
          logging: false 
        },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      // Fallback to browser print if script failed
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    document.title = 'Mahmud Hasan Ratul | Curriculum Vitae';
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

  // Helper component to render the formal paper layout identically (used both on screen and offscreen)
  const FormalResumeLayout = ({ id }) => (
    <div id={id} className="bg-white text-slate-900 p-12 md:p-16 max-w-[8.5in] min-h-[11in] font-serif border border-slate-200 print:border-none print:p-0 print:m-0" style={{ width: '8.5in' }}>
      
      {/* Centered Name and Subtitles */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-slate-950 tracking-tight" style={{ fontSize: '24px' }}>{info.name}</h1>
        <p className="text-sm text-slate-700 font-serif italic mt-1">{info.title}</p>
        
        {/* Center contacts row */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-600 font-sans mt-2 font-medium">
          <span>{info.location}</span>
          <span>•</span>
          <a href={`mailto:${info.email}`} className="hover:text-indigo-650 hover:underline">{info.email}</a>
          <span>•</span>
          <a href={`https://${info.github}`} target="_blank" rel="noreferrer" className="hover:text-indigo-650 hover:underline">{info.github}</a>
          <span>•</span>
          <a href={`https://${info.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-indigo-650 hover:underline">{info.linkedin}</a>
        </div>
      </div>

      {/* Profile Summary */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2 font-serif">
          Professional Summary
        </h2>
        <p className="text-xs text-slate-800 text-justify leading-relaxed">
          {info.summary}
        </p>
      </section>

      {/* Technical Skills Block */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2 font-serif">
          Technical Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 mb-1">
                {skillGroup.category}
              </h3>
              <p className="text-xs text-slate-800 leading-normal font-sans">
                {skillGroup.items.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experiences Block */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 font-serif">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.role} className="page-break-inside-avoid">
              <div className="flex justify-between items-center gap-2">
                <h3 className="text-xs font-bold text-slate-950 font-serif">{exp.role}</h3>
                <span className="text-xs font-sans font-medium text-slate-600">{exp.duration}</span>
              </div>
              <div className="flex justify-between items-center text-xs italic text-slate-700 mt-0.5">
                <span>{exp.org}</span>
                <span className="font-sans font-medium not-italic text-[10px] text-slate-500">{exp.location}</span>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="text-xs text-slate-800 text-justify leading-normal">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Block */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 font-serif">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.title} className="page-break-inside-avoid">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-950 font-serif">{proj.title}</h3>
                <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-slate-405">{proj.category}</span>
              </div>
              <p className="text-[10px] font-sans text-slate-500 mt-0.5">
                <span className="font-bold">Technologies:</span> {proj.tech}
              </p>
              <p className="text-xs text-slate-700 mt-1.5 leading-normal text-justify">
                {proj.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="page-break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2 font-serif">
            Honors & Awards
          </h2>
          {achievements.map((ach) => (
            <div key={ach.title} className="space-y-0.5">
              <div className="flex justify-between items-center text-xs">
                <h3 className="font-bold text-slate-955">{ach.title}</h3>
                <span className="text-slate-500 text-[10px] font-sans">{ach.date}</span>
              </div>
              <p className="text-xs italic text-indigo-700">{ach.issuer}</p>
              <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">{ach.desc}</p>
            </div>
          ))}
        </section>

        <section className="page-break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2 font-serif">
            Certifications
          </h2>
          <div className="space-y-2">
            {certificates.map((cert) => (
              <div key={cert.name} className="flex justify-between items-start text-xs gap-2">
                <div>
                  <h3 className="font-bold text-slate-950 leading-tight">{cert.name}</h3>
                  <p className="text-[10px] text-slate-500">{cert.issuer}</p>
                </div>
                <span className="text-slate-500 text-[10px] font-sans shrink-0">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );

  return (
    <div className={`min-h-screen ${isHacker ? 'bg-[#000600] text-[#00ff41]' : isCreative ? 'bg-[#030303] text-white' : isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'} relative overflow-hidden print:bg-white print:text-black`}>
      
      {/* Dynamic print settings to hide layout and clean margins during fallback window.print() */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print, nav, footer, .custom-cursor, #floating-contact-btn {
            display: none !important;
          }
          body, html, main {
            background: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}} />

      {/* Dynamic Swaying Node Canvas */}
      <div className="no-print">
        <LightweightParticles />
      </div>

      <Navbar />

      {/* MASTER FORMAL CV CANVAS: Rendered strictly off-screen so computed layout is fully active, allowing html2pdf/html2canvas to compile it flawlessly! */}
      <div className="no-print" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <FormalResumeLayout id="formal-resume-document" />
      </div>

      <main className="max-w-6xl mx-auto px-4 pt-32 pb-24 relative z-10 print:p-0 print:pt-0">
        
        {/* CV Utility Header Dashboard */}
        <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 p-6 backdrop-blur-xl border rounded-2xl transition-all duration-300 bg-white/5 border-white/10 hover:border-white/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400">
              <FileText className="w-3.5 h-3.5" />
              <span>ATS-Optimized Executive Format</span>
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isHacker ? 'font-mono' : ''}`}>Curriculum Vitae</h1>
            <p className="text-slate-450 text-sm">Download a professional formal PDF or toggle A4 paper preview.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Toggle formal paper format preview */}
            <button
              onClick={() => setIsFormalView(!isFormalView)}
              className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-sm border transition-all ${isFormalView ? 'bg-white text-slate-900 border-white shadow-lg' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}
            >
              <Eye className="w-4 h-4" />
              <span>{isFormalView ? 'View Modern UI' : 'Preview Paper PDF'}</span>
            </button>

            {/* Direct Programmatic PDF Download Trigger */}
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${isHacker ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]' : isLight ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/15' : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/20'}`}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Compiling PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Executive Curriculum Vitae Dynamic Layout */}
        {isFormalView ? (
          
          /* Formal Executive Paper Presentation (WYSIWYG on Screen) */
          <div className="flex justify-center bg-transparent no-print">
            <FormalResumeLayout id="formal-screen-view" />
          </div>

        ) : (
          
          /* Modern Interactive Portfolio Theme View */
          <div className={`print-container bg-white/30 backdrop-blur-xl border rounded-3xl p-8 md:p-14 shadow-2xl transition-all duration-500 ${isHacker ? 'bg-black/90 border-[#00ff41]/10 hover:border-[#00ff41]/20 shadow-[#00ff41]/5' : isLight ? 'bg-white border-slate-200/80 shadow-slate-100' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'} print:border-none print:shadow-none print:p-0 print:bg-white`}>
            
            {/* Header Block */}
            <header className="border-b border-slate-800/20 pb-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-900' : 'text-white'}`}>
                    {info.name}
                  </h1>
                  <p className={`text-lg md:text-xl mt-2 font-mono font-medium ${isHacker ? 'text-[#39ff14]' : isLight ? 'text-indigo-650' : 'text-cyan-400'}`}>
                    {info.title}
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-sm text-slate-455">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{info.location}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <a href={`mailto:${info.email}`} className="hover:text-cyan-400">{info.email}</a>
                  </span>
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-500" />
                    <a href={`https://${info.github}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400">{info.github}</a>
                  </span>
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-slate-500" />
                    <a href={`https://${info.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400">{info.linkedin}</a>
                  </span>
                </div>
              </div>
            </header>

            {/* Executive Summary */}
            <section className="mb-8">
              <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                <Compass className="w-5 h-5 text-slate-500" />
                <span>Professional Summary</span>
              </h2>
              <p className={`text-base leading-relaxed ${isLight ? 'text-slate-650' : 'text-slate-350'}`}>
                <SyntaxHighlight text={info.summary} isHacker={isHacker} />
              </p>
            </section>

            {/* Core Skills Grid */}
            <section className="mb-8">
              <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                <Code className="w-5 h-5 text-slate-500" />
                <span>Core Technical Stack</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className={`p-4 border rounded-xl bg-white/5 border-white/5`}>
                    <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2.5">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item) => (
                        <span
                          key={item}
                          className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all duration-300 border bg-white/5 border-white/10 text-slate-300`}
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
            <section className="mb-8">
              <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                <Briefcase className="w-5 h-5 text-slate-500" />
                <span>Professional & Leadership Experience</span>
              </h2>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.role} className="relative group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                      <h3 className={`text-lg font-bold ${isHacker ? 'font-mono text-[#abb2bf]' : isLight ? 'text-slate-900' : 'text-white'}`}>
                        {exp.role}
                      </h3>
                      <span className="text-sm font-mono text-slate-500">
                        {exp.duration}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1 font-mono text-xs mt-1 text-slate-500">
                      <span className="font-semibold">{exp.org}</span>
                      <span>{exp.location}</span>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                      {exp.bullets.map((bullet, index) => (
                        <li
                          key={index}
                          className={`text-sm flex items-start gap-2.5 leading-relaxed text-slate-400`}
                        >
                          <CheckCircle className="w-4 h-4 mt-0.5 text-[#39ff14]/30 shrink-0" />
                          <span>
                            <SyntaxHighlight text={bullet} isHacker={isHacker} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section className="mb-8">
              <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                <Award className="w-5 h-5 text-slate-500" />
                <span>Featured Engineering Projects</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.title}
                    className={`p-5 border rounded-2xl bg-white/5 border-white/5`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <h3 className={`font-bold ${isHacker ? 'font-mono text-[#00bfff]' : isLight ? 'text-indigo-650' : 'text-cyan-400'}`}>
                        {proj.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[#abb2bf]/60 mt-1">
                      <span className="font-semibold">Stack:</span> {proj.tech}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      <SyntaxHighlight text={proj.desc} isHacker={isHacker} />
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards & Certifications */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Achievements */}
              <section>
                <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  <Award className="w-5 h-5 text-slate-500" />
                  <span>Honors & Awards</span>
                </h2>

                <div className="space-y-4">
                  {achievements.map((ach) => (
                    <div key={ach.title}>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-bold ${isHacker ? 'font-mono text-[#abb2bf]' : isLight ? 'text-slate-900' : 'text-white'}`}>
                          {ach.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-500">
                          {ach.date}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#ffb86c]">
                        {ach.issuer}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        <SyntaxHighlight text={ach.desc} isHacker={isHacker} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className={`text-xl font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${isHacker ? 'font-mono text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  <BookOpen className="w-5 h-5 text-slate-500" />
                  <span>Certifications</span>
                </h2>

                <div className="space-y-3.5">
                  {certificates.map((cert) => (
                    <div key={cert.name} className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className={`font-bold text-xs ${isHacker ? 'font-mono text-[#abb2bf]' : isLight ? 'text-slate-900' : 'text-white'}`}>
                          {cert.name}
                        </h3>
                        <p className="text-xs font-mono text-slate-500">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
