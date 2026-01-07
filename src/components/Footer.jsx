'use client';
import React from 'react';
import { Github, Linkedin, Mail, Terminal, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/ratul-notfound", 
      label: "GitHub",
      color: "hover:text-white"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/in/mahmud-hasan-ratul", 
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    { 
      icon: Mail, 
      href: "mailto:m.h.ratul18@gmail.com", 
      label: "Email",
      color: "hover:text-cyan-400"
    }
  ];

  return (
    <footer className="relative mt-20 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      {/* Animated Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left - Terminal Card */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 group-hover:border-cyan-500 transition-colors">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Ratul</h3>
                <p className="text-xs text-slate-400 font-mono">v2.0.0</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400 font-mono">
                <span className="text-cyan-400">$</span> whoami
              </p>
              <p className="text-slate-300 pl-4">
                Full-Stack Engineer<br/>
                AI/ML Researcher<br/>
                System Architect
              </p>
            </div>
          </div>

          {/* Center - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
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
                  onClick={() => {
                    const el = document.getElementById(link.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-slate-600">•</span>
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>using Next.js & Tailwind</span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  All systems operational
                </span>
              </div>

              {/* Scroll to Top */}
              <button
                onClick={scrollToTop}
                className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-lg transition-all group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}