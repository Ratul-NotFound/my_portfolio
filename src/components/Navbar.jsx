'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Code2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollTo('hero')}
              className="group flex items-center gap-2 md:gap-3 relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-slate-900 p-1.5 md:p-2 rounded-lg border border-slate-700 group-hover:border-cyan-500 transition-colors">
                  <Terminal className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm md:text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Ratul
                </span>
                <span className="text-[10px] md:text-xs text-slate-400 font-mono">
                  Developer
                </span>
              </div>
              {/* Pulse effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-cyan-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* CTA & Menu Button */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="/achievements"
                className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 hover:border-purple-400 rounded-lg text-xs md:text-sm font-medium text-purple-300 hover:text-purple-200 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Achievements</span>
              </Link>

              <button
                onClick={() => scrollTo('contact')}
                className="hidden sm:flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg text-xs md:text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Hire Me
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-cyan-300 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
              
              <Link
                href="/achievements"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full px-4 py-3 bg-purple-600/20 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-300 hover:bg-purple-600/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Achievements
              </Link>

              <button
                onClick={() => {
                  scrollTo('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-sm font-semibold text-white mt-2"
              >
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}