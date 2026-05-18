/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { Download, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import LightweightParticles from '../../components/LightweightParticles';

export default function Resume() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isHacker = theme === 'hacker';
  const isCreative = theme === 'creative';
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = '/Ratul_CV.pdf';
    link.download = 'Mahmud_Hasan_Ratul_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className={`min-h-screen ${isHacker ? 'bg-[#000600] text-[#00ff41]' : isCreative ? 'bg-[#030303] text-white' : isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'} relative overflow-hidden`}>
      
      {/* Background Particles */}
      <div className="no-print">
        <LightweightParticles />
      </div>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-24 relative z-10">
        
        {/* CV Utility Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-6 backdrop-blur-xl border rounded-2xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
          <div className="space-y-1">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-2"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Home</span>
            </a>
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isHacker ? 'font-mono' : ''}`}>Curriculum Vitae</h1>
            <p className="text-slate-400 text-sm">Official, professional industry-ready resume document.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-350 ${
                isHacker 
                  ? 'bg-[#00ff41] text-[#000600] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]' 
                  : isCreative 
                    ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90 hover:scale-[1.02]' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg'
              } disabled:opacity-50`}
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
            </button>

            <a
              href="/Ratul_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-sm border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Tab</span>
            </a>
          </div>
        </div>

        {/* ELEGANT PDF VIEWER CONTAINER (Standard A4 aspect ratio mockup) */}
        <div className="backdrop-blur-xl border rounded-2xl bg-white/5 border-white/10 overflow-hidden shadow-2xl p-2 md:p-4">
          <div className="relative w-full rounded-xl overflow-hidden bg-slate-900/60" style={{ height: '78vh' }}>
            <object
              data="/Ratul_CV.pdf"
              type="application/pdf"
              className="w-full h-full rounded-lg"
            >
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin + '/Ratul_CV.pdf' : '')}&embedded=true`}
                className="w-full h-full border-none rounded-lg"
                title="Mahmud Hasan Ratul CV PDF Viewer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90 text-slate-300 rounded-lg">
                <FileText className="w-16 h-16 text-slate-500 mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-white mb-2">Resume Preview Not Supported</h3>
                <p className="max-w-md text-sm text-slate-400 mb-6">
                  Your current web browser does not support embedding PDF files. Please click the button below to download the PDF to your system.
                </p>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
                >
                  Download PDF CV
                </button>
              </div>
            </object>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
