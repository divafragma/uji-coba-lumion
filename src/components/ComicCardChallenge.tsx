import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Send, HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, Eye, Milestone } from 'lucide-react';
import { Question, TransformType } from '../types';

interface ComicCardChallengeProps {
  question: Question;
  streakCount: number; // For Yard Exit streak logging (0/1/2/3)
  mode: 'EXIT' | 'MOVE'; // Mode of player challenge
  onSuccess: () => void;
  onFail: () => void;
}

export default function ComicCardChallenge({
  question,
  streakCount,
  mode,
  onSuccess,
  onFail
}: ComicCardChallengeProps) {
  // Stages: 0 = EKSPLORASI BUDAYA (Visual & Story), 1 = OBSERVASI SPASIAL (Stimulus), 2 = SOAL MATEMATIKA (Coordinate MCQ)
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Render highly-crafted themed inline vector schemas for each Semarang Chinatown landmark
  const renderChinatownVisual = (landmark: string) => {
    switch (landmark) {
      case 'Gapura Pecinan Semarang':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            {/* Soft cream background */}
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            <g transform="translate(10, 10)">
              {/* Symmetrical Pillars */}
              <rect x="120" y="80" width="16" height="80" fill="#b91c1c" stroke="#1c1917" strokeWidth="2" rx="2" />
              <rect x="250" y="80" width="16" height="80" fill="#b91c1c" stroke="#1c1917" strokeWidth="2" rx="2" />
              {/* Symmetric Dragon/Decoration Left and Right */}
              <path d="M 80 130 Q 100 120 120 130" stroke="#d97706" strokeWidth="3" fill="none" />
              <path d="M 300 130 Q 280 120 260 130" stroke="#d97706" strokeWidth="3" fill="none" />
              <circle cx="90" cy="125" r="4" fill="#ef4444" stroke="#1c1917" strokeWidth="1" />
              <circle cx="290" cy="125" r="4" fill="#ef4444" stroke="#1c1917" strokeWidth="1" />
              {/* Symmetric Roof Curves */}
              <path d="M 80 80 Q 190 40 300 80 L 290 90 Q 190 55 90 90 Z" fill="#15803d" stroke="#1c1917" strokeWidth="2" />
              <path d="M 110 55 Q 190 20 270 55" stroke="#d97706" strokeWidth="4" fill="none" />
              {/* Central axis line representing symmetry */}
              <line x1="190" y1="20" x2="190" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />
              <text x="195" y="40" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="black">Sumbu Y (Cermin)</text>
              {/* Coordinate points */}
              <circle cx="90" cy="125" r="6" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" />
              <text x="35" y="120" fill="#7c2d12" fontSize="11" fontWeight="black" fontFamily="monospace">K(-4, 5)</text>
              <circle cx="290" cy="125" r="6" fill="#10b981" stroke="#1c1917" strokeWidth="1.5" />
              <text x="305" y="120" fill="#064e3b" fontSize="11" fontWeight="black" fontFamily="monospace">K'(4, 5)</text>
            </g>
          </svg>
        );

      case 'Klenteng Tay Kak Sie (Refleksi Kolam)':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            {/* Real Building */}
            <g transform="translate(100, 0)">
              {/* Ornaments */}
              <rect x="60" y="10" width="80" height="40" fill="#7f1d1d" stroke="#1c1917" strokeWidth="2" rx="4" />
              <polygon points="50,25 150,25 140,10 60,10" fill="#14532d" stroke="#1c1917" strokeWidth="2" />
              {/* Lamp at H(3, 6) */}
              <circle cx="100" cy="40" r="6" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" />
              <line x1="100" y1="25" x2="100" y2="40" stroke="#1c1917" strokeWidth="1.5" />
              <text x="112" y="38" fill="#7c2d12" fontSize="11" fontWeight="black" fontFamily="monospace">H(3, 6)</text>
            </g>
            {/* Kolam Horizontal Line Sumbu X */}
            <line x1="20" y1="90" x2="380" y2="90" stroke="#0284c7" strokeWidth="3" />
            <text x="260" y="85" fill="#0284c7" fontSize="10" fontFamily="monospace" fontWeight="black">Permukaan Sumbu X</text>
            {/* Water Wave Reflections */}
            <g transform="translate(100, 90)" opacity="0.8">
              {/* Reflected Lamp */}
              <circle cx="100" cy="50" r="6" fill="#ef4444" stroke="#1c1917" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="50" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="112" y="55" fill="#b91c1c" fontSize="11" fontWeight="black" fontFamily="monospace">H'(3, -6)</text>
              {/* Blurred reflected contour */}
              <rect x="60" y="40" width="80" height="20" fill="#fee2e2" opacity="0.4" stroke="#1c1917" strokeWidth="1" strokeDasharray="2,2" />
            </g>
          </svg>
        );

      case 'Dinding Cermin Klenteng Gang Lombok':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            {/* Grid background */}
            <line x1="50" y1="150" x2="350" y2="150" stroke="#e7e5e4" strokeWidth="1.5" />
            <line x1="50" y1="150" x2="50" y2="20" stroke="#e7e5e4" strokeWidth="1.5" />
            {/* y = x Mirror Line */}
            <line x1="50" y1="150" x2="250" y2="20" stroke="#d97706" strokeWidth="2.5" strokeDasharray="5,3" />
            <text x="210" y="40" fill="#7c2d12" fontSize="10" fontFamily="monospace" fontWeight="black">Garis y = x (Cermin)</text>
            {/* Object S(-2, 7) */}
            <circle cx="110" cy="60" r="6" fill="#f43f5e" stroke="#1c1917" strokeWidth="1.5" />
            <text x="50" y="55" fill="#be123c" fontSize="11" fontWeight="black" fontFamily="monospace">S(-2, 7)</text>
            {/* Bayangan S'(7, -2) */}
            <circle cx="210" cy="120" r="6" fill="#10b981" stroke="#1c1917" strokeWidth="1.5" />
            <text x="220" y="130" fill="#064e3b" fontSize="11" fontWeight="black" fontFamily="monospace">S'(7, -2)</text>
            {/* Interconnecting perpendicular line */}
            <line x1="110" y1="60" x2="210" y2="120" stroke="#78716c" strokeWidth="1.5" strokeDasharray="3,3" />
          </svg>
        );

      case 'Deretan Lampion Gantung Gang Baru':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            {/* Support Wire */}
            <path d="M 20 50 Q 200 80 380 50" stroke="#78716c" strokeWidth="2.5" fill="none" />
            {/* Lampion 1 at L(1, 2) */}
            <g transform="translate(80, 58)">
              <ellipse cx="20" cy="30" rx="16" ry="22" fill="#ef4444" stroke="#1c1917" strokeWidth="2" />
              <rect x="12" y="5" width="16" height="5" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" rx="1" />
              <rect x="12" y="50" width="16" height="5" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" rx="1" />
              <line x1="20" y1="-10" x2="20" y2="5" stroke="#1c1917" strokeWidth="1.5" />
              <text x="40" y="30" fill="#b91c1c" fontSize="11" fontWeight="black" fontFamily="monospace">L(1, 2)</text>
            </g>
            {/* Translasi Vector Arrow */}
            <path d="M 120 90 L 250 120" stroke="#d97706" strokeWidth="3" strokeDasharray="5,3" fill="none" />
            <polygon points="250,120 240,113 243,124" fill="#d97706" stroke="#1c1917" strokeWidth="1" />
            <text x="145" y="105" fill="#7c2d12" fontSize="10" fontFamily="monospace" fontWeight="black">Translasi T[4, 5]</text>
            {/* Lampion 2 at L'(5, 7) */}
            <g transform="translate(260, 88)">
              <ellipse cx="20" cy="30" rx="16" ry="22" fill="#e11d48" stroke="#1c1917" strokeWidth="2" />
              <rect x="12" y="5" width="16" height="5" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" rx="1" />
              <rect x="12" y="50" width="16" height="5" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" rx="1" />
              <line x1="20" y1="-10" x2="20" y2="5" stroke="#1c1917" strokeWidth="1.5" />
              <text x="40" y="30" fill="#047857" fontSize="11" fontWeight="black" fontFamily="monospace">L'(5, 7)</text>
            </g>
          </svg>
        );

      case 'Gerobak Kuliner Lumpia Gang Lombok':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            {/* Street Line */}
            <line x1="20" y1="150" x2="380" y2="150" stroke="#78716c" strokeWidth="4" />
            {/* Cart at G(5, -1) */}
            <g transform="translate(60, 60)">
              <rect x="10" y="20" width="50" height="30" fill="#b45309" stroke="#1c1917" strokeWidth="2" rx="3" />
              <circle cx="20" cy="55" r="10" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              <circle cx="50" cy="55" r="10" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              <rect x="4" y="30" width="6" height="12" fill="#f59e0b" stroke="#1c1917" strokeWidth="1.5" />
              <text x="-48" y="25" fill="#9a3412" fontSize="11" fontWeight="black" fontFamily="monospace">G(5, -1)</text>
            </g>
            {/* Movement Vector */}
            <path d="M 120 100 L 250 100" stroke="#10b981" strokeWidth="3" strokeDasharray="6,4" />
            <polygon points="250,100 240,95 240,105" fill="#10b981" stroke="#1c1917" strokeWidth="1" />
            <text x="140" y="90" fill="#047857" fontSize="10" fontFamily="monospace" fontWeight="black">Geser T[-6, 3]</text>
            {/* Cart at Pos G'(-1, 2) */}
            <g transform="translate(250, 60)">
              <rect x="10" y="20" width="50" height="30" fill="#78350f" stroke="#1c1917" strokeWidth="2" rx="3" />
              <circle cx="20" cy="55" r="10" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              <circle cx="50" cy="55" r="10" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              <text x="68" y="25" fill="#047857" fontSize="11" fontWeight="black" fontFamily="monospace">G'(-1, 2)</text>
            </g>
          </svg>
        );

      case 'Ornamen Roda Ba Gua Kelenteng kuno':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            <g transform="translate(200, 90)">
              {/* Outer Circular Ring */}
              <circle cx="0" cy="0" r="50" fill="none" stroke="#d97706" strokeWidth="4" />
              <circle cx="0" cy="0" r="35" fill="none" stroke="#b91c1c" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill="#1c1917" />
              {/* Compass Arrows */}
              <line x1="-55" y1="0" x2="55" y2="0" stroke="#a8a29e" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="-55" x2="0" y2="55" stroke="#a8a29e" strokeWidth="1" strokeDasharray="3,3" />
              {/* Point R(4, 3) at approx 37 deg */}
              <circle cx="32" cy="24" r="5" fill="#ef4444" stroke="#1c1917" strokeWidth="1.5" />
              <text x="40" y="22" fill="#b91c1c" fontSize="11" fontWeight="black" fontFamily="monospace">R(4, 3)</text>
              {/* Rotating 90 deg C.C.W Arrow */}
              <path d="M 32 24 A 40 40 0 0 0 -24 32" fill="none" stroke="#059669" strokeWidth="2.5" />
              <polygon points="-24,32 -16,28 -28,24" fill="#059669" stroke="#1c1917" strokeWidth="1" />
              {/* New Point R'(-3, 4) at approx 127 deg */}
              <circle cx="-24" cy="32" r="5" fill="#10b981" stroke="#1c1917" strokeWidth="1.5" />
              <text x="-80" y="44" fill="#047857" fontSize="11" fontWeight="black" fontFamily="monospace">R'(-3, 4)</text>
              <text x="-95" y="-60" fill="#7c2d12" fontSize="10" fontFamily="monospace" fontWeight="black">Rotasi +90° O(0,0)</text>
            </g>
          </svg>
        );

      case 'Atap Klenteng Sam Poo Kong':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            <g transform="translate(200, 20)">
              {/* Apex (0, 0) Center */}
              <circle cx="0" cy="0" r="5" fill="#d97706" stroke="#1c1917" strokeWidth="1" />
              <text x="10" y="5" fill="#7c2d12" fontSize="9" fontFamily="monospace" fontWeight="black">Pusat O(0,0)</text>
              
              {/* Scaling Lines */}
              <line x1="0" y1="0" x2="-140" y2="140" stroke="#d6d3d1" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="140" y2="140" stroke="#d6d3d1" strokeWidth="1.5" />

              {/* Atap Terbawah Level 1 */}
              <polygon points="-120,120 -80,80 80,80 120,120" fill="#15803d" opacity="0.4" stroke="#14532d" strokeWidth="2" />
              <circle cx="-120" cy="120" r="5" fill="#ef4444" stroke="#1c1917" strokeWidth="1.5" />
              <text x="-165" y="130" fill="#b91c1c" fontSize="11" fontWeight="black" fontFamily="monospace">A(-6, 8)</text>

              {/* Dilatasi Vector scaling factor = 0.5 */}
              <path d="M -120 120 L -60 60" stroke="#d97706" strokeWidth="2.5" />
              
              {/* Atap Tingkat Kedua Level 2 (k = 0.5) */}
              <polygon points="-60,60 -40,40 40,40 60,60" fill="#b91c1c" opacity="0.8" stroke="#7f1d1d" strokeWidth="1.5" />
              <circle cx="-60" cy="60" r="5" fill="#10b981" stroke="#1c1917" strokeWidth="1.5" />
              <text x="-105" y="65" fill="#047857" fontSize="11" fontWeight="black" fontFamily="monospace">A'(-3, 4)</text>

              <text x="50" y="110" fill="#44403c" fontSize="10" className="italic font-bold font-sans">Dilatasi k = 1/2</text>
            </g>
          </svg>
        );

      default:
        // Generic thematic placeholder fallback
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full text-stone-900">
            <rect x="0" y="0" width="400" height="180" fill="#fafaf9" />
            <rect x="10" y="10" width="380" height="160" fill="#f5f5f4" stroke="#1c1917" strokeWidth="2" rx="12" />
            <g transform="translate(200, 90)" textAnchor="middle">
              <Compass className="w-12 h-12 text-red-650 mx-auto opacity-30 animate-spin-slow" />
              <text y="10" fill="#b91c1c" fontSize="14" fontWeight="black">{landmark}</text>
              <text y="30" fill="#44403c" fontSize="10" fontWeight="bold">Etnomatematika Semarang Chinatown</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-550/60 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white border-4 border-stone-900 rounded-3xl p-6 md:p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 max-h-[92vh] overflow-y-auto text-left relative shadow-[8px_8px_0px_0px_#18181b] text-stone-900 font-sans"
      >
        {/* LEFT PANEL: COMIC BOOK & VISUAL STORY (COL 7) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b-2 border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-red-100 border-2 border-stone-900 text-red-800 px-3 py-1 rounded-xl font-mono font-black tracking-widest uppercase shadow-[1px_1px_0px_0px_#1c1917]">
                Comic Card #{question.id}
              </span>
              <span className="text-[10px] bg-sky-100 border-2 border-stone-900 text-sky-850 px-3 py-1 rounded-xl font-mono font-black tracking-wider uppercase shadow-[1px_1px_0px_0px_#1c1917]">
                {question.type}
              </span>
            </div>
            {mode === 'EXIT' && (
              <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 border-2 border-stone-900 px-3 py-1 rounded-xl shadow-[1px_1px_0px_0px_#1c1917]">
                Sisa Beruntun: {streakCount}/3
              </span>
            )}
          </div>

          {/* 1. COMIC BOOK PANEL (Opening Visual/Visual Observation) */}
          <div className="border-2 border-stone-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1c1917] bg-stone-50 aspect-[2.2/1] w-full flex items-center justify-center relative group">
            {renderChinatownVisual(question.landmark)}
            <div className="absolute top-2.5 right-2.5 bg-white px-2.5 py-1 rounded-lg border-2 border-stone-900 flex items-center gap-1.5 shadow-[1px_1px_0px_0px_#1c1917]">
              <Eye className="w-3.5 h-3.5 text-red-700 animate-pulse" />
              <span className="text-[9px] text-stone-800 uppercase font-mono font-black">Observasi Visual</span>
            </div>
          </div>

          {/* Landmark Name Banner */}
          <div className="text-left mt-1">
            <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <Milestone className="w-5 h-5 text-red-700" />
              {question.landmark}
            </h2>
            <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">Warisan Budaya Semarang Chinatown</p>
          </div>

          {/* 2. NARRATIVE BOX OR STIMULUS PROMPT */}
          <div className="flex-1 bg-stone-50 rounded-2xl border-2 border-stone-900 p-4 overflow-y-auto max-h-[220px] shadow-sm">
            {stage === 0 && (
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-400 font-black block">Struktur Cerita Kontekstual</span>
                <p className="text-sm text-stone-800 leading-relaxed font-sans font-medium">{question.narasi}</p>
              </div>
            )}
            {stage === 1 && (
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-400 font-black block">Pertanyaan Pemantik</span>
                <div className="bg-amber-50 border-2 border-stone-900 p-3.5 rounded-xl text-xs leading-relaxed text-stone-800 shadow-[2px_2px_0px_0px_#1c1917]">
                  <p className="font-extrabold text-amber-900 mb-1 flex items-center gap-1">💡 Coba Pikirkan Spasial:</p>
                  <p className="font-medium">{question.stimulus}</p>
                </div>
              </div>
            )}
            {stage === 2 && (
              <div className="space-y-2 text-left">
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-400 font-black block">Representasi Geometri Geometri</span>
                <div className="p-3.5 bg-white border-2 border-stone-900 rounded-xl font-mono text-xs text-stone-900 leading-relaxed font-black shadow-[2px_2px_0px_0px_#1c1917]">
                  {question.mathQuestion}
                </div>
              </div>
            )}
          </div>

          {/* Progress Multi-stage indicators */}
          <div className="flex items-center gap-2.5 text-xs font-mono font-black mt-1">
            <span className={`w-3.5 h-3.5 rounded-full border border-stone-900 ${stage >= 0 ? 'bg-red-600' : 'bg-stone-200'}`} />
            <span className="text-[9px] text-stone-500 mr-2">Eksplorasi</span>
            <span className={`w-3.5 h-3.5 rounded-full border border-stone-900 ${stage >= 1 ? 'bg-amber-500' : 'bg-stone-200'}`} />
            <span className="text-[9px] text-stone-500 mr-2">Stimulus</span>
            <span className={`w-3.5 h-3.5 rounded-full border border-stone-900 ${stage >= 2 ? 'bg-emerald-500' : 'bg-stone-200'}`} />
            <span className="text-[9px] text-stone-500">Representasi</span>
          </div>

        </div>

        {/* RIGHT PANEL: ACTIONS & CHALLENGES (COL 5) */}
        <div className="md:col-span-5 flex flex-col justify-between h-full gap-4 border-t-2 md:border-t-0 md:border-l-2 border-stone-200 pt-6 md:pt-0 md:pl-6">
          
          <div className="flex flex-col gap-4 flex-1 justify-center">
            {stage < 2 ? (
              <div className="space-y-5 text-center my-auto">
                <div className="w-14 h-14 bg-stone-50 border-2 border-stone-900 rounded-2xl flex items-center justify-center mx-auto text-amber-500 shadow-[2px_2px_0px_0px_#1c1917]">
                  <HelpCircle className="w-8 h-8 text-amber-600 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider font-mono">
                    {stage === 0 ? 'Mulai Eksplorasi Budaya' : 'Selesaikan Pemahaman Konsep'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto font-medium leading-normal">
                    {stage === 0 
                      ? 'Silakan baca narasi sejarah kebudayaan Semarang Chinatown untuk mengonstruksi pemodelan ruang.' 
                      : 'Analisislah pola spasial dan pemicu visual sebelum mengonversi ke sumbu Kartesius.'}
                  </p>
                </div>
                
                <button
                  onClick={() => setStage((v) => (v + 1) as 0 | 1 | 2)}
                  id="btn_comic_stage_next"
                  className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-900 border-2 border-stone-900 rounded-xl font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#1c1917] active:translate-y-0.5"
                >
                  <span>{stage === 0 ? 'Lanjut ke Stimulus Konsep' : 'Lanjut ke Permasalahan Matematika'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-extrabold">Pilihan Jawaban (Multiple Choice)</span>
                  <p className="text-xs text-stone-500 font-bold">Pilihlah salah satu koordinat pemetaan geometris yang paling akurat.</p>
                </div>

                {/* Multiple choice selections */}
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    let optionStyle = 'bg-white border-2 border-stone-900 text-stone-950 shadow-[2px_2px_0px_0px_#1c1917] hover:bg-stone-50';
                    if (isSelected) {
                      optionStyle = 'bg-amber-50 border-2 border-stone-900 text-stone-900 shadow-[1px_1px_0px_0px_#1c1917] translate-y-0.5';
                    }
                    if (isAnswered) {
                      if (i === question.answer) {
                        optionStyle = 'bg-emerald-50 border-2 border-emerald-600 text-emerald-800 shadow-none';
                      } else if (isSelected) {
                        optionStyle = 'bg-red-50 border-2 border-red-600 text-red-800 shadow-none';
                      } else {
                        optionStyle = 'opacity-40 bg-stone-50/50 border border-stone-200 text-stone-400 shadow-none';
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(i)}
                        id={`btn_option_${i}`}
                        className={`w-full p-2.5 rounded-xl text-left text-xs font-mono font-black tracking-wide transition-all uppercase flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center font-mono text-[10px] text-stone-800 font-black">{String.fromCharCode(65 + i)}</span>
                          <span>{opt}</span>
                        </div>
                        {isAnswered && i === question.answer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Panel / Feedback Notification */}
                <AnimatePresence>
                  {isAnswered ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3.5 rounded-2xl border-2 text-xs leading-relaxed text-left shadow-[2px_2px_0px_0px_#1c1917] ${
                        isCorrect 
                          ? 'bg-emerald-50 border-stone-900 text-emerald-950' 
                          : 'bg-red-50 border-stone-900 text-red-950'
                      }`}
                    >
                      <div className="flex gap-2.5 items-start">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-650 shrink-0" />
                        )}
                        <div>
                          <p className="font-black uppercase tracking-wide text-[10px] font-mono">
                            {isCorrect ? 'Representasi Anda Benar!' : 'Representasi Kurang Tepat!'}
                          </p>
                          <p className="mt-1 font-sans text-xs text-stone-800 font-semibold leading-normal">{question.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="border-t-2 border-stone-100 pt-4 flex gap-3 mt-auto">
            {stage === 2 && !isAnswered && (
              <button
                onClick={() => {
                  if (selectedOption === null) return;
                  const correct = selectedOption === question.answer;
                  setIsCorrect(correct);
                  setIsAnswered(true);
                }}
                id="btn_comic_submit_answer"
                disabled={selectedOption === null}
                className="w-full py-3.5 bg-red-600 hover:bg-red-750 disabled:bg-stone-100 text-white disabled:text-stone-400 border-2 border-stone-900 rounded-xl font-black text-xs tracking-wider uppercase shadow-[3px_3px_0px_0px_#1c1917] disabled:shadow-none cursor-pointer flex items-center justify-center gap-2 active:translate-y-0.5"
              >
                <span>Kirim Jawaban</span>
                <Send className="w-4 h-4" />
              </button>
            )}

            {isAnswered && (
              <button
                onClick={() => {
                  if (isCorrect) {
                    onSuccess();
                  } else {
                    onFail();
                  }
                }}
                id="btn_comic_continue_challenge"
                className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-900 border-2 border-stone-900 rounded-xl font-black text-xs tracking-wider uppercase shadow-[3px_3px_0px_0px_#1c1917] cursor-pointer active:translate-y-0.5"
              >
                Lanjutkan Permainan
              </button>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
