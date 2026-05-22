import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Play, Compass, RefreshCw, BarChart2, BookOpen, User, 
  HelpCircle, Star, ArrowRight, Volume2, Gamepad2, Scroll, HeartPulse, Swords 
} from 'lucide-react';

import { Player, Token, PlayerColor, Question, Scene, GameLog } from './types';
import { QUESTIONS_DATABASE } from './data/questions';
import SplashScene from './components/SplashScene';
import CPTPScene from './components/CPTPScene';
import MainMenu from './components/MainMenu';
import LudoBoard, { COMMON_PATH_COORDS, SAFE_INDICES, HOME_STRETCH_COORDS } from './components/LudoBoard';
import ComicCardChallenge from './components/ComicCardChallenge';
import EvaluationDashboard from './components/EvaluationDashboard';

function generateLogId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function App() {
  const [scene, setScene] = useState<Scene>('SPLASH');
  
  // Game state
  const [turn, setTurn] = useState<PlayerColor>('red');
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [hasRolledThisTurn, setHasRolledThisTurn] = useState<boolean>(false);
  const [botInProgress, setBotInProgress] = useState<boolean>(false);

  // Challenge Modals
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [challengeMode, setChallengeMode] = useState<'EXIT' | 'MOVE'>('MOVE');
  const [exitStreak, setExitStreak] = useState<number>(0);
  const [selectedTokenIdForMove, setSelectedTokenIdForMove] = useState<number | null>(null);

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'player',
      name: 'Firdivana',
      color: 'red',
      isBot: false,
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
      tokens: [
        { id: 0, color: 'red', position: -1, stepCount: 0, isFinished: false },
        { id: 1, color: 'red', position: -1, stepCount: 0, isFinished: false }
      ]
    },
    {
      id: 'bot_a',
      name: 'Bot A',
      color: 'blue',
      isBot: true,
      botType: 'high',
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
      tokens: [
        { id: 0, color: 'blue', position: -1, stepCount: 0, isFinished: false },
        { id: 1, color: 'blue', position: -1, stepCount: 0, isFinished: false }
      ]
    },
    {
      id: 'bot_b',
      name: 'Bot B',
      color: 'green',
      isBot: true,
      botType: 'medium',
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
      tokens: [
        { id: 0, color: 'green', position: -1, stepCount: 0, isFinished: false },
        { id: 1, color: 'green', position: -1, stepCount: 0, isFinished: false }
      ]
    },
    {
      id: 'bot_c',
      name: 'Bot C',
      color: 'yellow',
      isBot: true,
      botType: 'low',
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
      tokens: [
        { id: 0, color: 'yellow', position: -1, stepCount: 0, isFinished: false },
        { id: 1, color: 'yellow', position: -1, stepCount: 0, isFinished: false }
      ]
    }
  ]);

  const [logs, setLogs] = useState<GameLog[]>([
    {
      id: generateLogId(),
      timestamp: '14:06',
      message: 'Selamat datang di LUMION. Klik Lempar Dadu untuk memulai giliran belajar Anda!',
      type: 'system'
    }
  ]);

  const addLog = (message: string, type: GameLog['type'], color?: PlayerColor) => {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setLogs((prev) => [
      { id: generateLogId(), timestamp: time, message, type, color },
      ...prev.slice(0, 40) // Keep last 40 logs
    ]);
  };

  const getPlayerByColor = (color: PlayerColor) => {
    return players.find((p) => p.color === color)!;
  };

  const getPlayerTokensInYard = (color: PlayerColor) => {
    return getPlayerByColor(color).tokens.filter((t) => t.position === -1);
  };

  const getPlayerActiveTokens = (color: PlayerColor) => {
    return getPlayerByColor(color).tokens.filter((t) => t.position !== -1 && !t.isFinished);
  };

  // Turn Cycle Loop
  const passTurn = (currentColor: PlayerColor) => {
    setDiceRoll(0);
    setHasRolledThisTurn(false);
    setSelectedTokenIdForMove(null);

    const colors: PlayerColor[] = ['red', 'blue', 'green', 'yellow'];
    const nextIndex = (colors.indexOf(currentColor) + 1) % 4;
    const nextColor = colors[nextIndex];
    setTurn(nextColor);
  };

  // Human Player Dice thrower
  const rollDice = () => {
    if (isRolling || hasRolledThisTurn || turn !== 'red' || botInProgress) return;
    setIsRolling(true);
    addLog('Pemain melemparkan dadu...', 'system', 'red');

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceRoll(rolled);
      setIsRolling(false);
      setHasRolledThisTurn(true);
      addLog(`Dadu pemain mendarat di angka ${rolled}!`, 'roll', 'red');

      const activeTokensCount = getPlayerActiveTokens('red').length;
      
      // Auto trigger release challenge if no tokens are on the track
      if (activeTokensCount === 0) {
        addLog('Semua bidak Anda di kandang. Mengambil tantangan "Keluar Kandang" (Jawab 3 berturut-turut)!', 'system', 'red');
        triggerExitChallenge();
      } else {
        // If rolled is 6, players can choose to release a token (3 questions) or run an active token
        if (rolled === 6 && getPlayerTokensInYard('red').length > 0) {
          addLog('Angka 6! Pilih bidak merah di kandang untuk meluncur, atau klik bidak merah di papan untuk memindahkannya.', 'system', 'red');
        } else {
          addLog('Pilihlah salah satu bidak Merah Anda di papan untuk melangkah maju!', 'system', 'red');
        }
      }
    }, 1000);
  };

  // Yard release click
  const triggerExitChallenge = () => {
    const questionsForExit = QUESTIONS_DATABASE.filter((q) => q.type === 'Refleksi' || q.type === 'Translasi');
    const randomQ = questionsForExit[Math.floor(Math.random() * questionsForExit.length)];
    setActiveQuestion(randomQ);
    setChallengeMode('EXIT');
    setExitStreak(0);
  };

  // Active Token move click handler
  const handleTokenClick = (color: PlayerColor, tokenId: number) => {
    if (turn !== 'red' || !hasRolledThisTurn || color !== 'red') return;

    const token = getPlayerByColor('red').tokens.find((t) => t.id === tokenId)!;

    if (token.position === -1) {
      // Trying to exit yard from a cell click
      if (diceRoll === 6) {
        triggerExitChallenge();
      }
    } else {
      // Normal track move selection
      setSelectedTokenIdForMove(tokenId);
      // Select questions matched with transform types uniformly
      const randomQ = QUESTIONS_DATABASE[Math.floor(Math.random() * QUESTIONS_DATABASE.length)];
      setActiveQuestion(randomQ);
      setChallengeMode('MOVE');
    }
  };

  // Evaluate connection eating
  const moveTokenIndex = (color: PlayerColor, tokenId: number, steps: number) => {
    let checkWin = false;

    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) => {
        if (p.color !== color) return p;

        const updatedTokens = p.tokens.map((t) => {
          if (t.id !== tokenId) return t;

          let nextStepCount = t.stepCount + steps;
          let nextPos = t.position;
          let finished = t.isFinished;

          if (nextStepCount >= 58) {
            // Reached Home Goal!
            nextStepCount = 58;
            nextPos = 58;
            finished = true;
            checkWin = true;
          } else if (nextStepCount >= 52) {
            // Home stretch
            nextPos = nextStepCount;
          } else {
            // Common track
            const offsetMap: Record<PlayerColor, number> = { red: 1, blue: 13, yellow: 26, green: 39 };
            nextPos = (offsetMap[color] + nextStepCount - 1) % 52;
          }

          return { ...t, stepCount: nextStepCount, position: nextPos, isFinished: finished };
        });

        return { ...p, tokens: updatedTokens };
      });
    });

    // Check collision with another player on common track
    setTimeout(() => {
      // Read current token data from players state to determine next position
      let finalPos = -1;
      setPlayers((currentPlayers) => {
        const actor = currentPlayers.find((p) => p.color === color)!;
        const actToken = actor.tokens.find((t) => t.id === tokenId)!;
        finalPos = actToken.position;

        if (finalPos >= 0 && finalPos <= 51 && !SAFE_INDICES.includes(finalPos)) {
          // Check collision with any other player's tokens
          let victimColor: PlayerColor | null = null;
          let victimTokenId = -1;

          currentPlayers.forEach((otherPlayer) => {
            if (otherPlayer.color === color) return;
            otherPlayer.tokens.forEach((otherToken) => {
              if (otherToken.position === finalPos && !otherToken.isFinished) {
                victimColor = otherPlayer.color;
                victimTokenId = otherToken.id;
              }
            });
          });

          if (victimColor !== null) {
            addLog(`⚔️ Lapis Baja! Bidak ${color.toUpperCase()} menyenggol bidak ${victimColor.toUpperCase()} di koordinat umum ${finalPos}. Bidak tersebut tereliminasi dan pulang ke kandang!`, 'eat', color);
            
            // Mutate state to return victim back to -1
            return currentPlayers.map((p) => {
              if (p.color !== victimColor) return p;
              const rep = p.tokens.map((vt) => {
                if (vt.id === victimTokenId) {
                  return { ...vt, position: -1, stepCount: 0 };
                }
                return vt;
              });
              return { ...p, tokens: rep };
            });
          }
        }
        return currentPlayers;
      });

      if (checkWin) {
        addLog(`🎉 LUAR BIASA! Bidak ${color.toUpperCase()} nomor ${tokenId + 1} berhasil memasuki GOAL UTAMA! Evaluasi selesai!`, 'challenge_success', color);
        setTimeout(() => {
          setScene('EVALUATION');
        }, 1500);
      }
    }, 300);
  };

  // Process human challenge completion
  const handleChallengeSuccess = () => {
    setActiveQuestion(null);
    const pQ = activeQuestion!;

    // 1. Log stats of representation correctness for Red player
    setPlayers((prev) => 
      prev.map((p) => {
        if (p.color !== 'red') return p;
        
        const qTypeLower = pQ.type === 'Refleksi' ? 'visual' : pQ.type === 'Translasi' ? 'symbolic' : 'verbal';
        const updatedStats = { ...p.representationStats };
        
        if (qTypeLower === 'visual') {
          updatedStats.visual += 1;
          updatedStats.totalVisual += 1;
        } else if (qTypeLower === 'symbolic') {
          updatedStats.symbolic += 1;
          updatedStats.totalSymbolic += 1;
        } else {
          updatedStats.verbal += 1;
          updatedStats.totalVerbal += 1;
        }

        return {
          ...p,
          correctAnswers: p.correctAnswers + 1,
          totalAnswers: p.totalAnswers + 1,
          score: p.score + (challengeMode === 'EXIT' ? 50 : 20),
          representationStats: updatedStats
        };
      })
    );

    if (challengeMode === 'EXIT') {
      const nextStreak = exitStreak + 1;
      if (nextStreak >= 3) {
        addLog('Kunci Kandang Terbuka! Berhasil menjawab 3 soal matematika berturut-turut. Bidak Merah Anda diliris ke papan!', 'challenge_success', 'red');
        
        // Find the first token in base and release it!
        setPlayers((prev) => {
          const human = prev.find((p) => p.color === 'red')!;
          const targetToken = human.tokens.find((t) => t.position === -1);
          if (targetToken) {
            const updatedTokens = human.tokens.map((t) => 
              t.id === targetToken.id ? { ...t, position: 1, stepCount: 1 } : t
            );
            return prev.map((p) => p.color === 'red' ? { ...p, tokens: updatedTokens } : p);
          }
          return prev;
        });

        setExitStreak(0);
        passTurn('red');
      } else {
        setExitStreak(nextStreak);
        addLog(`Jawaban benar! Streak peluncuran berturut-turut: ${nextStreak}/3. Jawab soal berikutnya!`, 'system', 'red');
        
        // Trigger another question
        const questionsForExit = QUESTIONS_DATABASE.filter((q) => q.type === 'Refleksi' || q.type === 'Translasi');
        const randomQ = questionsForExit[Math.floor(Math.random() * questionsForExit.length)];
        setTimeout(() => {
          setActiveQuestion(randomQ);
        }, 400);
      }
    } else {
      // Normal move
      addLog(`Jawaban benar! Bidak Merah nomor ${selectedTokenIdForMove! + 1} melangkah maju sejauh ${diceRoll} kotak.`, 'challenge_success', 'red');
      moveTokenIndex('red', selectedTokenIdForMove!, diceRoll);
      passTurn('red');
    }
  };

  const handleChallengeFail = () => {
    setActiveQuestion(null);
    const pQ = activeQuestion!;

    // Log stats for incorrect answer
    setPlayers((prev) => 
      prev.map((p) => {
        if (p.color !== 'red') return p;
        
        const qTypeLower = pQ.type === 'Refleksi' ? 'visual' : pQ.type === 'Translasi' ? 'symbolic' : 'verbal';
        const updatedStats = { ...p.representationStats };
        
        if (qTypeLower === 'visual') {
          updatedStats.totalVisual += 1;
        } else if (qTypeLower === 'symbolic') {
          updatedStats.totalSymbolic += 1;
        } else {
          updatedStats.totalVerbal += 1;
        }

        return {
          ...p,
          totalAnswers: p.totalAnswers + 1,
          representationStats: updatedStats
        };
      })
    );

    if (challengeMode === 'EXIT') {
      addLog('Representasi Anda Kurang Tepat! Streak dibatalkan dan bidak tetap tinggal di base. Giliran diserahkan ke Bot.', 'challenge_fail', 'red');
    } else {
      addLog(`Representasi geometris kurang tepat! Bidak Merah nomor ${selectedTokenIdForMove! + 1} batal bergerak gilirannya hangus.`, 'challenge_fail', 'red');
    }

    setExitStreak(0);
    passTurn('red');
  };

  // Automated BOT turns loops trigger
  useEffect(() => {
    if (turn === 'red' || botInProgress || scene !== 'GAME_PLAY') return;

    setBotInProgress(true);
    addLog(`Kini giliran ${getPlayerByColor(turn).name}. Membaca dadu...`, 'system', turn);

    setTimeout(() => {
      // Roll Bot dice
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceRoll(rolled);
      addLog(`${getPlayerByColor(turn).name} melempar dadu dan memperoleh angka ${rolled}!`, 'roll', turn);

      const bot = getPlayerByColor(turn);
      const activeTokens = getPlayerActiveTokens(turn);
      const botType = bot.botType || 'medium';
      
      // Bot accuracy chance rates (High 80%, Med 60%, Low 40%)
      const accuracyChance = botType === 'high' ? 0.8 : botType === 'medium' ? 0.6 : 0.4;
      const isBotCorrect = Math.random() < accuracyChance;

      setTimeout(() => {
        if (activeTokens.length === 0) {
          // Bot is in yard and trying to exit yard.
          // In Ludo rules, bots must score correct to release yard. Let's trigger simulated yard exit
          if (isBotCorrect) {
            addLog(`${bot.name} menjawab tantangan representasi visual secara BENAR dan melepaskan bidak ke papan!`, 'challenge_success', turn);
            
            setPlayers((prev) => {
              const currentBot = prev.find((p) => p.color === turn)!;
              const openToken = currentBot.tokens.find((t) => t.position === -1);
              if (openToken) {
                const startCellMap: Record<PlayerColor, number> = { red: 1, blue: 13, yellow: 26, green: 39 };
                const updatedTokens = currentBot.tokens.map((t) => 
                  t.id === openToken.id ? { ...t, position: startCellMap[turn], stepCount: 1 } : t
                );
                return prev.map((p) => p.color === turn ? { ...p, tokens: updatedTokens } : p);
              }
              return prev;
            });
          } else {
            addLog(`${bot.name} sedang bernalar namun jawabannya salah. Bidak tetap tertahan di base.`, 'challenge_fail', turn);
          }
          setBotInProgress(false);
          passTurn(turn);
        } else {
          // Bot has active tokens.
          // If rolled 6 and has a token in yard, 50% chance to release or write normal move
          const hasYardTokens = getPlayerTokensInYard(turn).length > 0;
          const shouldRelease = rolled === 6 && hasYardTokens && Math.random() > 0.5;

          if (shouldRelease) {
            if (isBotCorrect) {
              addLog(`${bot.name} memodelkan translasi lampion secara BENAR dan meluncurkan selembar bidak baru ke jalur utama!`, 'challenge_success', turn);
              setPlayers((prev) => {
                const currentBot = prev.find((p) => p.color === turn)!;
                const openToken = currentBot.tokens.find((t) => t.position === -1);
                if (openToken) {
                  const startCellMap: Record<PlayerColor, number> = { red: 1, blue: 13, yellow: 26, green: 39 };
                  const updatedTokens = currentBot.tokens.map((t) => 
                    t.id === openToken.id ? { ...t, position: startCellMap[turn], stepCount: 1 } : t
                  );
                  return prev.map((p) => p.color === turn ? { ...p, tokens: updatedTokens } : p);
                }
                return prev;
              });
            } else {
              addLog(`${bot.name} gagal merumuskan koordinat rilis dan bidak asalnya gagal meluncur keluar.`, 'challenge_fail', turn);
            }
            setBotInProgress(false);
            passTurn(turn);
          } else {
            // Normal track move
            if (isBotCorrect) {
              const targetBotToken = activeTokens[0]; // move the first active token
              addLog(`${bot.name} memodelkan transformasi Geometri secara BENAR dan melangkah maju sejauh ${rolled} kotak!`, 'challenge_success', turn);
              moveTokenIndex(turn, targetBotToken.id, rolled);
            } else {
              addLog(`${bot.name} salah merumuskan pergeseran koordinat, bidak batal bergerak. Giliran dialihkan.`, 'challenge_fail', turn);
            }
            // Give layout animation time before passing state
            setTimeout(() => {
              setBotInProgress(false);
              passTurn(turn);
            }, 500);
          }
        }
      }, 1500);

    }, 1500);

  }, [turn, scene]);

  // Restart game triggers
  const handleRestartGame = () => {
    setTurn('red');
    setDiceRoll(0);
    setHasRolledThisTurn(false);
    setBotInProgress(false);
    setActiveQuestion(null);
    setExitStreak(0);
    const existingPlayerName = players.find((p) => p.id === 'player')?.name || 'Firdivana';
    setPlayers([
      {
        id: 'player',
        name: existingPlayerName,
        color: 'red',
        isBot: false,
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
        tokens: [
          { id: 0, color: 'red', position: -1, stepCount: 0, isFinished: false },
          { id: 1, color: 'red', position: -1, stepCount: 0, isFinished: false }
        ]
      },
      {
        id: 'bot_a',
        name: 'Bot A',
        color: 'blue',
        isBot: true,
        botType: 'high',
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
        tokens: [
          { id: 0, color: 'blue', position: -1, stepCount: 0, isFinished: false },
          { id: 1, color: 'blue', position: -1, stepCount: 0, isFinished: false }
        ]
      },
      {
        id: 'bot_b',
        name: 'Bot B',
        color: 'green',
        isBot: true,
        botType: 'medium',
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
        tokens: [
          { id: 0, color: 'green', position: -1, stepCount: 0, isFinished: false },
          { id: 1, color: 'green', position: -1, stepCount: 0, isFinished: false }
        ]
      },
      {
        id: 'bot_c',
        name: 'Bot C',
        color: 'yellow',
        isBot: true,
        botType: 'low',
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        representationStats: { visual: 0, symbolic: 0, verbal: 0, totalVisual: 0, totalSymbolic: 0, totalVerbal: 0 },
        tokens: [
          { id: 0, color: 'yellow', position: -1, stepCount: 0, isFinished: false },
          { id: 1, color: 'yellow', position: -1, stepCount: 0, isFinished: false }
        ]
      }
    ]);
    setLogs([
      {
        id: generateLogId(),
        timestamp: '14:06',
        message: 'Permainan LUMION direset. Silakan tekan dadu untuk giliran baru Anda!',
        type: 'system'
      }
    ]);
    setScene('GAME_PLAY');
  };

  // Exit application click helper
  const handleExitApplication = () => {
    addLog('Aplikasi ditutup oleh pengguna. Sampai jumpa kembali!', 'system');
    setScene('SPLASH');
  };

  return (
    <div className="absolute inset-0 bg-stone-100 select-none overflow-hidden text-stone-900">
      <AnimatePresence mode="wait">
        
        {/* SCENE 1: SPLASH */}
        {scene === 'SPLASH' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 overflow-y-auto bg-stone-50"
          >
            <SplashScene 
              onStart={(enteredName) => {
                const finalName = enteredName.trim() || 'Firdivana';
                setPlayers(prev => prev.map(p => p.id === 'player' ? { ...p, name: finalName } : p));
                setScene('CPTP');
              }} 
              onExit={handleExitApplication} 
            />
          </motion.div>
        )}

        {/* SCENE 2: CAPAIAN DAN TUJUAN PEMBELAJARAN */}
        {scene === 'CPTP' && (
          <motion.div
            key="cptp"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute inset-0 z-45 overflow-y-auto bg-stone-50"
          >
            <CPTPScene onNext={() => setScene('MAIN_MENU')} />
          </motion.div>
        )}

        {/* SCENE 3: MAIN MENU */}
        {scene === 'MAIN_MENU' && (
          <motion.div
            key="main_menu"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute inset-0 z-40 bg-stone-50"
          >
            <MainMenu 
              onStartGame={() => setScene('GAME_PLAY')} 
              onBackToSplash={() => setScene('SPLASH')} 
            />
          </motion.div>
        )}

        {/* SCENE 4: GAMEPLAY (LUSIO LUDO SYSTEM) */}
        {scene === 'GAME_PLAY' && (
          <motion.div
            key="gameplay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col justify-between p-4 md:p-6 bg-stone-50 text-stone-900 overflow-y-auto font-sans"
          >
            {/* Top Navigation headers */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] shrink-0 text-stone-900">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setScene('MAIN_MENU')}
                  id="btn_game_back_menu"
                  className="px-4 py-2 bg-stone-100 border-2 border-stone-900 hover:bg-stone-200 rounded-xl text-xs font-black text-stone-900 shadow-[1px_1px_0px_0px_#1c1917] cursor-pointer cursor-transform active:translate-y-0.5 transition-all"
                >
                  Menu Utama
                </button>
                <div className="h-4 w-0.5 bg-stone-200" />
                <div>
                  <h2 className="text-sm font-black tracking-tight flex items-center gap-1.5 text-stone-900">
                    <Compass className="w-4 h-4 text-red-700 animate-spin-slow" />
                    LUMION Permainan Ludo
                  </h2>
                  <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest hidden sm:block font-bold">Fase Kegiatan Inti: Investigasi Terbimbing</p>
                </div>
              </div>

              {/* Player Turn Indicator banner */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-bold font-mono">Giliran Anda selanjutnya:</span>
                <div className={`px-3 py-1 rounded-xl text-xs font-black font-mono border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center gap-1.5 uppercase ${
                  turn === 'red' ? 'bg-red-100 text-red-700' :
                  turn === 'blue' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                  turn === 'green' ? 'bg-emerald-100 text-emerald-700 animate-pulse' :
                  'bg-yellow-100 text-yellow-700 animate-pulse'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full border border-stone-900 ${
                    turn === 'red' ? 'bg-red-500' :
                    turn === 'blue' ? 'bg-blue-500' :
                    turn === 'green' ? 'bg-emerald-500' : 'bg-yellow-500'
                  }`} />
                  <span>{getPlayerByColor(turn).name}</span>
                </div>
              </div>
            </div>

            {/* Core gameplay partition */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full max-w-6xl mx-auto my-4 py-2">
              
              {/* Left Column: Player statistics and logs (Col 4) */}
              <div className="lg:col-span-4 flex flex-col gap-4 self-stretch justify-between">
                
                {/* 1. Players Status List panel */}
                <div className="bg-white rounded-3xl border-2 border-stone-900 p-4 space-y-2.5 shadow-[4px_4px_0px_0px_#1c1917] flex-1 mb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest font-mono text-stone-500 border-b-2 border-stone-100 pb-2 mb-2 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-red-700 font-black" />
                    Status Peserta & Bot
                  </h3>

                  <div className="space-y-2 text-xs">
                    {players.map((p) => {
                      const isTurn = turn === p.color;
                      const activeOnBoard = p.tokens.filter((t) => t.position !== -1 && !t.isFinished).length;
                      const finished = p.tokens.filter((t) => t.isFinished).length;

                      return (
                        <div 
                          key={p.color} 
                          className={`p-2.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                            isTurn 
                              ? 'bg-amber-50 border-stone-900 shadow-[2px_2px_0px_0px_#1a1a1a] font-bold text-stone-900' 
                              : 'bg-stone-50/50 border-stone-200 text-stone-500'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-3.5 h-3.5 rounded-full border-2 border-stone-900 shrink-0 ${
                              p.color === 'red' ? 'bg-red-500' :
                              p.color === 'blue' ? 'bg-blue-500' :
                              p.color === 'green' ? 'bg-emerald-500' : 'bg-yellow-500'
                            }`} />
                            <div className="text-left">
                              <p className={`font-black font-sans text-xs truncate max-w-[150px] ${isTurn ? 'text-stone-900' : 'text-stone-500'}`}>
                                {p.name}
                              </p>
                              <p className="text-[10px] text-stone-500 font-medium">
                                Skor: <span className="font-extrabold text-red-700">{p.score} pts</span> • Jalan: {activeOnBoard} • Goal: {finished}/2
                              </p>
                            </div>
                          </div>
                          {p.isBot && (
                            <span className="text-[8px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-md font-black font-mono border border-stone-200 shrink-0 uppercase">
                              Bot
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Logs Activities panel */}
                <div className="bg-white rounded-3xl border-2 border-stone-900 p-4 shadow-[4px_4px_0px_0px_#1c1917] h-44 flex flex-col justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest font-mono text-stone-500 border-b-2 border-stone-100 pb-2 mb-2 flex items-center gap-2 shrink-0">
                    <Scroll className="w-3.5 h-3.5 text-red-750 font-black" />
                    Aktivitas & Log Kelas
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-1.5 text-[10px] font-mono text-left pr-1 scrollbar-thin text-stone-800">
                    {logs.map((log) => (
                      <div key={log.id} className="leading-snug flex items-start gap-1 font-bold">
                        <span className="text-stone-400 select-none">[{log.timestamp}]</span>
                        <span className={`
                          ${log.color === 'red' ? 'text-red-700 font-extrabold' : ''}
                          ${log.color === 'blue' ? 'text-blue-700 font-extrabold' : ''}
                          ${log.color === 'green' ? 'text-emerald-750 font-extrabold' : ''}
                          ${log.color === 'yellow' ? 'text-amber-700 font-extrabold' : ''}
                          ${log.type === 'system' ? 'text-stone-500 italic font-medium' : ''}
                        `}>
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Middle Column: Ludo Board Grid (Col 5) */}
              <div className="lg:col-span-5 flex justify-center">
                <LudoBoard 
                  players={players} 
                  activeColor={turn} 
                  highlightedTokenIds={
                    turn === 'red' && hasRolledThisTurn 
                      ? (diceRoll === 6 
                          ? [0, 1] // Either out of base, or run forward 
                          : getPlayerActiveTokens('red').map((t) => t.id)
                        )
                      : []
                  }
                  onTokenClick={handleTokenClick}
                  gameStateLog={
                    isRolling ? 'Dadu sedang berputar...' :
                    hasRolledThisTurn && turn === 'red' 
                      ? `Hasil dadu Anda: ${diceRoll}. Silakan klik bidak Merah Anda untuk melangkah!`
                      : logs[0]?.message
                  }
                />
              </div>

              {/* Right Column: Dice wheel mechanisms and guides (Col 3) */}
              <div className="lg:col-span-3 flex flex-col gap-4 self-stretch justify-around p-4 bg-white rounded-3xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] text-stone-900">
                
                {/* Rolling dice mechanism */}
                <div className="text-center space-y-4">
                  <span className="text-[10px] font-black font-mono uppercase tracking-widest text-stone-400 block">Dadu Digital Permainan Ludo</span>
                  
                  {/* Floating Dice Block */}
                  <motion.div 
                    animate={isRolling ? { rotate: [0, 360, 720], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="w-20 h-20 bg-stone-50 border-4 border-stone-900 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black text-red-700 shadow-[3px_3px_0px_0px_#1c1917] relative"
                  >
                    {isRolling ? (
                      <span className="text-xl animate-spin">🌀</span>
                    ) : (
                      diceRoll || '?'
                    )}
                    
                    {/* Corner pips representation for high-fidelity look */}
                    {!isRolling && diceRoll > 0 && (
                      <div className="absolute inset-1.5 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-20 pointer-events-none">
                        {Array.from({ length: 9 }).map((_, idx) => (
                          <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-900 mx-auto my-auto" />
                        ))}
                      </div>
                    )}
                  </motion.div>

                  <div>
                    {turn === 'red' ? (
                      <button
                        onClick={rollDice}
                        id="btn_game_roll"
                        disabled={isRolling || hasRolledThisTurn || botInProgress}
                        className="w-full py-3.5 bg-red-600 hover:bg-red-750 disabled:bg-stone-100 rounded-2xl border-2 border-stone-900 text-white disabled:text-stone-400 font-black text-xs tracking-wider uppercase shadow-[3px_3px_0px_0px_#1c1917] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1c1917] transition-all cursor-pointer"
                      >
                        {isRolling ? 'Memutar...' : hasRolledThisTurn ? 'Langkah Menunggu' : 'Lempar Dadu'}
                      </button>
                    ) : (
                      <div className="px-6 py-3.5 bg-stone-50 rounded-2xl text-xs font-black font-mono text-stone-500 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] animate-pulse">
                        Bot sedang bernalar...
                      </div>
                    )}
                  </div>
                </div>

                {/* Educational stimulus guide to motivate learning */}
                <div className="bg-amber-50 border-2 border-stone-900 p-4 rounded-2xl flex flex-col gap-2 shadow-[2px_2px_0px_0px_#1c1917] text-stone-850">
                  <h4 className="font-black flex items-center gap-1.5 uppercase font-mono tracking-wider text-[10px] text-amber-750">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Penuntun Belajar
                  </h4>
                  <p className="text-[10px] text-stone-600 leading-normal font-sans font-medium text-left">
                    Gunakan giliran Anda untuk mengamati simetri, pergeseran lampion, lingkaran ba-gua, dan tumpukan pagoda. Setiap representasi Anda divalidasi oleh sistem sains matematika agar bidak Anda diizinkan berlari.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* SCENE 7: DIAGNOSTIC DASHBOARD (EVALUATION) */}
        {scene === 'EVALUATION' && (
          <motion.div
            key="evaluation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 overflow-y-auto bg-stone-50"
          >
            <EvaluationDashboard 
              player={getPlayerByColor('red')} 
              onRestart={handleRestartGame} 
              onBackToMainMenu={() => setScene('MAIN_MENU')} 
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* ACTIVE COMIC CARD MATHEMATIC CHALLENGE MODAL OVERLAY */}
      <AnimatePresence>
        {activeQuestion !== null && (
          <ComicCardChallenge 
            question={activeQuestion}
            streakCount={exitStreak}
            mode={challengeMode}
            onSuccess={handleChallengeSuccess}
            onFail={handleChallengeFail}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
