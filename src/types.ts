export type TransformType = 'Refleksi' | 'Translasi' | 'Rotasi' | 'Dilatasi';

export interface Question {
  id: string;
  type: TransformType;
  landmark: string;
  narasi: string;
  visualPlaceholder: string; // Detail description of the visual asset to construct SVG mockup
  stimulus: string;
  mathQuestion: string;
  options: string[];
  answer: number; // Index of correct option (0-3)
  explanation: string;
}

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';

export interface Token {
  id: number; // 0..3
  color: PlayerColor;
  position: number; // -1 means in yard, 0..50 is main track path index, 51..56 is home stretch path index, 57 is home goal
  stepCount: number; // count of cells moved overall. 0 means in yard, 1..51 is main track, 52..57 is home stretch
  isFinished: boolean;
}

export interface Player {
  id: string; // 'player' | 'bot_a' | 'bot_b' | 'bot_c'
  name: string;
  color: PlayerColor;
  isBot: boolean;
  botType?: 'high' | 'medium' | 'low'; // High Bot A, Med Bot B, Low Bot C
  tokens: Token[];
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  representationStats: {
    visual: number;    // Correct count
    symbolic: number;  // Correct count
    verbal: number;    // Correct count
    totalVisual: number;
    totalSymbolic: number;
    totalVerbal: number;
  };
}

export interface GameLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'roll' | 'move' | 'challenge_success' | 'challenge_fail' | 'system' | 'eat' | 'safe';
  color?: PlayerColor;
}

export type Scene = 'SPLASH' | 'CPTP' | 'MAIN_MENU' | 'GAME_PLAY' | 'EVALUATION';
