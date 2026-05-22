import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, LogOut, Swords } from 'lucide-react';

interface SplashSceneProps {
  onStart: (name: string) => void;
  onExit: () => void;
}

export default function SplashScene({ onStart, onExit }: SplashSceneProps) {
  const [playerName, setPlayerName] = useState('Firdivana');
  return (
    <div className="relative min-h-screen bg-stone-50 overflow-hidden flex flex-col justify-between p-6 text-stone-900 font-sans">
      {/* Decorative Traditional Lantern Ornaments in Background - stylized high-contrast */}
      <div className="absolute top-0 left-10 w-24 h-56 pointer-events-none opacity-10">
        <svg viewBox="0 0 100 250" className="w-full h-full text-red-700 fill-current">
          <line x1="50" y1="0" x2="50" y2="50" stroke="currentColor" strokeWidth="3" />
          <rect x="35" y="50" width="30" height="15" rx="2" />
          <ellipse cx="50" cy="110" rx="35" ry="45" />
          <rect x="35" y="155" width="30" height="15" rx="2" />
          <line x1="50" y1="170" x2="50" y2="210" stroke="currentColor" strokeWidth="3" />
          <path d="M40,210 Q50,230 60,210 M45,210 L45,240 M50,210 L50,250 M55,210 L55,240" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-0 right-10 w-24 h-56 pointer-events-none opacity-10">
        <svg viewBox="0 0 100 250" className="w-full h-full text-red-700 fill-current">
          <line x1="50" y1="0" x2="50" y2="50" stroke="currentColor" strokeWidth="3" />
          <rect x="35" y="50" width="30" height="15" rx="2" />
          <ellipse cx="50" cy="110" rx="35" ry="45" />
          <rect x="35" y="155" width="30" height="15" rx="2" />
          <line x1="50" y1="170" x2="50" y2="210" stroke="currentColor" strokeWidth="3" />
          <path d="M40,210 Q50,230 60,210 M45,210 L45,240 M50,210 L50,250 M55,210 L55,240" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Subtle traditional warm gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none bg-gradient-to-t from-red-100/30 to-transparent z-0" />
      
      {/* 1. TOP HEADER LOGO BAR */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto w-full bg-white border-2 border-stone-900 rounded-3xl p-4 shadow-[4px_4px_0px_0px_#1c1917]"
      >
        <div className="flex items-center gap-3">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-red-700">Pendidikan Matematika</h4>
            <p className="text-[10px] text-stone-500 font-bold uppercase">Universitas Negeri Semarang</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-stone-100 px-3 py-1.5 rounded-xl border-2 border-stone-900">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-stone-800">LIDM 2026</span>
          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-md font-sans">Divisi II</span>
        </div>
      </motion.div>

      {/* 2. CORE TITLE ZONE */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full text-center py-12">
        
        {/* Visual Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 border-2 border-stone-900 text-red-800 text-xs font-black tracking-wide mb-6 shadow-[2px_2px_0px_0px_#1c1917]"
        >
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Etnomatematika Semarang Chinatown</span>
        </motion.div>

        {/* LUMION Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-red-700 font-sans leading-none">
            LUMION
          </h1>
          <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase text-stone-600 mt-2 font-mono">
            Ludo Mathematics Innovation
          </h2>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm md:text-base text-stone-800 leading-relaxed max-w-2xl mt-6 px-6 py-5 bg-white border-2 border-stone-900 rounded-3xl shadow-[4px_4px_0px_0px_#1c1917]"
        >
          Media pembelajaran berbasis permainan ludo digital interaktif yang memadukan{" "}
          <span className="text-red-700 font-extrabold">Contextual Learning</span>,{" "}
          <span className="text-stone-900 font-extrabold">Comic Card</span>, dan{" "}
          <span className="text-red-700 font-extrabold">Etnomatematika Semarang Chinatown</span> untuk meningkatkan kemampuan representasi matematis siswa pada materi geometri transformasi.
        </motion.p>

        {/* Name Input Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="w-full max-w-sm mt-6 p-4 bg-white border-2 border-stone-900 rounded-3xl shadow-[4px_4px_0px_0px_#1c1917] text-left"
        >
          <label htmlFor="player-name-input" className="block text-xs font-black uppercase tracking-widest text-stone-500 font-mono mb-1.5 text-center">
            Mulai dengan mengetikkan nama Anda:
          </label>
          <input
            id="player-name-input"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Masukkan nama Anda..."
            className="w-full px-4 py-2.5 bg-stone-50 border-2 border-stone-900 rounded-xl text-stone-900 text-sm font-black shadow-[2px_2px_0px_0px_#1c1917] focus:outline-none focus:bg-white transition-all text-center"
          />
        </motion.div>

        {/* Action Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full"
        >
          <button
            onClick={() => onStart(playerName)}
            id="btn_splash_start"
            className="bento-button-red px-8 py-4 text-base flex items-center gap-3 font-black uppercase text-white shadow-[4px_4px_0px_0px_#1c1917] hover:shadow-[1px_1px_0px_0px_#1c1917]"
          >
            <span>Mulai Petualangan</span>
            <Swords className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={onExit}
            id="btn_splash_exit"
            className="bento-button-stone px-6 py-4 text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_#1c1917]"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Aplikasi</span>
          </button>
        </motion.div>
      </div>

      {/* 3. LOWER CREDITS & TEAM IDENTITIES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto w-full bg-white border-2 border-stone-900 rounded-3xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center shadow-[4px_4px_0px_0px_#1c1917]"
      >
        {/* Left Side: Developers */}
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-black block mb-1">Identitas Tim Pengembang</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-stone-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-xs font-bold font-sans">Firdivana Aliffia M. (2404020021)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span className="text-xs font-bold font-sans">Surya Finisman H. (2404020030)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span className="text-xs font-bold font-sans">Natasya Aulia P. (2404020034)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Institution Details */}
        <div className="md:text-right text-stone-800">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-black block">Kualifikasi Kompetensi</span>
          <h5 className="text-xs font-extrabold text-stone-900 mt-0.5">S-1 Pendidikan Matematika FMIPA UNNES</h5>
          <p className="text-[10px] text-stone-500 font-medium">Jl. Sekaran, Gunungpati, Kota Semarang, Jawa Tengah</p>
        </div>
      </motion.div>
    </div>
  );
}
