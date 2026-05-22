import React from 'react';
import { motion } from 'motion/react';
import { Award, RotateCcw, Home, Sparkles, TrendingUp, ThumbsUp, Medal, AlertCircle, BookOpen } from 'lucide-react';
import { Player } from '../types';

interface EvaluationDashboardProps {
  player: Player;
  onRestart: () => void;
  onBackToMainMenu: () => void;
}

export default function EvaluationDashboard({
  player,
  onRestart,
  onBackToMainMenu
}: EvaluationDashboardProps) {
  // Extract statistics
  const score = player.score;
  const correct = player.correctAnswers;
  const total = player.totalAnswers;
  const incorrect = total - correct;
  
  // Calculate representation stats percentage safely
  const getPercentage = (obtained: number, totalQuestions: number) => {
    if (totalQuestions === 0) return 0;
    return Math.round((obtained / totalQuestions) * 100);
  };

  const visualPercent = getPercentage(player.representationStats.visual, player.representationStats.totalVisual);
  const symbolicPercent = getPercentage(player.representationStats.symbolic, player.representationStats.totalSymbolic);
  const verbalPercent = getPercentage(player.representationStats.verbal, player.representationStats.totalVerbal);

  // Overall connections capability score is the average of visual, symbolic, verbal
  const connectionScore = Math.round((visualPercent + symbolicPercent + verbalPercent) / 3);

  // Math representation category mapping
  const getEvaluationRank = (scoreVal: number) => {
    if (scoreVal >= 85) return { text: 'Sangat Baik', color: 'text-emerald-700 bg-emerald-50 border-emerald-500', quote: 'Luar biasa! Anda telah menguasai dan mengoneksikan segenap dimensi representasi matematis lewat eksplorasi budaya Pecinan.' };
    if (scoreVal >= 70) return { text: 'Baik', color: 'text-indigo-700 bg-indigo-50 border-indigo-400', quote: 'Sangat bagus! Kemampuan representasi Anda berada di atas rata-rata. Teruskan kebiasaan bernalar kritis Anda!' };
    if (scoreVal >= 55) return { text: 'Cukup', color: 'text-amber-750 bg-amber-55 border-amber-400', quote: 'Cukup baik! Anda mulai memahami korelasi etnomatematika dengan koordinat. Perbanyak latihan memodelkan grafik.' };
    return { text: 'Kurang', color: 'text-red-700 bg-red-50 border-red-400', quote: 'Jangan berkecil hati! Tingkatkan kembali fokus observasi visual Anda pada struktur objek budaya untuk memahami polanya.' };
  };

  const currentRank = getEvaluationRank(connectionScore);

  return (
    <div className="relative min-h-screen bg-stone-50 flex flex-col justify-between p-6 text-stone-900 font-sans overflow-y-auto">
      
      {/* Background traditional wave clouds */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="eval-clouds" width="80" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 20 Q 20 0 40 20 Q 60 40 80 20" fill="none" stroke="#b91c1c" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#eval-clouds)" />
        </svg>
      </div>

      {/* HEADER ZONE */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center mt-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 border-2 border-stone-900 text-red-800 text-xs font-mono font-black uppercase mb-3 shadow-[1px_1px_0px_0px_#1c1917]">
          <Medal className="w-3.5 h-3.5 text-amber-600" />
          <span>Hasil Pembelajaran Selesai</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 leading-none">Evaluasi Kemampuan Representasi</h1>
        <p className="text-xs text-stone-500 mt-2 font-bold uppercase">Penilaian diagnostik kompetensi geometri transformasi dalam konteks budaya Gang Baru, Tay Kak Sie, dan Sam Poo Kong.</p>
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch my-6">
        
        {/* LEFT COLUMN: CRITICAL CAPABILITIES EXPLANATION (7 COLS) */}
        <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-4">
          
          {/* Card: diagnostic indicators of 3 kinds of representations */}
          <div className="bg-white rounded-3xl border-2 border-stone-900 p-5 flex-1 flex flex-col justify-between shadow-[4px_4px_0px_0px_#1c1917]">
            <div>
              <h3 className="text-xs font-black text-stone-500 border-b-2 border-stone-100 pb-3 mb-4 uppercase tracking-widest font-mono">Indikator Dimensi Representasi</h3>
              
              <div className="space-y-4">
                {/* 1. Visual */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-emerald-750 font-sans">1. Representasi Visual</span>
                    <span className="font-mono text-emerald-800 font-black">{visualPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-100 rounded-full border-2 border-stone-900 overflow-hidden shadow-[1px_1px_0px_0px_#1c1917]">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${visualPercent}%` }} 
                      transition={{ duration: 1 }} 
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                  <p className="text-[10px] text-stone-550 font-sans font-medium leading-relaxed text-left">
                    Kemampuan memahami pola spasial, orientasi arah lampion, dan pencerminan gapura.
                  </p>
                </div>

                {/* 2. Symbolic */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-sky-850 font-sans">2. Representasi Simbolik</span>
                    <span className="font-mono text-sky-800 font-black">{symbolicPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-100 rounded-full border-2 border-stone-900 overflow-hidden shadow-[1px_1px_0px_0px_#1c1917]">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${symbolicPercent}%` }} 
                      transition={{ duration: 1, delay: 0.2 }} 
                      className="h-full bg-sky-500" 
                    />
                  </div>
                  <p className="text-[10px] text-stone-550 font-sans font-medium leading-relaxed text-left">
                    Kemampuan menghitung koordinat Kartesius bayangan r, pergeseran t, rotasi r, dan dilatasi k.
                  </p>
                </div>

                {/* 3. Verbal */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-amber-700 font-sans">3. Representasi Verbal</span>
                    <span className="font-mono text-amber-800 font-black">{verbalPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-100 rounded-full border-2 border-stone-900 overflow-hidden shadow-[1px_1px_0px_0px_#1c1917]">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${verbalPercent}%` }} 
                      transition={{ duration: 1, delay: 0.4 }} 
                      className="h-full bg-amber-500" 
                    />
                  </div>
                  <p className="text-[10px] text-stone-550 font-sans font-medium leading-relaxed text-left">
                    Kemampuan menerjemahkan cerita kebudayaan Semarang Chinatown ke dalam pemikiran konsep logis.
                  </p>
                </div>
              </div>
            </div>

            {/* Connection Rating Gauge */}
            <div className="mt-6 pt-4 border-t-2 border-stone-100 flex items-center justify-between bg-stone-50 p-3.5 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-left">
                  <h4 className="text-xs font-black text-stone-900">Rerata Konektivitas Pengetahuan</h4>
                  <p className="text-[9px] text-stone-500 font-bold uppercase font-mono">Mengukur jalinan etnis dan pilar geometri</p>
                </div>
              </div>
              <span className="text-base font-black text-stone-900 font-mono bg-white px-3 py-1 rounded-xl border-2 border-stone-900 shadow-[1px_1px_0px_0px_#1c1917]">{connectionScore} pts</span>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: PENILAIAN KATAGORI & SUMMARY (5 COLS) */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
          
          {/* Card: Category and evaluation ranks */}
          <div className="bg-white rounded-3xl border-2 border-stone-900 p-5 flex flex-col items-center justify-between text-center shadow-[4px_4px_0px_0px_#1c1917]">
            <div className="w-full">
              <h3 className="text-xs font-black text-stone-500 border-b-2 border-stone-100 pb-3 mb-4 uppercase tracking-widest font-mono">Level Evaluasi Siswa</h3>
              
              {/* Category Circle Gauge */}
              <div className="w-24 h-24 rounded-full border-4 border-stone-900 bg-amber-50 flex flex-col items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#1a1a1a] relative mb-5">
                <span className="text-[8px] uppercase font-mono tracking-widest text-stone-400 font-black block">Skor Ludo</span>
                <span className="text-2xl font-black tracking-tight text-red-700">{score ? `${score}` : '0'}</span>
                <span className="text-[8px] text-stone-500 font-bold uppercase font-sans">Poin</span>
              </div>

              {/* Rank Tag */}
              <div className={`px-4 py-2.5 rounded-2xl border-2 border-stone-900 font-black text-xs tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#1c1917] ${currentRank.color}`}>
                Kategori: {currentRank.text}
              </div>

              {/* Rank Educational Quote comments */}
              <p className="text-xs text-stone-800 leading-relaxed text-left bg-stone-50 p-4 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] min-h-[90px] font-sans font-medium">
                {currentRank.quote}
              </p>
            </div>

            {/* Answer breakdown counters */}
            <div className="grid grid-cols-2 gap-3 mt-4 w-full">
              <div className="bg-emerald-50 border-2 border-stone-900 p-2 rounded-2xl text-center text-xs shadow-[1.5px_1.5px_0px_0px_#1c1917]">
                <span className="text-emerald-700 block font-black font-mono text-base">{correct}</span>
                <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Benar</span>
              </div>
              <div className="bg-red-50 border-2 border-stone-900 p-2 rounded-2xl text-center text-xs shadow-[1.5px_1.5px_0px_0px_#1c1917]">
                <span className="text-red-700 block font-black font-mono text-base">{incorrect}</span>
                <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Salah</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FOOTER ACTIONS PLATFORM */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto w-full flex flex-wrap gap-4 items-center justify-between border-t-2 border-stone-200 pt-4"
      >
        <div className="flex gap-2.5 items-center text-xs text-stone-600 bg-white border-2 border-stone-900 px-4 py-3 rounded-2xl text-left shadow-[2px_2px_0px_0px_#1c1917] max-w-md">
          <BookOpen className="w-5 h-5 text-red-750 shrink-0" />
          <p className="font-sans font-semibold">
            Pembelajaran selesai. Terus tingkatkan kemampuan representasi matematis melalui eksplorasi budaya dan permainan interaktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRestart}
            id="btn_eval_restart"
            className="bento-button-stone px-5 py-3.5 text-xs flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Ulang Game</span>
          </button>

          <button
            onClick={onBackToMainMenu}
            id="btn_eval_back_menu"
            className="bento-button-red px-6 py-3.5 text-xs flex items-center gap-2 uppercase tracking-wide"
          >
            <Home className="w-4 h-4" />
            <span>Selesai & Keluar</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
