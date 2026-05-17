/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { Award, Users, Trophy, Calendar, Download, ImageIcon, X, Github, Linkedin, Mail, Sparkles, Star, Target, Medal, Crown, Heart, ChevronRight, Search, ExternalLink, MapPin, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';

export default function Achievements() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isHacker = theme === 'hacker';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const particlesArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.2
    }));
    setParticles(particlesArray);

    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 110
      })));
    }, 50);

    window.addEventListener('mousemove', handleMouse);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const programs = [
    {
      id: 1,
      title: "Vice President - DIUCPC",
      role: "Vice President",
      organization: "Daffodil International University Computer & Programming Club",
      date: "Jan 2023 - Present",
      location: "Dhaka, Bangladesh",
      type: "leadership",
      description: "Leading technical initiatives and organizing programming contests. Managed 15+ national events and coordinated with international organizations.",
      fullDescription: "As Vice President of DIUCPC, I've been instrumental in transforming the club into one of the leading tech communities in Bangladesh.\n\n• Strategic Planning: Developing annual roadmaps for technical events\n• Team Leadership: Managing 27+ core members\n• Event Management: Organizing hackathons and competitions\n• Industry Partnerships: Building relationships with tech companies\n• Mentorship: Conducting training sessions and code reviews\n• Community Building: Growing from 200 to 500+ active members",
      images: [
        "/vp.jpg?w=800&q=70",
        "/cpc1.jpg?w=800&q=80",
        "/cpc2.jpg?w=800&q=80"
      ],
      highlights: ["6000+ Students", "30+ Events", "National Recognition"],
      tags: ["Leadership", "Event Management", "Public Speaking"]
    },
    {
      id: 2,
      title: "ICPC Dhaka Regional Contest 2024",
      role: "Co-Lead Volunteer",
      organization: "ICPC",
      date: "Dec 2024",
      location: "Dhaka, Bangladesh",
      type: "program",
      description: "Coordinated logistics, volunteer teams, and crowd control management for the ICPC Dhaka Regional Contest 2024.",
      fullDescription: "Served as Co-Lead Volunteer and Crowd Control Management Head. Engineered logistics pipelines coordinating technical setup, contest environment initialization, and arena alignment for 100+ competing universities.",
      images: [
        "/icpc1.jpg?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
      ],
      highlights: ["100+ Universities", "Logistics Head", "Co-Lead Volunteer"],
      tags: ["Algorithms", "Competitive Programming", "Leadership"]
    },
    {
      id: 3,
      title: "Tech Workshop Organizer",
      role: "Lead Organizer",
      organization: "DIU Department of CSE",
      date: "Nov 2025",
      location: "Daffodil Smart City, Dhaka",
      type: "volunteer",
      description: "Organized 3-day intensive workshop on Full Stack Web Development. Trained 100+ students with hands-on projects.",
      fullDescription: "Led organization of comprehensive Full Stack workshop:\n\n• Planning: Curriculum covering React, Node.js, MongoDB\n• Logistics: Coordinated venue for 100+ participants\n• Teaching: Delivered lectures and live coding\n• Mentoring: One-on-one guidance during sessions\n• Resources: Created detailed documentation\n• Feedback: 4.8/5 satisfaction rating",
      images: [
        "/tech1.jpg?w=800&q=80",
        "/tech2.jpg?w=800&q=80"
      ],
      highlights: ["100+ Attendees", "4.8/5 Rating", "Full Stack"],
      tags: ["Web Development", "Teaching", "React"]
    },
    {
      id: 4,
      title: "Best Innovation Award",
      role: "Award Recipient",
      organization: "DIU Innovation Challenge 2023",
      date: "Nov 2023",
      location: "Daffodil International University",
      type: "award",
      description: "Best Innovation Award for AI-powered education platform helping students learn programming.",
      fullDescription: "Won Best Innovation Award for 'CodeMentor AI':\n\n• Project: AI-powered learning platform\n• Technology: GPT-4, React, Node.js, PostgreSQL\n• Features: Personalized paths, AI code review\n• Impact: 200+ beta users, 90% completion\n• Recognition: Featured in tech media\n• Prize: $2,000 and incubation support",
      images: [
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80"
      ],
      highlights: ["$2,000 Prize", "200+ Users", "AI-Powered"],
      tags: ["Innovation", "AI", "EdTech", "Award"]
    }

  ];

  const certificates = [
    {
      id: 1,
      name: "Google Gemini AI Developer",
      issuer: "Google Cloud & DeepLearning.AI",
      date: "Dec 2025",
      credentialId: "GOOGLE-GEMINI-AI-2025-4455",
      description: "Advanced specialization in integrating Google Gemini multimodal models, prompt engineering, and building intelligent AI agent workflows.",
      photo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      skills: ["Gemini API", "AI Agents", "Python", "LLMs"]
    },
    {
      id: 2,
      name: "Machine Learning Specialization",
      issuer: "Stanford University - Coursera",
      date: "Oct 2023",
      credentialId: "COURSERA-ML-2023-67890",
      description: "Comprehensive ML course covering supervised learning and neural networks.",
      photo: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      skills: ["Machine Learning", "Python", "TensorFlow"]
    },
    {
      id: 3,
      name: "Full Stack Web Development",
      issuer: "Meta - Professional Certificate",
      date: "Sep 2023",
      credentialId: "META-FSWD-2023-11111",
      description: "Advanced full stack program covering React, Node.js, and databases.",
      photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      skills: ["React", "Node.js", "MongoDB"]
    }
  ];

  const stats = [
    { number: programs.length.toString(), label: 'Achievements', icon: Trophy, bgClass: 'bg-purple-600' },
    { number: certificates.length.toString(), label: 'Certificates', icon: Award, bgClass: 'bg-cyan-600' },
    { number: '1000+', label: 'Students', icon: Users, bgClass: 'bg-emerald-600' },
    { number: '15+', label: 'Events', icon: Target, bgClass: 'bg-rose-600' },
  ];

  const filteredPrograms = programs.filter(prog => {
    const matchesCategory = activeCategory === 'all' || prog.type === activeCategory;
    const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All', icon: Star, count: programs.length },
    { id: 'program', label: 'Programs', icon: Trophy, count: programs.filter(p => p.type === 'program').length },
    { id: 'leadership', label: 'Leadership', icon: Crown, count: programs.filter(p => p.type === 'leadership').length },
    { id: 'volunteer', label: 'Volunteer', icon: Heart, count: programs.filter(p => p.type === 'volunteer').length },
    { id: 'award', label: 'Awards', icon: Medal, count: programs.filter(p => p.type === 'award').length },
  ];

  const nextImage = (progId, imagesLength) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [progId]: ((prev[progId] || 0) + 1) % imagesLength
    }));
  };

  const prevImage = (progId, imagesLength) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [progId]: ((prev[progId] || 0) - 1 + imagesLength) % imagesLength
    }));
  };

  return (
    <div className={`min-h-screen ${isHacker ? 'bg-[#000600] text-[#00ff41]' : isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'} relative overflow-hidden`}>
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 ${isHacker ? 'bg-[#000400]' : isLight ? 'bg-slate-50' : 'bg-slate-950'}`}></div>
        <div className={`absolute top-0 -left-40 w-96 h-96 rounded-full blur-3xl ${isHacker ? 'bg-[#00ff41]/5 animate-pulse' : isLight ? 'bg-cyan-300/15 animate-pulse' : 'bg-cyan-500/5 animate-pulse'}`}></div>
        <div className={`absolute bottom-0 -right-40 w-96 h-96 rounded-full blur-3xl ${isHacker ? 'bg-[#00cc32]/5 animate-pulse' : isLight ? 'bg-purple-300/15 animate-pulse' : 'bg-purple-500/5 animate-pulse'}`} style={{ animationDelay: '1s' }}></div>
        {isLight && (
          <>
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-cyan-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
          </>
        )}
        {isHacker && (
          <>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#00ff41]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#009926]/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
          </>
        )}
        <div className={`absolute inset-0 ${isHacker ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSw2NSwwLjA2KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" : isLight ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4wNikiIHN0cm9rZT0icmdpYiA2IDE4MiAyMTIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"}`}></div>
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: isHacker ? p.opacity * 0.7 : isLight ? p.opacity * 0.5 : p.opacity, background: isHacker ? '#00ff41' : isLight ? '#06b6d4' : '#06b6d4', boxShadow: isHacker ? `0 0 ${p.size * 8}px rgba(0, 255, 65, 0.6)` : isLight ? '0 0 14px rgba(6, 182, 212, 0.5)' : '0 0 10px rgba(6, 182, 212, 0.6)' }} />
        ))}
      </div>

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="py-20 md:py-32 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto text-center"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 border rounded-full text-sm mb-8 font-mono ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/20 text-[#00ff41]' : isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-600' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>achievements</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className={`block mb-4 ${isHacker ? 'text-[#00ff41]/80' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>Leadership &</span>
              <span className={`block ${isHacker ? 'text-[#00ff41] drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]' : isLight ? 'text-indigo-600' : 'text-cyan-400'}`}>Recognition</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-4xl mx-auto ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>Building communities and making impact through technology</p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className={`group relative p-6 md:p-8 backdrop-blur-xl border rounded-2xl transition-all hover:scale-105 cursor-default overflow-hidden ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/10 hover:border-[#00ff41]/40 hover:shadow-[0_0_20px_rgba(0,255,65,0.08)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-purple-400 hover:shadow-purple-200/50 shadow-sm' : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50'}`}
              >
                <div className={`absolute inset-0 ${stat.bgClass} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 ${stat.bgClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-4xl font-black mb-2 font-mono ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-800' : 'text-white'}`}>{stat.number}</div>
                  <div className={`text-sm ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filter */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="max-w-2xl mx-auto relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isHacker ? 'text-[#00ff41]/40' : isLight ? 'text-slate-400' : 'text-slate-400'}`} />
              <input type="text" placeholder="Search achievements..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full pl-12 pr-4 py-4 border rounded-xl transition-all focus:outline-none font-mono text-sm ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 focus:border-[#00ff41] text-[#00ff41] placeholder-[#00ff41]/30' : isLight ? 'bg-white/70 border-slate-200 focus:border-purple-400 text-slate-700 placeholder-slate-400' : 'bg-slate-900/50 border-slate-800 focus:border-purple-500 text-slate-300 placeholder-slate-500'}`} />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${activeCategory === cat.id ? isHacker ? 'bg-[#00ff41]/15 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.15)] scale-105' : isLight ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'bg-cyan-600 text-slate-950 shadow-xl scale-105' : isHacker ? 'bg-[#000a02]/80 text-[#00cc32]/50 border border-[#00ff41]/10 hover:scale-105' : isLight ? 'bg-white/70 text-slate-600 border border-slate-200 hover:scale-105' : 'bg-slate-900/50 text-slate-300 border border-slate-800 hover:scale-105'}`}>
                  <cat.icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${activeCategory === cat.id ? isHacker ? 'bg-[#00ff41]/20' : 'bg-white/20' : isHacker ? 'bg-[#00ff41]/10' : isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-32">
                <Trophy className="w-24 h-24 text-slate-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-slate-400 mb-3">No results</h3>
                <button onClick={() => setSearchQuery('')} className="px-6 py-3 bg-purple-600 rounded-xl font-semibold">Clear</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPrograms.map((prog, idx) => (
                  <motion.div 
                    key={prog.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: (idx % 2) * 0.15, ease: "easeOut" }}
                    className={`group backdrop-blur-xl border rounded-3xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/10 hover:border-[#00ff41]/40 hover:shadow-[0_0_25px_rgba(0,255,65,0.06)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-purple-400 hover:shadow-purple-200/40 shadow-sm' : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50'}`}
                  >
                    <div className="relative aspect-[16/10] bg-slate-800">
                      {prog.images && prog.images.length > 0 ? (
                        <>
                          <img src={prog.images[currentImageIndex[prog.id] || 0]} alt={prog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"; }} />
                          {prog.images.length > 1 && (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); prevImage(prog.id, prog.images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full transition-all hover:scale-110 z-10">
                                <ChevronRight className="w-5 h-5 text-white rotate-180" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); nextImage(prog.id, prog.images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full transition-all hover:scale-110 z-10">
                                <ChevronRight className="w-5 h-5 text-white" />
                              </button>
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {prog.images.map((_, idx) => (
                                  <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => ({ ...prev, [prog.id]: idx })); }} className={`w-2 h-2 rounded-full transition-all ${(currentImageIndex[prog.id] || 0) === idx ? 'w-8 bg-white' : 'bg-white/50'}`} />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                          <ImageIcon className="w-16 h-16 text-slate-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-purple-600/90 backdrop-blur-xl rounded-xl text-xs font-bold text-white shadow-lg capitalize">{prog.type}</span>
                      </div>
                    </div>

                      <div className="p-8 space-y-6">
                      <div>
                        <h3 className={`text-3xl font-black transition-colors mb-3 ${isHacker ? 'text-[#00ff41] group-hover:drop-shadow-[0_0_6px_rgba(0,255,65,0.4)]' : isLight ? 'text-slate-800 group-hover:text-purple-600' : 'text-white group-hover:text-purple-300'}`}>{prog.title}</h3>
                        <div className={`flex flex-wrap gap-3 text-sm font-mono mb-3 ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <span className="flex items-center gap-1.5"><Award className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-500' : 'text-purple-400'}`} />{prog.role}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5"><Calendar className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-500' : 'text-cyan-400'}`} />{prog.date}</span>
                        </div>
                        <p className={`text-sm ${isHacker ? 'text-[#00cc32]/50' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>{prog.organization}</p>
                        {prog.location && <p className={`flex items-center gap-1.5 text-xs font-mono mt-1 ${isHacker ? 'text-[#00ff41]/30' : isLight ? 'text-slate-400' : 'text-slate-500'}`}><MapPin className="w-3 h-3" />{prog.location}</p>}
                      </div>

                      <p className={`leading-relaxed whitespace-pre-line ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-600' : 'text-slate-300'}`}>{expandedCard === prog.id ? prog.fullDescription : prog.description}</p>

                      {prog.fullDescription && prog.fullDescription !== prog.description && (
                        <button onClick={() => setExpandedCard(expandedCard === prog.id ? null : prog.id)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isHacker ? 'text-[#00ff41] hover:text-[#33ff66]' : isLight ? 'text-purple-600 hover:text-purple-500' : 'text-purple-400 hover:text-purple-300'}`}>
                          <BookOpen className="w-4 h-4" />
                          <span>{expandedCard === prog.id ? 'Show Less' : 'Read Full Story'}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${expandedCard === prog.id ? 'rotate-90' : ''}`} />
                        </button>
                      )}

                      {prog.highlights && (
                        <div className="grid grid-cols-2 gap-3">
                          {prog.highlights.map((h, j) => (
                            <div key={j} className={`p-3 border rounded-xl text-center transition-all hover:scale-105 ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/10 hover:border-[#00ff41]/30' : isLight ? 'bg-purple-50/50 border-purple-200 hover:border-purple-400' : 'bg-slate-800/30 border-slate-700 hover:border-purple-500/50'}`}>
                              <span className={`text-xs font-bold ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-600' : 'text-purple-400'}`}>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {prog.tags && (
                        <div className={`flex flex-wrap gap-2 pt-4 border-t ${isHacker ? 'border-[#00ff41]/10' : isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                          {prog.tags.map((tag, j) => (
                            <span key={j} className={`px-3 py-1.5 border rounded-lg text-xs font-medium ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00ff41]/70' : isLight ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-purple-950/40 border-purple-800 text-purple-300'}`}>#{tag.toLowerCase().replace(' ', '_')}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={`h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isHacker ? 'bg-[#00ff41]' : isLight ? 'bg-indigo-600' : 'bg-cyan-500'}`}></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Certificates */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm mb-6 font-mono animate-pulse ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/20 text-[#00ff41]' : isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'}`}>
                <Award className="w-4 h-4" />
                <span>certificates.collection</span>
              </div>
              <h2 className={`text-5xl font-black mb-6 ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-600' : 'text-cyan-400'}`}>Professional Credentials</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, idx) => (
                <motion.div 
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                  className={`group backdrop-blur-xl border rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/10 hover:border-[#00ff41]/40 hover:shadow-[0_0_15px_rgba(0,255,65,0.08)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-indigo-400 hover:shadow-indigo-200/40 shadow-sm' : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/50'}`}
                >
                  <div className="relative aspect-video bg-slate-800">
                    <button onClick={() => setSelectedImage(cert.photo)} className="w-full h-full">
                      <img src={cert.photo} alt={cert.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </button>
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-600/90 backdrop-blur-xl rounded-lg text-xs font-bold text-white flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>Verified
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className={`font-bold text-lg transition-colors mb-2 ${isHacker ? 'text-[#00ff41] group-hover:drop-shadow-[0_0_4px_rgba(0,255,65,0.4)]' : isLight ? 'text-slate-800 group-hover:text-indigo-600' : 'text-white group-hover:text-cyan-300'}`}>{cert.name}</h4>
                      <p className={`text-sm font-mono ${isHacker ? 'text-[#00cc32]/50' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>{cert.issuer}</p>
                    </div>
                    {cert.description && <p className={`text-sm ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>{cert.description}</p>}
                    {cert.skills && (
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, j) => (
                          <span key={j} className={`px-2 py-1 border rounded text-xs font-medium ${isHacker ? 'bg-[#00ff41]/5 border-[#00ff41]/15 text-[#00ff41]/70' : isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'}`}>{skill}</span>
                        ))}
                      </div>
                    )}
                    <div className={`flex items-center justify-between pt-4 border-t ${isHacker ? 'border-[#00ff41]/10' : isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                      <div className={`flex items-center gap-2 text-xs font-mono ${isHacker ? 'text-[#00ff41]/30' : isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                      <button onClick={() => setSelectedImage(cert.photo)} className={`flex items-center gap-2 text-sm font-semibold ${isHacker ? 'text-[#00ff41] hover:text-[#33ff66]' : isLight ? 'text-indigo-600 hover:text-indigo-500' : 'text-cyan-400 hover:text-cyan-300'}`}>
                        <ExternalLink className="w-4 h-4" />View
                      </button>
                    </div>
                    {cert.credentialId && <div className={`text-xs font-mono truncate ${isHacker ? 'text-[#00ff41]/20' : isLight ? 'text-slate-400' : 'text-slate-600'}`}>ID: {cert.credentialId}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative p-16 backdrop-blur-2xl border rounded-3xl overflow-hidden group ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 hover:border-[#00ff41]/40' : isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900/40 border-slate-800'}`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${isHacker ? 'bg-[#00ff41]/[0.02]' : isLight ? 'bg-slate-100/60' : 'bg-slate-800/10'}`}></div>
              <div className="relative z-10 text-center space-y-8">
                <Star className={`w-20 h-20 mx-auto ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-500' : 'text-purple-400'}`} />
                <div className="space-y-4">
                  <h2 className={`text-5xl font-black ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-indigo-600' : 'text-cyan-400'}`}>Let&apos;s Collaborate</h2>
                  <p className={`text-xl ${isHacker ? 'text-[#00cc32]/60' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>Open to initiatives and partnerships</p>
                </div>
                <a href="mailto:m.h.ratul18@gmail.com" className={`inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 overflow-hidden relative ${isHacker ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 hover:shadow-[0_0_25px_rgba(0,255,65,0.2)]' : isLight ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-2xl hover:shadow-indigo-500/30' : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 hover:shadow-2xl hover:shadow-cyan-500/30'}`}>
                  <Mail className="w-6 h-6 relative z-10" />
                  <span className="relative z-10 font-mono">send_message()</span>
                  <ChevronRight className="w-6 h-6 relative z-10" />

                </a>
                <div className="flex justify-center gap-4 pt-4">
                  {[
                    { icon: Github, href: "https://github.com/ratul-notfound" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mahmud-hasan-ratul" }
                  ].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-5 border rounded-xl transition-all hover:scale-110 ${isHacker ? 'bg-[#000a02]/80 border-[#00ff41]/15 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]' : isLight ? 'bg-white/70 border-slate-200 hover:border-purple-400 shadow-sm hover:shadow-lg' : 'bg-slate-900/50 hover:bg-slate-800 border-slate-800 hover:border-purple-500'}`}>
                      <social.icon className={`w-7 h-7 transition-colors ${isHacker ? 'text-[#00ff41]/50 hover:text-[#00ff41]' : isLight ? 'text-slate-500 hover:text-purple-600' : 'text-slate-400 hover:text-purple-400'}`} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4" 
            onClick={() => setSelectedImage(null)}
          >
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-xl transition-all hover:scale-110 group z-10">
              <X className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </button>
            <a href={selectedImage} download className="absolute top-6 left-6 p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-xl transition-all hover:scale-110 group z-10" onClick={(e) => e.stopPropagation()}>
              <Download className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
            </a>
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-6xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/10 blur-3xl"></div>
                <img src={selectedImage} alt="Achievement" className="relative w-full h-auto rounded-2xl shadow-2xl border border-slate-800" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}