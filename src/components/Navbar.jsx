'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ChevronRight, Home, User, Briefcase, Wrench, Mail, Award, Sun, Moon, Sparkles } from 'lucide-react';
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

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
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
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left scroll-progress-bar"
        style={{
          scaleX,
          background: isHacker
            ? 'linear-gradient(90deg, #00ff41, #00cc32, #39ff14)'
            : 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)'
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? isHacker
            ? 'bg-[#000400]/95 backdrop-blur-2xl border-b border-[#00ff41]/15 shadow-[0_0_20px_rgba(0,255,65,0.08)]'
            : isLight
              ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-lg shadow-slate-200/50'
              : 'bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl shadow-black/20'
          : 'bg-transparent'
          }`}
      >
        {/* Top Gradient Line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${isHacker ? 'from-transparent via-[#00ff41] to-transparent' : 'from-transparent via-cyan-500 to-transparent'} opacity-50`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 relative">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-all duration-500" />
                <div className={`relative p-2 md:p-2.5 rounded-xl border transition-all duration-300 shadow-lg ${isHacker
                  ? 'bg-[#000a02] border-[#00ff41]/20 group-hover:border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.1)]'
                  : isLight
                    ? 'bg-gradient-to-br from-slate-100 to-white border-slate-200 group-hover:border-cyan-500'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 group-hover:border-cyan-500'
                  }`}>
                  <Terminal className={`w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform ${isHacker ? 'text-[#00ff41]' : 'text-cyan-400'}`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-base md:text-xl font-bold tracking-tight ${isHacker ? 'text-[#00ff41] font-mono drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]' : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'}`}>
                  Ratul
                </span>
                <span className={`text-[10px] md:text-xs font-mono tracking-wider ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {'>'} Ai Automation Engineer
                </span>
              </div>
              <span className={`hidden md:block w-[2px] h-6 animate-blink ml-1 ${isHacker ? 'bg-[#00ff41]' : 'bg-cyan-400'}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeSection === item.id && !isAchievementsPage
                    ? isHacker ? 'text-[#00ff41]' : isLight ? 'text-cyan-600' : 'text-cyan-400'
                    : isHacker ? 'text-[#00cc32]/70 hover:text-[#00ff41]' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {/* Animated background pill */}
                  {activeSection === item.id && !isAchievementsPage && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: isHacker
                          ? 'rgba(0,255,65,0.1)'
                          : isLight
                            ? 'rgba(6,182,212,0.08)'
                            : 'rgba(6,182,212,0.1)'
                      }}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {/* Bottom indicator line */}
                  {activeSection === item.id && !isAchievementsPage && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full ${isHacker ? 'bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]' : 'bg-gradient-to-r from-cyan-500 to-purple-500'}`}
                    />
                  )}
                </button>
              ))}

              {/* Divider */}
              <div className={`w-[1px] h-8 mx-2 ${isHacker ? 'bg-[#00ff41]/20' : isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />

              {/* Achievements */}
              <Link
                href="/achievements"
                className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isAchievementsPage
                  ? isHacker ? 'text-[#00ff41]' : isLight ? 'text-purple-600' : 'text-purple-400'
                  : isHacker ? 'text-[#00cc32]/70 hover:text-[#00ff41]' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                  }`}
              >
                {isAchievementsPage && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: isHacker ? 'rgba(0,255,65,0.1)' : isLight ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.1)' }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements
                  <Sparkles className={`w-3 h-3 ${isHacker ? 'text-[#00ff41]' : 'text-purple-400'}`} />
                </span>
              </Link>
            </div>

            {/* Right: Theme + Hire Me + Mobile */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 hover:scale-105 ${isHacker
                  ? 'bg-[#000a02] border-[#00ff41]/20 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                  : isLight
                    ? 'bg-white/80 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-md'
                    : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500 hover:bg-slate-800'
                  }`}
                aria-label={`Switch theme (current: ${theme})`}
                title={theme === 'dark' ? 'Switch to Light' : theme === 'light' ? 'Switch to Hacker' : 'Switch to Dark'}
              >
                <div className="relative w-5 h-5 md:w-[22px] md:h-[22px]">
                  <Sun className={`absolute inset-0 w-full h-full text-yellow-400 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`} />
                  <Moon className={`absolute inset-0 w-full h-full text-indigo-500 transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                  <Terminal className={`absolute inset-0 w-full h-full text-[#00ff41] transition-all duration-300 ${theme === 'hacker' ? 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_4px_rgba(0,255,65,0.6)]' : 'opacity-0 rotate-90 scale-50'}`} />
                </div>
                <span className={`hidden lg:block text-xs font-medium ${isHacker ? 'text-[#00ff41]/80 font-mono' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Dev'}
                </span>
              </button>

              {/* Hire Me */}
              <motion.button
                onClick={() => scrollTo('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`hidden sm:flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-semibold transition-colors overflow-hidden relative ${isHacker
                  ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] font-mono'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                  }`}
              >
                <span className="relative z-10 hidden md:inline">Hire Me</span>
                <ChevronRight className="w-4 h-4 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden relative p-2 transition-colors ${isHacker ? 'text-[#00ff41]/70 hover:text-[#00ff41]' : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-cyan-300'}`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden"
            >
              <div className={`backdrop-blur-2xl border-b shadow-2xl ${isHacker
                ? 'bg-[#000400]/98 border-[#00ff41]/15'
                : isLight ? 'bg-white/98 border-slate-200'
                : 'bg-slate-900/98 border-slate-800'
                }`}>
                <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
                  <div className={`flex items-center gap-2 px-4 py-2 mb-4 rounded-lg border ${isHacker ? 'bg-[#000a02] border-[#00ff41]/15' : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'}`}>
                    <Terminal className={`w-4 h-4 ${isHacker ? 'text-[#00ff41]' : 'text-cyan-400'}`} />
                    <span className={`text-sm font-mono ${isHacker ? 'text-[#00cc32]/70' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>Navigation Menu</span>
                  </div>

                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === item.id && !isAchievementsPage
                        ? isHacker ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20' : isLight ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : isHacker ? 'text-[#00cc32]/60 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border border-transparent' : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent' : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}

                  <div className={`h-[1px] my-3 ${isHacker ? 'bg-[#00ff41]/15' : isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

                  <Link
                    href="/achievements"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${isAchievementsPage
                      ? isHacker ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20' : isLight ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                      : isHacker ? 'bg-[#000a02] text-[#00cc32]/60 hover:bg-[#00ff41]/5 border border-[#00ff41]/10' : isLight ? 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200' : 'bg-slate-800/30 text-slate-300 hover:bg-slate-800/50 border border-slate-700'
                      }`}
                  >
                    <Award className="w-5 h-5" />
                    <span className="flex-1">Achievements</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </Link>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { scrollTo('contact'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold mt-4 transition-all ${isHacker
                      ? 'bg-[#00ff41]/15 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/25 font-mono'
                      : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500'
                      }`}
                  >
                    <span>Hire Me</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}