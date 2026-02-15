'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Code2, Sparkles, ChevronRight, Home, User, Briefcase, Wrench, Mail, Award, Sun, Moon, MonitorDot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const isAchievementsPage = pathname === '/achievements';
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const isHacker = theme === 'hacker';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isAchievementsPage) {
        const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAchievementsPage]);

  const scrollTo = (id) => {
    if (isAchievementsPage) {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      {/* Command Bar Style Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? isHacker
          ? 'bg-[#000400]/95 backdrop-blur-2xl border-b border-[#00ff41]/15 shadow-[0_0_20px_rgba(0,255,65,0.08)]'
          : isLight
            ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-lg shadow-slate-200/50'
            : 'bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl shadow-black/20'
        : 'bg-transparent'
        }`}>
        {/* Top Border Animation */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${isHacker ? 'from-transparent via-[#00ff41] to-transparent' : 'from-transparent via-cyan-500 to-transparent'} opacity-50`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Terminal Style */}
            <Link href="/" className="group flex items-center gap-3 relative">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-all duration-500"></div>

                {/* Icon Container */}
                <div className={`relative p-2 md:p-2.5 rounded-xl border transition-all duration-300 shadow-lg ${isHacker
                  ? 'bg-[#000a02] border-[#00ff41]/20 group-hover:border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.1)]'
                  : isLight
                    ? 'bg-gradient-to-br from-slate-100 to-white border-slate-200 group-hover:border-cyan-500'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 group-hover:border-cyan-500'
                  }`}>
                  <Terminal className={`w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform ${isHacker ? 'text-[#00ff41]' : 'text-cyan-400'}`} />

                  {/* Scan Line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className={`text-base md:text-xl font-bold ${isHacker ? 'text-[#00ff41] font-mono drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]' : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'}`}>
                  Ratul
                </span>
                <span className={`text-[10px] md:text-xs font-mono tracking-wider ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {'>'} Ai Automation Engineer
                </span>
              </div>

              {/* Typing Cursor */}
              <span className={`hidden md:block w-[2px] h-6 animate-blink ml-1 ${isHacker ? 'bg-[#00ff41]' : 'bg-cyan-400'}`}></span>
            </Link>

            {/* Desktop Menu - Command Style */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === item.id && !isAchievementsPage
                    ? isHacker
                      ? 'text-[#00ff41] bg-[#00ff41]/10'
                      : isLight
                        ? 'text-cyan-600 bg-cyan-50'
                        : 'text-cyan-400 bg-cyan-500/10'
                    : isHacker
                      ? 'text-[#00cc32]/70 hover:text-[#00ff41] hover:bg-[#00ff41]/5'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {activeSection === item.id && !isAchievementsPage && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full ${isHacker ? 'bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]' : 'bg-gradient-to-r from-cyan-500 to-purple-500'}`}></span>
                  )}
                </button>
              ))}

              {/* Divider */}
              <div className={`w-[1px] h-8 mx-2 ${isHacker ? 'bg-[#00ff41]/20' : isLight ? 'bg-slate-200' : 'bg-slate-700'}`}></div>

              {/* Achievements Badge */}
              <Link
                href="/achievements"
                className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isAchievementsPage
                  ? isHacker
                    ? 'text-[#00ff41] bg-[#00ff41]/10'
                    : isLight
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-purple-400 bg-purple-500/10'
                  : isHacker
                    ? 'text-[#00cc32]/70 hover:text-[#00ff41] hover:bg-[#00ff41]/5'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements
                  <Sparkles className={`w-3 h-3 ${isHacker ? 'text-[#00ff41]' : 'text-purple-400'}`} />
                </span>

                {isAchievementsPage && (
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full ${isHacker ? 'bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}></span>
                )}
              </Link>
            </div>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`relative p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 group ${isHacker
                  ? 'bg-[#000a02] border-[#00ff41]/20 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                  : isLight
                    ? 'bg-slate-100 border-slate-200 hover:border-purple-400 hover:bg-purple-50'
                    : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500 hover:bg-slate-800'
                  }`}
                aria-label={`Switch theme (current: ${theme})`}
                title={theme === 'dark' ? 'Switch to Light' : theme === 'light' ? 'Switch to Hacker' : 'Switch to Dark'}
              >
                {theme === 'hacker' ? (
                  <MonitorDot className="w-4 h-4 md:w-5 md:h-5 text-[#00ff41] group-hover:drop-shadow-[0_0_6px_rgba(0,255,65,0.8)] transition-all" />
                ) : theme === 'light' ? (
                  <Moon className="w-4 h-4 md:w-5 md:h-5 text-purple-500 group-hover:rotate-12 transition-transform" />
                ) : (
                  <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 group-hover:rotate-45 transition-transform" />
                )}
              </button>

              {/* Hire Me Button */}
              <button
                onClick={() => scrollTo('contact')}
                className={`hidden sm:flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:scale-105 ${isHacker
                  ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] font-mono'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white hover:shadow-cyan-500/30'
                  }`}
              >
                <span className="hidden md:inline">Hire Me</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden relative p-2 transition-colors ${isHacker ? 'text-[#00ff41]/70 hover:text-[#00ff41]' : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-cyan-300'}`}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 absolute inset-0 animate-fade-in" />
                  ) : (
                    <Menu className="w-6 h-6 absolute inset-0 animate-fade-in" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className={`backdrop-blur-2xl border-b shadow-2xl ${isHacker
            ? 'bg-[#000400]/98 border-[#00ff41]/15 shadow-[0_0_30px_rgba(0,255,65,0.05)]'
            : isLight
              ? 'bg-white/98 border-slate-200'
              : 'bg-slate-900/98 border-slate-800'
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {/* Terminal Header */}
              <div className={`flex items-center gap-2 px-4 py-2 mb-4 rounded-lg border ${isHacker
                ? 'bg-[#000a02] border-[#00ff41]/15'
                : isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-800/50 border-slate-700'
                }`}>
                <Terminal className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : 'text-cyan-400'}`} />
                <span className={`text-sm font-mono ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>Navigation Menu</span>
              </div>

              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === item.id && !isAchievementsPage
                    ? isHacker
                      ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20'
                      : isLight
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : isHacker
                      ? 'text-[#00cc32]/60 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border border-transparent'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                    }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen ? 'slide-up 0.3s ease-out' : 'none'
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}

              {/* Divider */}
              <div className={`h-[1px] my-3 ${isHacker ? 'bg-[#00ff41]/15' : isLight ? 'bg-slate-200' : 'bg-slate-800'}`}></div>

              {/* Achievements Link */}
              <Link
                href="/achievements"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${isAchievementsPage
                  ? isHacker
                    ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20'
                    : isLight
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                  : isHacker
                    ? 'bg-[#000a02] text-[#00cc32]/60 hover:bg-[#00ff41]/5 border border-[#00ff41]/10'
                    : isLight
                      ? 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      : 'bg-slate-800/30 text-slate-300 hover:bg-slate-800/50 border border-slate-700'
                  }`}
              >
                <Award className="w-5 h-5" />
                <span className="flex-1">Achievements</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </Link>

              {/* Hire Me - Mobile */}
              <button
                onClick={() => {
                  scrollTo('contact');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold mt-4 transition-all ${isHacker
                  ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 font-mono'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500'
                  }`}
              >
                <span>Hire Me</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}