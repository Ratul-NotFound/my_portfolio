'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-8 md:py-12 text-center bg-gradient-to-t from-slate-950 via-slate-950 to-transparent backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-6 pb-6 border-b border-slate-800/30">
          <p className="text-slate-400 text-xs md:text-sm px-4 font-mono mb-3">
            <code className="text-green-400">{'<'}/</code>
            <code className="text-slate-300 font-semibold">Mahmud Hasan Ratul</code>
            <code className="text-green-400 font-mono">{'>'}</code>
            <code className="text-slate-500 mx-2">•</code>
            <code className="text-cyan-400">{new Date().getFullYear()}</code>
          </p>
          <p className="text-slate-500 text-xs px-4 font-mono">
            <span className="text-cyan-400 font-semibold">Specialization:</span> Full-Stack Engineering • <span className="text-purple-400">AI/ML Research</span> • <span className="text-yellow-400">Algorithm Design</span> • <span className="text-blue-400">System Architecture</span>
          </p>
        </div>
        <p className="text-slate-500 text-xs px-4 font-mono mb-4">
          <span className="text-green-400">status:</span> <span className="text-cyan-400">open for collaborations</span>
        </p>
        <div className="flex justify-center gap-6 md:gap-8 text-slate-500">
          <a
            href="https://linkedin.com/in/mahmud-hasan-ratul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors text-xs md:text-sm hover:bg-slate-800/40 px-3 py-2 rounded-lg"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} /> <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/ratul-notfound"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors text-xs md:text-sm hover:bg-slate-800/40 px-3 py-2 rounded-lg"
            aria-label="GitHub"
          >
            <Github size={16} /> <span>GitHub</span>
          </a>
          <a
            href="mailto:m.h.ratul18@gmail.com"
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors text-xs md:text-sm hover:bg-slate-800/40 px-3 py-2 rounded-lg"
            aria-label="Email"
          >
            <Mail size={16} /> <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
