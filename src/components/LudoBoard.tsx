import React from 'react';
import { motion } from 'motion/react';
import { Star, Home, Skull } from 'lucide-react';
import { Player, Token, PlayerColor } from '../types';

// Perimeter path coordinates of the Ludo Board (52 cells)
export const COMMON_PATH_COORDS: { row: number; col: number }[] = [
  { row: 6, col: 0 },   // 0
  { row: 6, col: 1 },   // 1  (Red Exit Safe Zone)
  { row: 6, col: 2 },   // 2
  { row: 6, col: 3 },   // 3
  { row: 6, col: 4 },   // 4
  { row: 6, col: 5 },   // 5
  { row: 5, col: 6 },   // 6
  { row: 4, col: 6 },   // 7
  { row: 3, col: 6 },   // 8  (Safe Zone)
  { row: 2, col: 6 },   // 9
  { row: 1, col: 6 },   // 10
  { row: 0, col: 6 },   // 11
  { row: 0, col: 7 },   // 12
  { row: 0, col: 8 },   // 13 (Blue Exit Safe Zone)
  { row: 1, col: 8 },   // 14
  { row: 2, col: 8 },   // 15
  { row: 3, col: 8 },   // 16
  { row: 4, col: 8 },   // 17
  { row: 5, col: 8 },   // 18
  { row: 6, col: 9 },   // 19
  { row: 6, col: 10 },  // 20
  { row: 6, col: 11 },  // 21 (Safe Zone)
  { row: 6, col: 12 },  // 22
  { row: 6, col: 13 },  // 23
  { row: 6, col: 14 },  // 24
  { row: 7, col: 14 },  // 25
  { row: 8, col: 14 },  // 26 (Yellow Exit Safe Zone)
  { row: 8, col: 13 },  // 27
  { row: 8, col: 12 },  // 28
  { row: 8, col: 11 },  // 29
  { row: 8, col: 10 },  // 30
  { row: 8, col: 9 },   // 31
  { row: 9, col: 8 },   // 32
  { row: 10, col: 8 },  // 33
  { row: 11, col: 8 },  // 34 (Safe Zone)
  { row: 12, col: 8 },  // 35
  { row: 13, col: 8 },  // 36
  { row: 14, col: 8 },  // 37
  { row: 14, col: 7 },  // 38
  { row: 14, col: 6 },  // 39 (Green Exit Safe Zone)
  { row: 13, col: 6 },  // 40
  { row: 12, col: 6 },  // 41
  { row: 11, col: 6 },  // 42
  { row: 10, col: 6 },  // 43
  { row: 9, col: 6 },   // 44
  { row: 8, col: 5 },   // 45
  { row: 8, col: 4 },   // 46
  { row: 8, col: 3 },   // 47 (Safe Zone)
  { row: 8, col: 2 },   // 48
  { row: 8, col: 1 },   // 49
  { row: 8, col: 0 },   // 50
  { row: 7, col: 0 }    // 51
];

// Home Stretch Paths coordinates (6 cells for each player color)
export const HOME_STRETCH_COORDS: Record<PlayerColor, { row: number; col: number }[]> = {
  red: [
    { row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 },
    { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }
  ],
  blue: [
    { row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 },
    { row: 4, col: 7 }, { row: 5, col: 7 }, { row: 6, col: 7 }
  ],
  green: [
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 },
    { row: 10, col: 7 }, { row: 9, col: 7 }, { row: 8, col: 7 }
  ],
  yellow: [
    { row: 7, col: 13 }, { row: 7, col: 12 }, { row: 7, col: 11 },
    { row: 7, col: 10 }, { row: 7, col: 9 }, { row: 7, col: 8 }
  ]
};

// Safe zone cell path index (both common exit indices and cross stars)
export const SAFE_INDICES = [1, 8, 13, 21, 26, 34, 39, 47];

// Standard exits indices
export const RELEASE_START_CELLS: Record<PlayerColor, number> = {
  red: 1,     // Starts at (6, 1)
  blue: 13,   // Starts at (0, 8)
  yellow: 26, // Starts at (8, 14)
  green: 39   // Starts at (14, 6)
};

