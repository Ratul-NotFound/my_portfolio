'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-slate-950/93 backdrop-blur-2xl border-slate-700/50 py-3 md:py-3.5 shadow-2xl shadow-indigo-500/15'
          : 'bg-gradient-to-b from-slate-950/60 to-slate-950/0 border-transparent py-6 md:py-8'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-xl md:text-2xl tracking-tight text-slate-100 flex items-center gap-3 cursor-pointer hover:text-indigo-300 transition-colors duration-300 group"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-base md:text-lg shadow-lg shadow-indigo-500/50 group-hover:shadow-indigo-500/70 transition-all duration-300">
            <span className="text-white font-mono font-black text-xl">λ</span>
          </div>
          <span className="font-black">Ratul</span>
          <span className="text-indigo-400 font-mono text-xs md:text-sm font-bold">dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 xl:gap-1 text-sm font-semibold text-slate-400">
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="relative px-4 py-2 hover:text-indigo-300 transition-colors duration-300 group rounded-lg hover:bg-slate-900/40"
              aria-label={`Navigate to ${item}`}
            >
              {item}
              <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          ))}
          <Link
            href="/achievements"
            className="relative px-4 py-2 hover:text-indigo-300 transition-colors duration-300 group rounded-lg hover:bg-slate-900/40"
            aria-label="View achievements and awards"
          >
            Achievements
            <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <div className="w-px h-6 bg-slate-700/40 mx-1"></div>
          <a
            href="mailto:m.h.ratul18@gmail.com"
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white rounded-lg hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-500 transition-all duration-300 font-bold text-sm shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 hover:-translate-y-0.5"
            aria-label="Hire me via email"
          >
            Get In Touch
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-indigo-400 transition-colors duration-200 p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 animate-in fade-in slide-in-from-top-2 shadow-2xl shadow-slate-900/50">
          <div className="px-4 py-6 space-y-2">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="w-full text-left px-5 py-3 text-slate-300 hover:text-indigo-300 hover:bg-slate-800/50 rounded-lg transition-all duration-200 font-semibold text-base"
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </button>
            ))}
            <Link
              href="/achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-5 py-3 text-slate-300 hover:text-indigo-300 hover:bg-slate-800/50 rounded-lg transition-all duration-200 font-semibold text-base block"
              aria-label="View achievements and awards"
            >
              Achievements
            </Link>
            <div className="pt-3 border-t border-slate-800/50 mt-4">
              <a
                href="mailto:m.h.ratul18@gmail.com"
                className="block w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all duration-200 font-semibold text-center shadow-lg shadow-indigo-500/25"
                aria-label="Hire me via email"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
