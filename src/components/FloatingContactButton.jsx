'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContactButton() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const isHacker = theme === 'hacker';
  const isCreative = theme === 'creative';
  const isLight = theme === 'light';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    // Initial trigger state check
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getThemeStyles = () => {
    if (isHacker) {
      return {
        btnClass: 'bg-[#000a02]/90 border-[#00ff41]/25 text-[#00ff41] hover:border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.15)] font-mono',
        pingClass: 'bg-[#00ff41]/20',
        tooltip: 'bg-[#000a02] border-[#00ff41]/30 text-[#00ff41]',
      };
    }
    if (isCreative) {
      return {
        btnClass: 'bg-[#0a0a0a]/90 border-white/10 text-[#0088ff] hover:border-[#ec4899] shadow-xl hover:shadow-[#0088ff]/15',
        pingClass: 'bg-[#ec4899]/20',
        tooltip: 'bg-[#0c0c0c] border-white/10 text-white font-serif italic',
      };
    }
    if (isLight) {
      return {
        btnClass: 'bg-white/90 border-slate-200 text-indigo-600 hover:border-indigo-500 shadow-lg hover:shadow-indigo-500/10',
        pingClass: 'bg-indigo-500/20',
        tooltip: 'bg-white border-slate-200 text-slate-800',
      };
    }
    // dark theme (default)
    return {
      btnClass: 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-400 shadow-2xl hover:shadow-cyan-400/15',
      pingClass: 'bg-cyan-400/20',
      tooltip: 'bg-slate-900 border-slate-800 text-white',
    };
  };

  const styles = getThemeStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group pointer-events-auto"
        >
          {/* Sliding interactive tooltip */}
          <span 
            className={`px-3 py-1.5 rounded-xl border text-xs md:text-sm font-semibold opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${styles.tooltip}`}
          >
            {isHacker ? '> CONNECT_NOW' : isCreative ? 'Get in Touch ✦' : 'Get in Touch 👋'}
          </span>

          {/* Waving floating action button */}
          <button
            onClick={handleClick}
            className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none ${styles.btnClass}`}
            aria-label="Scroll to contact section"
          >
            <Hand 
              className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:animate-wave`} 
              style={{
                transformOrigin: 'bottom right'
              }}
            />

            {/* Triple layered soft ping indicator glows */}
            <span className={`absolute inset-0 rounded-full animate-ping opacity-75 -z-10 ${styles.pingClass}`} style={{ animationDuration: '2.5s' }} />
            <span className={`absolute inset-0 rounded-full animate-pulse opacity-40 -z-10 ${styles.pingClass}`} style={{ animationDuration: '1.5s' }} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
