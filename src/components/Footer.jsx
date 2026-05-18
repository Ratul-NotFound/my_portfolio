'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, Heart, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isHacker = theme === 'hacker';
  const isCreative = theme === 'creative';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ratul-notfound', label: 'GitHub', color: isHacker ? 'hover:text-[#00ff41]' : isCreative ? 'hover:text-[#2c2520]' : isLight ? 'hover:text-slate-900' : 'hover:text-white' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mahmud-hasan-ratul', label: 'LinkedIn', color: isHacker ? 'hover:text-[#00ff41]' : isCreative ? 'hover:text-[#3f6655]' : isLight ? 'hover:text-blue-600' : 'hover:text-blue-400' },
    { icon: Mail, href: 'mailto:m.h.ratul18@gmail.com', label: 'Email', color: isHacker ? 'hover:text-[#00ff41]' : isCreative ? 'hover:text-[#c44b31]' : isLight ? 'hover:text-indigo-600' : 'hover:text-cyan-400' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer
      ref={ref}
      className={`relative mt-20 border-t backdrop-blur-sm ${isHacker
        ? 'border-[#00ff41]/15 bg-[#000400]/80'
        : isCreative
          ? 'border-[#dcd4c8] bg-[#faf8f5]/85'
          : isLight ? 'border-slate-200 bg-white/60'
          : 'border-slate-800 bg-slate-900/50'
        }`}
    >
      {/* Animated top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${isHacker ? 'from-transparent via-[#00ff41] to-transparent' : isCreative ? 'from-transparent via-[#c44b31] to-transparent' : 'from-transparent via-cyan-500 to-transparent'} opacity-50`} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left — Terminal Card */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 group">
              <div className={`p-2 rounded-lg border transition-colors ${isHacker ? 'bg-[#000a02] border-[#00ff41]/15 group-hover:border-[#00ff41]' : isCreative ? 'bg-[#faf8f5] border-[#dcd4c8] group-hover:border-[#c44b31]' : isLight ? 'bg-slate-50 border-slate-200 group-hover:border-cyan-500' : 'bg-slate-800 border-slate-700 group-hover:border-cyan-500'}`}>
                <Terminal className={`w-5 h-5 ${isHacker ? 'text-[#00ff41]' : isCreative ? 'text-[#c44b31]' : 'text-cyan-400'}`} />
              </div>
              <div>
                <h3 className={`font-bold ${isHacker ? 'text-[#00ff41]' : isLight ? 'text-slate-900' : 'text-white'}`}>Ratul</h3>
                <p className={`text-xs font-mono ${isHacker ? 'text-[#00cc32]/60' : isCreative ? 'text-[#8c6e58] cursive-accent' : 'text-slate-400'}`}>v2.0.0</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className={`font-mono ${isHacker ? 'text-[#00cc32]/70' : isCreative ? 'text-[#8c6e58] cursive-accent' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className={isHacker ? 'text-[#00ff41]' : isCreative ? 'text-[#c44b31] cursive-accent' : 'text-cyan-400'}>$</span> whoami
              </p>
              <p className={`pl-4 ${isHacker ? 'text-[#00cc32]' : isCreative ? 'text-[#2c2520] font-serif italic' : isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Full-Stack Engineer<br />
                AI/ML Researcher<br />
                System Architect
              </p>
            </div>
          </motion.div>

          {/* Center — Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isHacker ? 'text-[#00ff41]' : isCreative ? 'text-[#2c2520] font-serif italic' : isLight ? 'text-slate-900' : 'text-white'}`}>
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Projects', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'About', id: 'about' },
                { label: 'Contact', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => { const el = document.getElementById(link.id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`text-left text-sm transition-all hover:translate-x-1 ${isHacker ? 'text-[#00cc32]/60 hover:text-[#00ff41]' : isCreative ? 'text-[#6b5d54] hover:text-[#c44b31] font-serif italic' : isLight ? 'text-slate-500 hover:text-cyan-600' : 'text-slate-400 hover:text-cyan-400'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isHacker ? 'text-[#00ff41]' : isCreative ? 'text-[#2c2520] font-serif italic' : isLight ? 'text-slate-900' : 'text-white'}`}>
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${social.color} ${isHacker
                    ? 'bg-[#000a02] hover:bg-[#00ff41]/5 border-[#00ff41]/15 hover:border-[#00ff41]/40'
                    : isCreative ? 'bg-[#faf8f5] hover:bg-white border-[#dcd4c8] hover:border-[#c44b31]'
                    : isLight ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 hover:border-slate-600'
                    }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div variants={itemVariants} className={`mt-12 pt-8 border-t ${isHacker ? 'border-[#00ff41]/15' : isCreative ? 'border-[#dcd4c8]' : isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className={`flex items-center gap-2 text-sm ${isHacker ? 'text-[#00cc32]/60' : isCreative ? 'text-[#6b5d54]' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>© {new Date().getFullYear()}</span>
              <span className={isHacker ? 'text-[#00ff41]/30' : isLight ? 'text-slate-300' : 'text-slate-600'}>•</span>
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>using Next.js & Tailwind</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className={`text-xs font-mono ${isHacker ? 'text-[#00ff41]/60' : isCreative ? 'text-[#3f6655]' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  All systems operational
                </span>
              </div>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 border rounded-lg transition-all ${isHacker
                  ? 'bg-[#000a02] hover:bg-[#00ff41]/5 border-[#00ff41]/15 hover:border-[#00ff41]'
                  : isCreative ? 'bg-[#faf8f5] hover:bg-white border-[#dcd4c8] hover:border-[#c44b31]'
                  : isLight ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-500'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-cyan-500'
                  }`}
                aria-label="Scroll to top"
              >
                <ArrowUp className={`w-4 h-4 transition-colors ${isHacker ? 'text-[#00cc32]/60 hover:text-[#00ff41]' : isCreative ? 'text-[#6b5d54] hover:text-[#c44b31]' : isLight ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-cyan-400'}`} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl ${isHacker ? 'bg-[#00ff41]/3' : isCreative ? 'bg-[#c44b31]/3' : isLight ? 'bg-cyan-500/3' : 'bg-cyan-500/5'}`} />
        <div className={`absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl ${isHacker ? 'bg-[#00cc32]/3' : isCreative ? 'bg-[#3f6655]/3' : isLight ? 'bg-purple-500/3' : 'bg-purple-500/5'}`} />
      </div>
    </footer>
  );
}