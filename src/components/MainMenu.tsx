import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, User, ArrowLeft, Gamepad2, Info, Star, Shield, GraduationCap, X } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onBackToSplash: () => void;
}

export default function MainMenu({ onStartGame, onBackToSplash }: MainMenuProps) {
  const [activeModal, setActiveModal] = useState<'NONE' | 'PETUNJUK' | 'PROFIL'>('NONE');

  return (
    <div className="relative min-h-screen bg-stone-50 flex flex-col justify-between p-6 text-stone-900 font-sans overflow-hidden">
      
      {/* Decorative Lanterns (floating in background) - Styled in Bento format */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-12 left-10 w-12 h-20 bg-red-100 rounded-b-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] pointer-events-none flex flex-col items-center justify-around p-1 text-red-700 font-mono text-[9px] font-black"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        <span>吉</span>
        <span>祥</span>
        <span className="w-1 h-3 bg-red-600 rounded" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-10 w-12 h-20 bg-amber-100 rounded-b-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] pointer-events-none flex flex-col items-center justify-around p-1 text-amber-700 font-mono text-[9px] font-black"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>安</span>
        <span>康</span>
        <span className="w-1 h-3 bg-amber-600 rounded" />
      </motion.div>

      {/* TOP BAR */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between border-b-2 border-stone-200 pb-4">
        <button
          onClick={onBackToSplash}
          id="btn_menu_back_splash"
          className="bento-button-stone px-4 py-2 text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pengantar</span>
        </button>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-100 border-2 border-stone-900 px-3 py-1 rounded-xl">LUMION ENGINE v1.2</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
        
        {/* LEFT NAV BAR: MENU BUTTONS (5 COLS) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4 text-left">
          <div className="mb-2">
            <h3 className="text-xs uppercase font-black tracking-widest text-red-700 font-mono">Gerbang Pembelajaran</h3>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-1 text-stone-900">
              Menu Pembelajaran
            </h1>
            <p className="text-xs font-bold text-stone-500 mt-1">Gunakan navigasi untuk memulai eksplorasi etnomatematika Semarang Chinatown.</p>
          </div>

          {/* Button: Mulai Permainan Ludo */}
          <button
            onClick={onStartGame}
            id="btn_menu_play"
            className="group w-full p-4 rounded-3xl bg-red-50 border-2 border-stone-900 flex items-center justify-between shadow-[4px_4px_0px_0px_#1c1917] hover:shadow-[1px_1px_0px_0px_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] shrink-0">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-stone-900 transition-colors text-base">Mulai Permainan</h4>
                <p className="text-xs text-stone-600 font-medium font-sans">Mainkan Ludo matematika bersama 3 Bot cerdas!</p>
              </div>
            </div>
            <span className="text-xs font-black font-mono bg-red-700 text-white border-2 border-stone-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1c1917]">MULAI</span>
          </button>

          {/* Button: Petunjuk Permainan */}
          <button
            onClick={() => setActiveModal('PETUNJUK')}
            id="btn_menu_info"
            className="group w-full p-4 rounded-3xl bg-white border-2 border-stone-900 flex items-center justify-between shadow-[4px_4px_0px_0px_#1c1917] hover:shadow-[1px_1px_0px_0px_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-stone-900 transition-colors text-base">Petunjuk Permainan</h4>
                <p className="text-xs text-stone-600 font-medium font-sans">Pelajari aturan, alur, dan cara bermain LUMION.</p>
              </div>
            </div>
            <span className="text-xs font-black font-mono bg-stone-100 text-stone-700 border-2 border-stone-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1c1917]">ATURAN</span>
          </button>

          {/* Button: Profil Pengembang */}
          <button
            onClick={() => setActiveModal('PROFIL')}
            id="btn_menu_devs"
            className="group w-full p-4 rounded-3xl bg-white border-2 border-stone-900 flex items-center justify-between shadow-[4px_4px_0px_0px_#1c1917] hover:shadow-[1px_1px_0px_0px_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-700 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-stone-900 transition-colors text-base">Profil Pengembang</h4>
                <p className="text-xs text-stone-600 font-medium font-sans">Tim pengembang Universitas Negeri Semarang (UNNES).</p>
              </div>
            </div>
            <span className="text-xs font-black font-mono bg-stone-100 text-stone-700 border-2 border-stone-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1c1917]">TIM</span>
          </button>
        </div>

        {/* RIGHT DISPLAY ZONE: PREVIEW LUDO & MASCOT (7 COLS) */}
        <div className="lg:col-span-7 flex items-center justify-center relative p-6 bg-white rounded-3xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917]">
          
          <div className="absolute top-4 left-4 flex gap-1.5 items-center bg-stone-100 px-3 py-1 rounded-xl border-2 border-stone-900 text-[10px] font-black">
            <Gamepad2 className="w-3.5 h-3.5 text-red-700" />
            <span className="text-stone-700 font-mono tracking-wide uppercase">Preview Papan Ludo</span>
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-sm mt-4">
            {/* Highly detailed stylized mockup of Ludo Board/Tokens */}
            <div className="w-64 h-64 border-4 border-stone-900 rounded-2xl grid grid-cols-3 grid-rows-3 bg-stone-100 relative shadow-[4px_4px_0px_0px_#1c1917] overflow-hidden">
              {/* Yard Red */}
              <div className="bg-red-50 border-r-2 border-b-2 border-stone-900 flex items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-red-650 border-2 border-stone-900 flex items-center justify-center relative">
                  <span className="w-4 h-4 rounded-full bg-stone-100 animate-ping absolute" />
                  <span className="w-5 h-5 rounded-full bg-stone-100 shadow-md relative" />
                </div>
              </div>
              {/* Vertical Path Top */}
              <div className="grid grid-cols-3 grid-rows-2 gap-[1px] bg-stone-900 border-b-2 border-stone-900">
                <div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" />
                <div className="bg-[#fcf8f2]" /><div className="bg-sky-400" /><div className="bg-[#fcf8f2]" />
              </div>
              {/* Yard Blue */}
              <div className="bg-blue-50 border-l-2 border-b-2 border-stone-900 flex items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 border-2 border-stone-900 flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-stone-100 shadow-md" />
                </div>
              </div>
              {/* Horizontal Path Left */}
              <div className="grid grid-cols-2 grid-rows-3 gap-[1px] bg-stone-900 border-r-2 border-stone-900">
                <div className="bg-[#fcf8f2]" /><div className="bg-red-500" /><div className="bg-[#fcf8f2]" />
                <div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" />
              </div>
              {/* Center Home Goal */}
              <div className="bg-gradient-to-tr from-red-600 via-amber-400 to-blue-600 flex items-center justify-center text-stone-900 border-2 border-stone-900 font-black text-xs">
                GOAL
              </div>
              {/* Horizontal Path Right */}
              <div className="grid grid-cols-2 grid-rows-3 gap-[1px] bg-stone-900 border-l-2 border-stone-900">
                <div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" />
                <div className="bg-yellow-400" /><div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" />
              </div>
              {/* Yard Green */}
              <div className="bg-emerald-50 border-r-2 border-t-2 border-stone-900 flex items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 border-2 border-stone-900 flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-stone-100 shadow-md" />
                </div>
              </div>
              {/* Vertical Path Bottom */}
              <div className="grid grid-cols-3 grid-rows-2 gap-[1px] bg-stone-900 border-t-2 border-stone-900">
                <div className="bg-[#fcf8f2]" /><div className="bg-emerald-500" /><div className="bg-[#fcf8f2]" />
                 <div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" /><div className="bg-[#fcf8f2]" />
              </div>
              {/* Yard Yellow */}
              <div className="bg-yellow-50 border-l-2 border-t-2 border-stone-900 flex items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500 border-2 border-stone-900 flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-stone-100 shadow-md" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-extrabold text-red-700 text-sm">Ludo System Terintegrasi Matematika</h4>
              <p className="text-xs text-stone-600 mt-1 max-w-xs leading-relaxed font-medium">
                Setiap pergerakan bidak dibimbing oleh eksplorasi visual kebudayaan Semarang Chinatown melintasi grid koordinat Kartesius.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER METADATA */}
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center border-t-2 border-stone-200 pt-4">
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">
          Media LUMION • Dipersembahkan oleh Tim Universitas Negeri Semarang untuk Lomba Inovasi Digital Mahasiswa (LIDM) 2026.
        </p>
      </div>

      {/* -------------------- MODALS & OVERLAYS -------------------- */}

      <AnimatePresence>
        {/* PETUNJUK PERMAINAN OVERLAY */}
         {activeModal === 'PETUNJUK' && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-stone-955/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
           >
             <motion.div
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-white rounded-3xl border-2 border-stone-900 p-6 max-w-md w-full max-h-[85vh] overflow-y-auto text-left relative shadow-[8px_8px_0px_0px_#1c1917]"
             >
               <button
                 onClick={() => setActiveModal('NONE')}
                 id="btn_modal_close_rules"
                 className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 transition-colors p-2 rounded-full hover:bg-stone-100 bg-white border-2 border-stone-900 cursor-pointer shadow-[2px_2px_0px_0px_#1a1a1a]"
               >
                 <X className="w-4 h-4 text-stone-900 font-extrabold" />
               </button>

               <div className="flex items-center gap-3 border-b-2 border-stone-100 pb-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-stone-900 flex items-center justify-center text-amber-600 shadow-[2px_2px_0px_0px_#1a1a1a]">
                   <Info className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="text-lg font-black text-stone-900">Petunjuk Permainan</h3>
                   <span className="text-[10px] text-stone-400 uppercase tracking-widest font-black font-mono">Regulasi & Gameplay</span>
                 </div>
               </div>

               <div className="space-y-4 text-sm text-stone-800 font-medium">
                 <div className="flex gap-3 bg-stone-50 p-3.5 border border-stone-200 rounded-xl">
                   <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center font-mono text-xs text-amber-400 font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_#000]">1</div>
                   <p><span className="font-extrabold text-stone-900">Lempar Dadu:</span> Pada awal giliran, lempar dadu untuk menentukan potensi langkah pergerakan bidak Anda.</p>
                 </div>
                 
                 <div className="flex gap-3 bg-stone-50 p-3.5 border border-stone-200 rounded-xl">
                   <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center font-mono text-xs text-amber-400 font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_#000]">2</div>
                   <p><span className="font-extrabold text-stone-900">Keluar dari Kandang (Yard Exit):</span> Jika semua bidak Anda masih berada di dalam base, Anda harus menyelesaikan <span className="text-red-700 font-black font-mono">3 soal matematika berturut-turut dengan benar</span> untuk melepaskan satu bidak keluar.</p>
                 </div>

                 <div className="flex gap-3 bg-stone-50 p-3.5 border border-stone-200 rounded-xl">
                   <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center font-mono text-xs text-amber-400 font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_#000]">3</div>
                   <p><span className="font-extrabold text-stone-900">Menjalankan Bidak:</span> Jika bidak sudah berada di jalur utama, jawab <span className="text-emerald-700 font-black font-mono">1 soal matematika dengan benar</span> agar bidak berjalan melangkah sejauh angka dadu.</p>
                 </div>

                 <div className="flex gap-3 bg-stone-50 p-3.5 border border-stone-200 rounded-xl">
                   <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center font-mono text-xs text-amber-400 font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_#000]">4</div>
                   <p><span className="font-extrabold text-stone-900">Jawaban Salah:</span> Jika jawaban salah, bidak tidak bergerak sama sekali, dan giliran langsung dipas pada Bot berikutnya.</p>
                 </div>

                 <div className="flex gap-3 bg-stone-50 p-3.5 border border-stone-200 rounded-xl">
                   <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center font-mono text-xs text-amber-400 font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_#000]">5</div>
                   <p><span className="font-extrabold text-stone-900">Interaksi & Eliminasi:</span> Jika bidak Anda berakhir tepat di kotak bidak lawan, bidak lawan tersebut tereliminasi dan <span className="text-red-700 font-black">kembali ke dalam base</span>, kecuali jika berada di kotak bintang <span className="text-amber-600 font-black">Area Aman (Safe Zone)</span>.</p>
                 </div>

                 <div className="flex gap-3 bg-stone-50 p-3.5 border border-stone-200 rounded-xl">
                   <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center font-mono text-xs text-amber-400 font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_#000]">6</div>
                   <p><span className="font-extrabold text-stone-900">Kemenangan:</span> Bidak pertama yang berhasil mengitari papan dan memasuki kotak <span className="text-emerald-700 font-black font-mono">GOAL</span> di pusat papan dinyatakan sebagai pemenang evaluasi.</p>
                 </div>
               </div>

               <div className="mt-6 pt-4 border-t-2 border-stone-100 flex justify-end">
                 <button
                   onClick={() => setActiveModal('NONE')}
                   id="btn_modal_dismiss_rules"
                   className="bento-button-red px-5 py-2.5 text-xs tracking-wider uppercase"
                 >
                   Saya Mengerti
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}

          {/* PROFIL PENGEMBANG OVERLAY */}
          {activeModal === 'PROFIL' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl border-2 border-stone-900 p-6 max-w-md w-full relative shadow-[8px_8px_0px_0px_#1c1917]"
              >
                <button
                  onClick={() => setActiveModal('NONE')}
                  id="btn_modal_close_dev"
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 transition-colors p-2 rounded-full hover:bg-stone-100 bg-white border-2 border-stone-900 cursor-pointer shadow-[2px_2px_0px_0px_#1a1a1a]"
                >
                  <X className="w-4 h-4 text-stone-955 font-extrabold" />
                </button>

                <div className="flex items-center gap-3 border-b-2 border-stone-100 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 border-2 border-stone-900 flex items-center justify-center text-stone-800 shadow-[2px_2px_0px_0px_#1a1a1a]">
                    <GraduationCap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 font-sans">Profil Tim Pengembang</h3>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-black font-mono">Universitas Negeri Semarang</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3 bg-stone-50 p-4 border-2 border-stone-900 rounded-2xl shadow-[4px_4px_0px_0px_#1c1917]">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-red-700 font-mono font-black block">1. Anggota Tim Kesatu</h4>
                      <p className="text-sm font-black text-stone-905 font-sans">Firdivana Aliffia Maulana</p>
                      <p className="text-[10px] text-stone-500 font-bold uppercase font-mono">NIM: 2404020021 • S-1 Pendidikan Matematika</p>
                    </div>
                    <hr className="border-stone-200" />
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-red-700 font-mono font-black block">2. Anggota Tim Kedua</h4>
                      <p className="text-sm font-black text-stone-905 font-sans">Surya Finisman Harefa</p>
                      <p className="text-[10px] text-stone-500 font-bold uppercase font-mono">NIM: 2404020030 • S-1 Pendidikan Matematika</p>
                    </div>
                    <hr className="border-stone-200" />
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-red-700 font-mono font-black block">3. Anggota Tim Ketiga</h4>
                      <p className="text-sm font-black text-stone-905 font-sans">Natasya Aulia Putri</p>
                      <p className="text-[10px] text-stone-500 font-bold uppercase font-mono">NIM: 2404020034 • S-1 Pendidikan Matematika</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl border-2 border-stone-900 p-3.5 flex gap-2.5 items-start text-xs text-stone-800 shadow-[4px_4px_0px_0px_#1c1917]">
                    <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-left font-sans font-medium">
                      <p className="font-black text-stone-900">Etnomatematika Terakreditasi</p>
                      <p className="text-stone-600 leading-relaxed max-w-sm mt-0.5">Representasi matematika didukung oleh peninggalan bersejarah asli Semarang Chinatown sebagai media penumbuhan penalaran kritis.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-stone-100 flex justify-end">
                  <button
                    onClick={() => setActiveModal('NONE')}
                    id="btn_modal_dismiss_dev"
                    className="bento-button px-5 py-2.5 text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Tutup Profil
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
       </AnimatePresence>

    </div>
  );
}
