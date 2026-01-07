'use client';

import React, { useState } from 'react';
import { Award, Users, Trophy, Calendar, Download, ImageIcon, X, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const programs = [];

  const certificates = [];

  const stats = [
    { number: '0', label: 'Achievements' },
    { number: '0', label: 'Certificates' },
    { number: '0', label: 'Programs' },
    { number: '0', label: 'Total Hours' },
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(p => p.type === activeCategory);

  const categories = [
    { id: 'all', label: 'All Programs', count: programs.length },
    { id: 'program', label: 'Programs', count: programs.filter(p => p.type === 'program').length },
    { id: 'leadership', label: 'Leadership', count: programs.filter(p => p.type === 'leadership').length },
    { id: 'volunteer', label: 'Volunteer', count: programs.filter(p => p.type === 'volunteer').length },
    { id: 'award', label: 'Awards', count: programs.filter(p => p.type === 'award').length },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Bold Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Large indigo orb - top left */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20" />
        
        {/* Large purple orb - bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
        
        {/* Cyan orb - center right */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-15 transform -translate-y-1/2" />
        
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(79, 70, 229, 0.5) 25%, rgba(79, 70, 229, 0.5) 26%, transparent 27%, transparent 74%, rgba(79, 70, 229, 0.5) 75%, rgba(79, 70, 229, 0.5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(79, 70, 229, 0.5) 25%, rgba(79, 70, 229, 0.5) 26%, transparent 27%, transparent 74%, rgba(79, 70, 229, 0.5) 75%, rgba(79, 70, 229, 0.5) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Navbar />

      <div className="relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-14 md:mb-20 px-3 md:px-6">
            <div className="flex items-center gap-4 mb-6">
              <Trophy className="text-yellow-400" size={32} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">Leadership & Achievements</h2>
            </div>
            <p className="text-slate-400 text-base md:text-lg max-w-4xl leading-relaxed">
              As Vice President of DIUCPC, I&apos;ve led numerous programs, mentored 500+ students, and organized 15+ events at national and international levels. Here&apos;s a showcase of key initiatives and recognition.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 px-3 md:px-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-5 md:p-6 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg text-center hover:border-indigo-400/50 transition-colors">
                <p className="text-3xl md:text-4xl font-bold text-indigo-300">{stat.number}</p>
                <p className="text-xs md:text-sm text-slate-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-12 px-3 md:px-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 md:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                    : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-indigo-500/50'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="px-3 md:px-6 mb-20">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-lg">
                <Trophy size={48} className="mx-auto text-slate-600 mb-4" />
                <p className="text-slate-400 text-lg mb-2">No programs yet</p>
                <p className="text-slate-500 text-sm">Add your achievements, programs, and certifications here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                {filteredPrograms.map((prog, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                {/* Image Section */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden group">
                  {prog.photo ? (
                    <div className="w-full h-full cursor-pointer" onClick={() => setSelectedImage(prog.photo)}>
                      <img 
                        src={prog.photo} 
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <ImageIcon size={40} className="text-slate-600" />
                      <p className="text-sm text-slate-500 text-center px-4">Photo coming soon</p>
                      <span className="text-4xl">{prog.image}</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      prog.type === 'award' ? 'bg-yellow-500/20 text-yellow-300' :
                      prog.type === 'leadership' ? 'bg-indigo-500/20 text-indigo-300' :
                      prog.type === 'program' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-cyan-500/20 text-cyan-300'
                    }`}>
                      {prog.type.charAt(0).toUpperCase() + prog.type.slice(1)}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{prog.title}</h3>
                  <p className="text-indigo-400 font-semibold text-sm mb-3">{prog.role}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users size={16} />
                      <span>{prog.organization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar size={16} />
                      <span>{prog.date}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">{prog.description}</p>
                </div>
              </div>
                ))}
              </div>
            )}
          </div>

          {/* Certificates Section */}
          <div className="mb-20 px-3 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-indigo-400" size={28} />
              <h3 className="text-2xl md:text-3xl font-bold">Certificates & Credentials</h3>
            </div>

            {certificates.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/30 rounded-lg">
                <Award size={48} className="mx-auto text-indigo-600 mb-4" />
                <p className="text-slate-400 text-lg mb-2">No certificates yet</p>
                <p className="text-slate-500 text-sm">Upload your professional certifications and credentials</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {certificates.map((cert, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg overflow-hidden hover:border-indigo-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  {/* Certificate Image */}
                  <div className="relative h-40 bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden">
                    {cert.photo ? (
                      <div className="w-full h-full cursor-pointer" onClick={() => setSelectedImage(cert.photo)}>
                        <img 
                          src={cert.photo} 
                          alt={cert.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-indigo-950/50 to-purple-950/50">
                        <Award size={32} className="text-indigo-400/50" />
                        <p className="text-xs text-indigo-400/70 text-center px-2">Certificate</p>
                      </div>
                    )}
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4">
                    <h4 className="text-sm md:text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-indigo-500/20">
                      <p className="text-xs text-indigo-400 font-semibold">{cert.date}</p>
                      {cert.photo && (
                        <Download size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      )}
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 md:p-12 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/30 rounded-lg mb-20 md:mb-28 mx-3 md:mx-6">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">Want to collaborate?</h3>
            <p className="text-slate-400 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              I&apos;m always open to discussing new initiatives, partnerships, or mentoring opportunities. Let&apos;s build something amazing together!
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 hover:scale-105\"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Full view"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 p-2 rounded-lg transition-colors backdrop-blur-sm"
              aria-label="Close image"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
