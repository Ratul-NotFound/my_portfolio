'use client';
import React, { useState, useEffect } from 'react';
import { Award, Users, Trophy, Calendar, Download, ImageIcon, X, Github, Linkedin, Mail, Sparkles, Star, TrendingUp, Target, Zap, Medal, Crown, Heart, ChevronRight, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Generate particles
    const particlesArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.2
    }));
    setParticles(particlesArray);

    // Mouse tracking
    const handleMouse = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    // Animate particles
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

  // Sample data - Replace with your actual achievements
  const programs = [
    {
      id: 1,
      title: "Vice President - DIUCPC",
      role: "Vice President",
      organization: "Daffodil International University Computer & Programming Club",
      date: "2023 - Present",
      type: "leadership",
      description: "Leading technical initiatives, organizing programming contests, mentoring 500+ students in competitive programming and software development. Managed 15+ national events and coordinated with international organizations.",
      photo: null,
      image: "VP",
      highlights: ["500+ Students Mentored", "15+ Events Organized", "National Recognition"]
    },
    // Add more achievements here
  ];

  const certificates = [
    // Add your certificates here
  ];

  const stats = [
    { number: programs.length.toString(), label: 'Achievements', icon: Trophy, color: 'purple', gradient: 'from-purple-600 to-pink-600' },
    { number: certificates.length.toString(), label: 'Certificates', icon: Award, color: 'cyan', gradient: 'from-cyan-600 to-blue-600' },
    { number: '500+', label: 'Students Mentored', icon: Users, color: 'green', gradient: 'from-green-600 to-emerald-600' },
    { number: '15+', label: 'Events Organized', icon: Target, color: 'orange', gradient: 'from-orange-600 to-red-600' },
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

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMzYsNzIsMTUzLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        {/* Floating particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-purple-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)'
            }}
          />
        ))}

        {/* Mouse follower */}
        <div
          className="absolute w-[400px] h-[400px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-full text-sm text-purple-300 mb-8 hover:border-purple-400 transition-all duration-300 cursor-default group">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Leadership & Recognition</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="block text-slate-200 mb-4">Achievements &</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Impact
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              As <span className="text-purple-400 font-semibold">Vice President of DIUCPC</span>, I've led numerous programs, 
              mentored <span className="text-cyan-400 font-semibold">500+ students</span>, and organized 
              <span className="text-pink-400 font-semibold"> 15+ events</span> at national and international levels.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 md:p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-default overflow-hidden"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-slate-400 font-semibold">{stat.label}</div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 focus:border-purple-500 rounded-xl text-slate-300 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold shrink-0">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              <div className="flex gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`group flex items-center gap-2 px-5 md:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30 scale-105'
                        : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-purple-500/50 hover:bg-slate-800 hover:scale-105'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeCategory === cat.id
                        ? 'bg-white/20'
                        : 'bg-slate-700'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-20 md:py-32">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-slate-800/50 rounded-2xl mb-6">
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 text-slate-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-400 mb-3">
                  {searchQuery ? 'No results found' : 'No achievements yet'}
                </h3>
                <p className="text-slate-500 mb-6">
                  {searchQuery ? 'Try adjusting your search or filters' : 'Add your achievements, programs, and certifications here'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition-all"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPrograms.map((prog, i) => (
                  <div
                    key={prog.id}
                    className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {/* Image Section */}
                    <div className="relative aspect-video bg-slate-800 overflow-hidden">
                      {prog.photo ? (
                        <button
                          onClick={() => setSelectedImage(prog.photo)}
                          className="w-full h-full group/img"
                        >
                          <img
                            src={prog.photo}
                            alt={prog.title}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                        </button>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                          <div className="text-center">
                            <ImageIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-600 text-sm font-medium mb-2">Photo coming soon</p>
                            <p className="text-5xl md:text-6xl font-black text-slate-700/50">{prog.image}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-purple-600 backdrop-blur-xl rounded-xl text-xs font-bold text-white shadow-lg">
                          {prog.type.charAt(0).toUpperCase() + prog.type.slice(1)}
                        </span>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">
                        {prog.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm md:text-base">
                        <p className="text-purple-400 font-semibold">{prog.role}</p>
                        <p className="text-slate-400 leading-relaxed">{prog.organization}</p>
                        <p className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {prog.date}
                        </p>
                      </div>

                      <p className="text-slate-300 leading-relaxed">{prog.description}</p>

                      {/* Highlights */}
                      {prog.highlights && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                          {prog.highlights.map((highlight, j) => (
                            <span 
                              key={j}
                              className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-300"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom accent */}
                    <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Certificates Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300 mb-6">
                <Award className="w-4 h-4" />
                Professional Credentials
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Certificates
                </span>
              </h2>
            </div>

            {certificates.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-2xl mb-6">
                  <Award className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-400 mb-3">No certificates yet</h3>
                <p className="text-slate-500 max-w-md mx-auto">Upload your professional certifications and credentials to showcase your expertise</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="relative aspect-video bg-slate-800">
                      {cert.photo ? (
                        <button
                          onClick={() => setSelectedImage(cert.photo)}
                          className="w-full h-full"
                        >
                          <img
                            src={cert.photo}
                            alt={cert.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </button>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
                          <Award className="w-16 h-16 text-slate-700" />
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <h4 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">{cert.name}</h4>
                      <p className="text-sm text-slate-400">{cert.issuer}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </p>
                      {cert.photo && (
                        <button className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-12 md:p-16 bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-2xl border border-purple-500/30 rounded-3xl overflow-hidden group hover:border-purple-400 transition-all duration-500">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating orbs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Star className="w-10 h-10 text-purple-400" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Want to Collaborate?
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                    I'm always open to discussing new initiatives, partnerships, or mentoring opportunities. Let's create something impactful together.
                  </p>
                </div>

                <a
                  href="mailto:m.h.ratul18@gmail.com"
                  className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 overflow-hidden relative"
                >
                  <Mail className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Get in Touch</span>
                  <ChevronRight className="w-6 h-6 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                </a>

                {/* Social Links */}
                <div className="flex justify-center gap-4 pt-4">
                  {[
                    { icon: Github, href: "https://github.com/ratul-notfound" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mahmud-hasan-ratul" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-xl border border-slate-700 hover:border-purple-500 rounded-xl transition-all hover:scale-110"
                    >
                      <social.icon className="w-7 h-7 text-slate-400 hover:text-purple-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-xl transition-all hover:scale-110 group"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </button>
          
          <div
            className="max-w-6xl w-full animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Achievement"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}