// Corner Yard coordinate slots for red, blue, green, yellow
export const YARD_SLOTS: Record<PlayerColor, { row: number; col: number }[]> = {
  red: [
    { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 3, col: 2 }, { row: 3, col: 3 }
  ],
  blue: [
    { row: 2, col: 11 }, { row: 2, col: 12 }, { row: 3, col: 11 }, { row: 3, col: 12 }
  ],
  green: [
    { row: 11, col: 2 }, { row: 11, col: 3 }, { row: 12, col: 2 }, { row: 12, col: 3 }
  ],
  yellow: [
    { row: 11, col: 11 }, { row: 11, col: 12 }, { row: 12, col: 11 }, { row: 12, col: 12 }
  ]
};

interface LudoBoardProps {
  players: Player[];
  activeColor: PlayerColor;
  highlightedTokenIds: number[];
  onTokenClick: (color: PlayerColor, tokenId: number) => void;
  gameStateLog: string;
}

export default function LudoBoard({
  players,
  activeColor,
  highlightedTokenIds,
  onTokenClick,
  gameStateLog
}: LudoBoardProps) {

  // Map each grid coordinate to potential matching tokens
  const getCellTokens = (row: number, col: number) => {
    const list: { player: Player; token: Token }[] = [];
    players.forEach((p) => {
      p.tokens.forEach((t) => {
        let tRow = -1;
        let tCol = -1;

        if (t.position === -1) {
          // Token is in yard
          const slot = YARD_SLOTS[t.color][t.id];
          tRow = slot.row;
          tCol = slot.col;
        } else if (t.position >= 0 && t.position <= 51) {
          // Perimeter path
          const coord = COMMON_PATH_COORDS[t.position];
          tRow = coord.row;
          tCol = coord.col;
        } else if (t.position >= 52 && t.position <= 57) {
          // Home stretch path
          const coord = HOME_STRETCH_COORDS[t.color][t.position - 52];
          tRow = coord.row;
          tCol = coord.col;
        } else if (t.position === 58) {
          // Centered Goal Cell (7, 7)
          tRow = 7;
          tCol = 7;
        }

        if (tRow === row && tCol === col) {
          list.push({ player: p, token: t });
        }
      });
    });
    return list;
  };

  // Check if grid row, col matches key landmarks/colors to paint the board
  const getCellTheme = (row: number, col: number) => {
    // Yards
    if (row < 6 && col < 6) return 'red-yard';
    if (row < 6 && col > 8) return 'blue-yard';
    if (row > 8 && col < 6) return 'green-yard';
    if (row > 8 && col > 8) return 'yellow-yard';

    // Home Goal
    if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
      if (row === 7 && col === 7) return 'goal-center';
      if (row === 7 && col === 6) return 'red-home-entrance';
      if (row === 6 && col === 7) return 'blue-home-entrance';
      if (row === 8 && col === 7) return 'green-home-entrance';
      if (row === 7 && col === 8) return 'yellow-home-entrance';
      return 'goal-boundary';
    }

    // Home Stretch Paths
    if (row === 7 && col >= 1 && col <= 5) return 'red-stretch';
    if (col === 7 && row >= 1 && row <= 5) return 'blue-stretch';
    if (col === 7 && row >= 9 && row <= 13) return 'green-stretch';
    if (row === 7 && col >= 9 && col <= 13) return 'yellow-stretch';

    // Safe Exits
    if (row === 6 && col === 1) return 'red-exit';
    if (row === 0 && col === 8) return 'blue-exit';
    if (row === 14 && col === 6) return 'green-exit';
    if (row === 8 && col === 13) return 'yellow-exit';

    // Additional Star Safe cells
    if (row === 3 && col === 6) return 'safe-generic';
    if (row === 6 && col === 12) return 'safe-generic';
    if (row === 11 && col === 8) return 'safe-generic';
    if (row === 8 && col === 2) return 'safe-generic';

    return 'standard-track';
  };

  const getCellCSSClass = (theme: string) => {
    switch (theme) {
      case 'red-yard':
        return 'bg-red-50/40 border border-red-200/50';
      case 'blue-yard':
        return 'bg-blue-50/40 border border-blue-200/50';
      case 'green-yard':
        return 'bg-emerald-50/40 border border-emerald-200/50';
      case 'yellow-yard':
        return 'bg-amber-50/40 border border-amber-200/50';
      case 'red-stretch':
      case 'red-home-entrance':
        return 'bg-red-500 border border-stone-900';
      case 'blue-stretch':
      case 'blue-home-entrance':
        return 'bg-blue-500 border border-stone-900';
      case 'green-stretch':
      case 'green-home-entrance':
        return 'bg-emerald-500 border border-stone-900';
      case 'yellow-stretch':
      case 'yellow-home-entrance':
        return 'bg-amber-400 border border-stone-900';
      case 'red-exit':
        return 'bg-red-100 border-2 border-stone-900';
      case 'blue-exit':
        return 'bg-blue-100 border-2 border-stone-900';
      case 'green-exit':
        return 'bg-emerald-100 border-2 border-stone-900';
      case 'yellow-exit':
        return 'bg-amber-100 border-2 border-stone-900';
      case 'safe-generic':
        return 'bg-amber-50 border-2 border-stone-900 shadow-[1px_1px_0px_0px_#1c1917] z-10';
      case 'goal-center':
        return 'bg-gradient-to-tr from-red-500 via-amber-400 to-blue-500 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] z-10';
      case 'goal-boundary':
        return 'bg-stone-50 border border-stone-300';
      default:
        return 'bg-white hover:bg-stone-50 border border-stone-200';
    }
  };

  // Check if cell coordinate is a Safe slot
  const isSafeCoord = (row: number, col: number) => {
    const index = COMMON_PATH_COORDS.findIndex((c) => c.row === row && c.col === col);
    if (index !== -1 && SAFE_INDICES.includes(index)) return true;
    return false;
  };

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* 15x15 GRID CONTAINER */}
      <div 
        className="w-full max-w-[390px] md:max-w-[430px] aspect-square bg-stone-100 p-2.5 rounded-3xl border-4 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917] relative overflow-hidden grid grid-cols-15 grid-rows-15 gap-[1px]"
        id="ludo_board_grid_canvas"
      >
        {/* Render 225 Cells (15 x 15) */}
        {Array.from({ length: 15 }).map((_, r) =>
          Array.from({ length: 15 }).map((_, c) => {
            const theme = getCellTheme(r, c);
            const cssClass = getCellCSSClass(theme);
            const tokensOnCell = getCellTokens(r, c);
            const isSafe = isSafeCoord(r, c);

            return (
              <div
                key={`${r}-${c}`}
                className={`relative flex items-center justify-center transition-all ${cssClass}`}
                style={{
                  gridRowStart: r + 1,
                  gridColStart: c + 1
                }}
              >
                {/* Specific details on corner bases */}
                {r === 0 && c === 0 && (
                  <div className="absolute inset-2 bg-red-50 rounded-2xl border-2 border-stone-900 flex flex-col items-center justify-center pointer-events-none text-[8px] font-mono select-none uppercase tracking-wide text-red-700 font-extrabold shadow-[2px_2px_0px_0px_#1c1917]">
                    <span className="font-sans font-black text-[10px] text-red-650">MERAH</span>
                    <span className="text-[7px]">Siswa</span>
                  </div>
                )}
                {r === 0 && c === 9 && (
                  <div className="absolute inset-2 bg-blue-50 rounded-2xl border-2 border-stone-900 flex flex-col items-center justify-center pointer-events-none text-[8px] font-mono select-none uppercase tracking-wide text-blue-700 font-extrabold shadow-[2px_2px_0px_0px_#1c1917]">
                    <span className="font-sans font-black text-[10px] text-blue-655">BIRU</span>
                    <span className="text-[7px]">BOT A</span>
                  </div>
                )}
                {r === 9 && c === 0 && (
                  <div className="absolute inset-2 bg-emerald-50 rounded-2xl border-2 border-stone-900 flex flex-col items-center justify-center pointer-events-none text-[8px] font-mono select-none uppercase tracking-wide text-emerald-700 font-extrabold shadow-[2px_2px_0px_0px_#1c1917]">
                    <span className="font-sans font-black text-[10px] text-emerald-655">HIJAU</span>
                    <span className="text-[7px]">BOT B</span>
                  </div>
                )}
                {r === 9 && c === 9 && (
                  <div className="absolute inset-2 bg-amber-50 rounded-2xl border-2 border-stone-900 flex flex-col items-center justify-center pointer-events-none text-[8px] font-mono select-none uppercase tracking-wide text-amber-600 font-extrabold shadow-[2px_2px_0px_0px_#1c1917]">
                    <span className="font-sans font-black text-[10px] text-amber-655">KUNING</span>
                    <span className="text-[7px]">BOT C</span>
                  </div>
                )}

                {/* Star icon representation for safe zones */}
                {isSafe && (
                  <Star className="w-3.5 h-3.5 text-amber-500 absolute pointer-events-none fill-amber-500/20 opacity-80 z-20" />
                )}

                {/* Home Goal Center */}
                {r === 7 && c === 7 && (
                  <div className="absolute flex flex-col items-center justify-center pointer-events-none animate-pulse z-20">
                    <Home className="w-4 h-4 text-stone-900 fill-current" />
                    <span className="text-[7px] font-black tracking-tighter text-stone-900 uppercase font-mono">GOAL</span>
                  </div>
                )}

                {/* Render game tokens in the cell */}
                {tokensOnCell.map(({ player, token }, index) => {
                  const isHighlighted =
                    player.color === activeColor &&
                    highlightedTokenIds.includes(token.id) &&
                    !player.isBot;

                  // Compute visual stacking offset if multiple tokens occupy the exact same cell
                  const stackOffset = tokensOnCell.length > 1 
                    ? {
                        transform: `translate(${index * 4 - 4}px, ${index * -4 + 4}px)`,
                        zIndex: 20 + index
                      }
                    : {};

                  return (
                    <motion.button
                      key={`${token.color}-${token.id}`}
                      layoutId={`token-${token.color}-${token.id}`}
                      onClick={() => isHighlighted && onTokenClick(token.color, token.id)}
                      disabled={!isHighlighted}
                      style={stackOffset}
                      id={`token_btn_${token.color}_${token.id}`}
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center shadow-md relative border-2 border-stone-900 transition-transform shrink-0 cursor-pointer duration-150
                        ${token.color === 'red' ? 'bg-red-500 text-white' : ''}
                        ${token.color === 'blue' ? 'bg-blue-500 text-white' : ''}
                        ${token.color === 'green' ? 'bg-emerald-500 text-white' : ''}
                        ${token.color === 'yellow' ? 'bg-amber-400 text-stone-900 font-black' : ''}
                        ${isHighlighted ? 'ring-4 ring-stone-900 scale-125 z-40 shadow-xl cursor-pointer bg-amber-400 text-stone-950 animate-bounce' : 'opacity-95'}
                      `}
                      title={`${player.name} - Bidak ${token.id + 1} (Pos: ${token.position})`}
                    >
                      {/* Token Label */}
                      <span className="text-[9px] uppercase font-black tracking-tighter">
                        {token.color === 'red' ? 'P' : token.color === 'blue' ? 'A' : token.color === 'green' ? 'B' : 'C'}
                      </span>

                      {/* Small crown or number banner if finished */}
                      {token.isFinished && (
                        <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-stone-900 border border-stone-200 px-1 rounded-full text-white font-extrabold z-20">
                          ✓
                        </span>
                      )}

                      {/* Highlighted Outer Glow Ring */}
                      {isHighlighted && (
                        <span className="absolute w-10 h-10 -inset-2 rounded-full border-2 border-dashed border-stone-900 animate-spin-slow pointer-events-none" />
                      )}
                    </motion.button>
                  );
                })}

              </div>
            );
          })
        )}
      </div>

      {/* GAME STATUS LOG AT BOTTOM */}
      <div className="w-full max-w-[430px] bg-white border-2 border-stone-900 px-4 py-3 rounded-2xl flex items-center gap-3 mt-4 text-xs shadow-[3px_3px_0px_0px_#18181b]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0 border border-stone-900" />
        <p className="text-stone-800 leading-normal font-medium text-left truncate" id="lbl_ludo_board_activity">
          {gameStateLog || 'LUMION siap dimainkan! Silakan lempar dadu Anda.'}
        </p>
      </div>
    </div>
  );
}
