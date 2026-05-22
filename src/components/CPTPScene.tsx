import React from 'react';
import { motion } from 'motion/react';
import { Target, Award, BookOpen, Compass, ArrowRight } from 'lucide-react';

interface CPTPSceneProps {
  onNext: () => void;
}

export default function CPTPScene({ onNext }: CPTPSceneProps) {
  const keywords = [
    'Transformasi Geometri',
    'Contextual Learning',
    'Game Based Learning',
    'Etnomatematika',
    'Representasi Matematis'
  ];

  return (
    <div className="relative min-h-screen bg-stone-50 flex flex-col justify-between p-6 text-stone-900 font-sans overflow-y-auto">
      
      {/* Background Chinese Wave/Cloud Watermark Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="clouds" width="80" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 20 Q 20 0 40 20 Q 60 40 80 20" fill="none" stroke="#b91c1c" strokeWidth="2" />
            <path d="M 40 40 Q 60 20 80 40 Q 100 60 120 40" fill="none" stroke="#d97706" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#clouds)" />
        </svg>
      </div>

      {/* TOP HEADER */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center mt-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-red-700 font-mono">Orientasi Pembelajaran</h2>
        <h1 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight mt-1 leading-tight">
          Target Capaian & Tujuan Pembelajaran
        </h1>
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-2">Mata Pelajaran: Matematika • Kelas: IX (Sembilan) • Semester: Genap</p>
      </div>

      {/* CORE CARDS BODY */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-stretch">
        
        {/* CAPAIAN PEMBELAJARAN (CP) CARD - LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col bg-white border-2 border-stone-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1c1917] justify-between"
        >
          <div>
            <div className="flex items-center gap-3 border-b-2 border-stone-100 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 border-2 border-stone-900 flex items-center justify-center text-red-700">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">Capaian Pembelajaran (CP)</h3>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-black font-mono">Kemampuan Akademis Utama</span>
              </div>
            </div>
            
            <p className="text-sm text-stone-800 leading-relaxed text-left bg-stone-50 p-4 rounded-xl border border-stone-200 font-medium">
              "Peserta didik mampu memahami dan menerapkan konsep 
              <span className="text-red-700 font-black font-mono"> transformasi geometri </span> 
              serta merepresentasikan ide matematika dalam bentuk 
              <span className="text-amber-600 font-extrabold font-mono"> visual</span>, 
              <span className="text-amber-600 font-extrabold font-mono"> simbolik</span>, dan 
              <span className="text-amber-600 font-extrabold font-mono"> verbal</span> 
              untuk menyelesaikan masalah kontekstual yang berkaitan dengan kearifan lokal."
            </p>
          </div>

          <div className="mt-6 border-t-2 border-stone-100 pt-4">
            <span className="text-[11px] uppercase font-mono font-black tracking-wider text-stone-400 block mb-2">Dimensi Kemampuan Representasi</span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-stone-50 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
                <span className="text-red-700 font-black block">1. Visual</span>
                <span className="text-[9px] text-stone-500 font-bold">Pola spasial & simetri</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
                <span className="text-stone-900 font-black block">2. Simbolik</span>
                <span className="text-[9px] text-stone-500 font-bold">Koordinat & formula</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
                <span className="text-red-700 font-black block">3. Verbal</span>
                <span className="text-[9px] text-stone-500 font-bold">Diskusi & cerita budaya</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TUJUAN PEMBELAJARAN (TP) CARD - RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col bg-white border-2 border-stone-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1c1917] justify-between"
        >
          <div>
            <div className="flex items-center gap-3 border-b-2 border-stone-100 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-stone-900 flex items-center justify-center text-amber-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">Tujuan Pembelajaran (TP)</h3>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-black font-mono">Tautan Hasil Belajar</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-stone-800 text-left">
              <li className="flex gap-3 items-start bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-lg bg-red-700 text-white text-xs font-black shrink-0 flex items-center justify-center mt-0.5">1</span>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-xs md:text-sm">Identifikasi Transformasi</h4>
                  <p className="text-xs text-stone-600">Siswa mampu mengidentifikasi dan mengonstruksi materi Refleksi, Translasi, Rotasi, dan Dilatasi.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-lg bg-red-700 text-white text-xs font-black shrink-0 flex items-center justify-center mt-0.5">2</span>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-xs md:text-sm">Ekspresi Representasi</h4>
                  <p className="text-xs text-stone-600">Siswa mampu menyajikan representasi geometri transformasi pada bidang koordinat visual r, simbolik, dan verbal.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-lg bg-red-700 text-white text-xs font-black shrink-0 flex items-center justify-center mt-0.5">3</span>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-xs md:text-sm">Penyelesaian Kontekstual</h4>
                  <p className="text-xs text-stone-600">Siswa mampu memecahkan persoalan matematika berakar kearifan lokal Pecinan Semarang secara kritis.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <span className="text-[10px] uppercase font-mono font-black tracking-widest text-stone-400 block mb-1">Materi Utama</span>
            <div className="flex gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-1 bg-red-100 border-2 border-stone-900 rounded-md font-black text-red-800">Refleksi</span>
              <span className="px-2.5 py-1 bg-amber-100 border-2 border-stone-900 rounded-md font-black text-amber-850">Translasi</span>
              <span className="px-2.5 py-1 bg-stone-100 border-2 border-stone-900 rounded-md font-black text-stone-800">Rotasi</span>
              <span className="px-2.5 py-1 bg-red-100 border-2 border-stone-900 rounded-md font-black text-red-800">Dilatasi</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOOTER ZONE: KEYWORDS & BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-wrap gap-4 items-center justify-between border-t-2 border-stone-200 pt-4"
      >
        <div className="flex flex-wrap gap-2 items-center text-stone-500">
          <span className="text-xs font-mono font-black tracking-wider text-stone-400 uppercase flex items-center gap-1.5 mr-2">
            <Compass className="w-4 h-4 animate-spin-slow text-red-700" />
            Kata Kunci:
          </span>
          {keywords.map((word) => (
            <span key={word} className="text-xs bg-white border-2 border-stone-900 text-stone-800 px-3 py-1 rounded-full font-bold shadow-[2px_2px_0px_0px_#1c1917]">
              #{word}
            </span>
          ))}
        </div>

        <button
          onClick={onNext}
          id="btn_cptp_next"
          className="bento-button-red px-6 py-3 text-sm flex items-center gap-2 shadow-[3px_3px_0px_0px_#1c1917]"
        >
          <span>Lanjut ke Menu Utama</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
