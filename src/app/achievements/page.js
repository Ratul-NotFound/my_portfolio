'use client';
import React, { useState } from 'react';
import { Award, Users, Trophy, Calendar, Download, ImageIcon, X, Github, Linkedin, Mail, Sparkles, Star, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample data - replace with your actual achievements
  const programs = [
    {
      id: 1,
      title: "Vice President - DIUCPC",
      role: "Vice President",
      organization: "Daffodil International University Computer & Programming Club",
      date: "2023 - Present",
      type: "leadership",
      description: "Leading technical initiatives, organizing programming contests, and mentoring 500+ students in competitive programming and software development.",
      photo: null,
      image: "VP"
    },
    // Add more achievements here
  ];

  const certificates = [
    // Add your certificates here
  ];

  const stats = [
    { number: programs.length.toString(), label: 'Achievements', icon: Trophy },
    { number: certificates.length.toString(), label: 'Certificates', icon: Award },
    { number: programs.filter(p => p.type === 'program').length.toString(), label: 'Programs', icon: Target },
    { number: '500+', label: 'Students Mentored', icon: Users },
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(p => p.type === activeCategory);

  const categories = [
    { id: 'all', label: 'All', count: programs.length },
    { id: 'program', label: 'Programs', count: programs.filter(p => p.type === 'program').length },
    { id: 'leadership', label: 'Leadership', count: programs.filter(p => p.type === 'leadership').length },
    { id: 'volunteer', label: 'Volunteer', count: programs.filter(p => p.type === 'volunteer').length },
    { id: 'award', label: 'Awards', count: programs.filter(p => p.type === 'award').length },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300 mb-6">
              <Sparkles className="w-4 h-4" />
              Leadership & Recognition
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Achievements & Impact
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
              As Vice President of DIUCPC, I've led numerous programs, mentored 500+ students, 
              and organized 15+ events at national and international levels.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 rounded-2xl transition-all hover:scale-105"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-purple-500/50'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-20">
                <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-400 mb-2">No achievements yet</h3>
                <p className="text-slate-500">Add your achievements, programs, and certifications here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPrograms.map((prog, i) => (
                  <div
                    key={prog.id}
                    className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                  >
                    {/* Image Section */}
                    <div className="relative aspect-video bg-slate-800">
                      {prog.photo ? (
                        <button
                          onClick={() => setSelectedImage(prog.photo)}
                          className="w-full h-full"
                        >
                          <img
                            src={prog.photo}
                            alt={prog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </button>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">Photo coming soon</p>
                            <p className="text-2xl font-bold text-slate-600 mt-2">{prog.image}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-purple-600 rounded-lg text-xs font-semibold text-white">
                          {prog.type.charAt(0).toUpperCase() + prog.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {prog.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-purple-300 font-semibold">{prog.role}</p>
                        <p className="text-slate-400">{prog.organization}</p>
                        <p className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {prog.date}
                        </p>
                      </div>

                      <p className="text-slate-300">{prog.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Certificates Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Certificates & Credentials
              </span>
            </h2>

            {certificates.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
                <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-400 mb-2">No certificates yet</h3>
                <p className="text-slate-500">Upload your professional certifications and credentials</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all hover:scale-105"
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
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-16 h-16 text-slate-600" />
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-white mb-1">{cert.name}</h4>
                      <p className="text-sm text-slate-400">{cert.issuer}</p>
                      <p className="text-xs text-slate-500 mt-2">{cert.date}</p>
                      {cert.photo && (
                        <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
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
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl">
              <Star className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Want to collaborate?
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                I'm always open to discussing new initiatives, partnerships, or mentoring opportunities.
              </p>
              
              <a
                href="mailto:m.h.ratul18@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/30"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Achievement"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}