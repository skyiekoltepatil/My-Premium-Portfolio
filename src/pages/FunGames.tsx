import React, { useState, lazy, Suspense } from 'react';
import ErrorBoundary from '../components/effects/ErrorBoundary';
import { ModalDialog } from '../components/ui/ModalDialog';

const ScribblePad = lazy(() => import('../components/games/ScribblePad'));
const MacbookStickers = lazy(() => import('../components/games/MacbookStickers'));
const TicTacToe = lazy(() => import('../components/games/TicTacToe'));
const MemoryMatch = lazy(() => import('../components/games/MemoryMatch'));
const SnakeGame = lazy(() => import('../components/games/SnakeGame'));

/* ──────────────────────────────────────────────
   Game Definitions
   ────────────────────────────────────────────── */

interface FeatureItem {
  icon: string;
  label: string;
}

interface GameDef {
  id: string;
  num: string;
  category: string;
  mood: string;
  title: string;
  description: string;
  features?: FeatureItem[];
  icon: React.ReactNode;
}

const GAMES: GameDef[] = [
  {
    id: 'scribble',
    num: '01',
    category: 'CREATIVE',
    mood: 'Create',
    title: 'Scribble Pad',
    description: 'Draw, sketch and let your creativity flow on an infinite canvas.',
    features: [
      { icon: '∞', label: 'INFINITE CANVAS' },
      { icon: '✎', label: 'SMOOTH DRAWING' },
      { icon: '⚙', label: 'CUSTOM COLORS' },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M7 25L9.5 17.5L23.5 3.5C24.5 2.5 26 2.5 27 3.5C28 4.5 28 6 27 7L13 21L7 25Z" stroke="#FF4400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 5.5L25 9.5" stroke="#FF4400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 27C10 27 12 25 15 28" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'tictactoe',
    num: '02',
    category: 'THINK',
    mood: 'Think',
    title: 'Tic Tac Toe',
    description: 'Classic X & O game. Challenge yourself against smart AI.',
    features: [
      { icon: '🤖', label: 'SMART AI' },
      { icon: '⚡', label: 'INSTANT REPLAY' },
      { icon: '🎯', label: 'MINIMAL UI' },
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <line x1="14" y1="6" x2="14" y2="30" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="22" y1="6" x2="22" y2="30" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="6" y1="14" x2="30" y2="14" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="6" y1="22" x2="30" y2="22" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="2.8" stroke="#FF4400" strokeWidth="2.2" />
        <path d="M8 8L12 12M12 8L8 12" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'memory',
    num: '03',
    category: 'MEMORY',
    mood: 'Remember',
    title: 'Memory Match',
    description: 'Flip and match pairs of cards. Test your memory skills!',
    features: [
      { icon: '🃏', label: 'PAIR MATCHING' },
      { icon: '⏱', label: 'TIMER TRACKER' },
      { icon: '🧠', label: 'BRAIN SHARPENER' },
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="9" width="13" height="18" rx="3" transform="rotate(-10 7 9)" stroke="#1C1917" strokeWidth="2.2" />
        <circle cx="12" cy="18" r="1.5" fill="#FF4400" />
        <rect x="16" y="9" width="13" height="18" rx="3" stroke="#1C1917" strokeWidth="2.2" fill="#FAF9F6" />
        <circle cx="22.5" cy="15" r="1.5" fill="#1C1917" />
        <circle cx="22.5" cy="21" r="1.5" fill="#1C1917" />
      </svg>
    ),
  },
  {
    id: 'snake',
    num: '04',
    category: 'COMPETE',
    mood: 'Compete',
    title: 'Snake Game',
    description: 'Guide the snake, eat food and grow. A retro classic!',
    features: [
      { icon: '🐍', label: 'RETRO ARCADE' },
      { icon: '🏆', label: 'HIGH SCORE' },
      { icon: '⌨', label: 'SMOOTH CONTROLS' },
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M8 26H15C16.1 26 17 25.1 17 24V18C17 16.9 17.9 16 19 16H23C24.1 16 25 15.1 25 14V10"
          stroke="#1C1917"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="9" r="2.5" fill="#16A34A" />
        <circle cx="8" cy="26" r="3" fill="#FF4400" />
      </svg>
    ),
  },
  {
    id: 'macstickers',
    num: '05',
    category: 'CUSTOMIZE',
    mood: 'Create',
    title: 'Mac Stickers',
    description: 'Decorate a MacBook with interactive 3D physics stickers.',
    features: [
      { icon: '💻', label: 'MAC LAPTOP 3D' },
      { icon: '✨', label: 'PHYSICS DRAG' },
      { icon: '🎨', label: 'STICKER PACK' },
    ],
    icon: (
      <svg width="38" height="36" viewBox="0 0 38 36" fill="none">
        <rect x="7" y="10" width="24" height="16" rx="2" stroke="#1C1917" strokeWidth="2.2" />
        <line x1="4" y1="26" x2="34" y2="26" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="19" cy="18" r="4.5" fill="#FF4400" />
        <circle cx="17.5" cy="17" r="0.75" fill="white" />
        <circle cx="20.5" cy="17" r="0.75" fill="white" />
        <path d="M17.5 19.5C18 20.5 20 20.5 20.5 19.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="14" y1="7" x2="15" y2="8.5" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="7" x2="23" y2="8.5" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────────
   Game Modal Component
   ────────────────────────────────────────────── */

const GameModal = ({ game, onClose }: { game: GameDef | null; onClose: () => void }) => {
  const renderGame = () => {
    if (!game) return null;
    switch (game.id) {
      case 'scribble':
        return (
          <ScribblePad
            backgroundColor="#1a1a1a"
            colors={['#FF4400', '#FFA94D', '#69DB7C', '#4DABF7', '#CC5DE8', '#ffffff']}
            strokeWidths={[4, 8, 12, 16, 20]}
            defaultStrokeWidth={8}
            defaultStrokeColor="#FF4400"
            borderRadius="12px"
            height="420px"
            wiggle={{ enable: true, movement: 0.5, speed: 2 }}
          />
        );
      case 'tictactoe':
        return <TicTacToe />;
      case 'memory':
        return <MemoryMatch />;
      case 'snake':
        return <SnakeGame />;
      case 'macstickers':
        return <MacbookStickers />;
      default:
        return null;
    }
  };

  return (
    <ModalDialog
      isOpen={Boolean(game)}
      onClose={onClose}
      labelledBy="game-modal-title"
    >
      {game && (
        <div
          className={`bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col ${
            game.id === 'macstickers' ? 'w-[min(94vw,72rem)]' : 'w-[min(92vw,48rem)]'
          }`}
          style={{ maxHeight: '90dvh' }}
        >
          {/* Modal Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#FF4400] tracking-widest uppercase">
                // {game.num} {game.category}
              </span>
              <span className="text-white/20">|</span>
              <h1 id="game-modal-title" className="text-white font-bold text-lg tracking-tight font-sans">
                {game.title}
              </h1>
            </div>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto">
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64 text-slate-400">
                    <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF4400] rounded-full animate-spin" />
                  </div>
                }
              >
                {renderGame()}
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      )}
    </ModalDialog>
  );
};

/* ──────────────────────────────────────────────
   Main Fun Games Page Component
   ────────────────────────────────────────────── */

export const FunGames: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [featuredGame, setFeaturedGame] = useState<GameDef>(GAMES[0]);
  const [activeModalGame, setActiveModalGame] = useState<GameDef | null>(null);

  const moods = [
    { label: 'Create', icon: '✎', id: 'scribble' },
    { label: 'Think', icon: '⚙', id: 'tictactoe' },
    { label: 'Remember', icon: '🗂', id: 'memory' },
    { label: 'Compete', icon: '🏆', id: 'snake' },
  ];

  const handleMoodSelect = (mood: string, targetGameId: string) => {
    setSelectedMood(mood);
    const target = GAMES.find((g) => g.id === targetGameId);
    if (target) setFeaturedGame(target);
  };

  const secondaryGames = GAMES.filter((g) => g.id !== featuredGame.id);

  return (
    <div className="bg-[#F8F8F6] text-stone-900 font-sans selection:bg-[#FF4400] selection:text-white pt-4 sm:pt-7 pb-12 sm:pb-16 min-h-[calc(100svh-3rem)] flex items-center">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Outer Architectural Container matching mockup */}
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] shadow-sm overflow-hidden">

          {/* Hero Title Section */}
          <div className="px-6 sm:px-10 py-10 md:py-14 border-b border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-3">
                A LITTLE PLAY BREAK
              </p>
              <h1 className="text-[clamp(3.25rem,8vw,6.5rem)] font-black tracking-tight leading-[0.92] text-stone-950 mb-4">
                Fun <span className="text-[#FF4400]">Games</span>
              </h1>
              <p className="text-stone-600 text-base sm:text-lg font-medium max-w-xl">
                Five small experiences. One well-earned break.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-stone-200 lg:pl-8">
              <div>
                <p className="text-xs font-mono font-bold text-stone-400 mb-2">// 01</p>
                <div className="text-[11px] font-bold tracking-widest text-stone-400 leading-relaxed uppercase flex flex-col">
                  <span>PLAY</span>
                  <span>EXPLORE</span>
                  <span>RELAX</span>
                  <span>REPEAT</span>
                </div>
              </div>

              <div>
                <p className="text-stone-800 text-sm leading-snug font-medium mb-3">
                  Small games.<br />
                  Big breaks.<br />
                  Same sharper you.
                </p>
                <div className="w-6 h-0.5 bg-stone-300" />
              </div>
            </div>
          </div>

          {/* Main 2-Column Interactive Games Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Featured Game Card */}
            <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between relative bg-white">
              
              {/* Card Header Row */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-bold tracking-widest text-stone-600 uppercase">
                  {featuredGame.num} / {featuredGame.category}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-200 bg-[#FAF9F6] text-[11px] font-bold tracking-wider text-stone-700">
                  FEATURED
                </div>
              </div>

              {/* Card Body: Title, Text, CTA, and Artwork */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative mb-10">
                <div className="md:col-span-6 z-10">
                  <h2 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-black tracking-tight leading-[0.95] text-stone-950 mb-5">
                    {featuredGame.title.split(' ')[0]}<br />
                    {featuredGame.title.split(' ').slice(1).join(' ')}
                  </h2>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
                    {featuredGame.description}
                  </p>

                  <button
                    onClick={() => setActiveModalGame(featuredGame)}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-black hover:bg-[#FF4400] text-white rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                  >
                    <span>PLAY NOW</span>
                    <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                      ↗
                    </span>
                  </button>
                </div>

                {/* Right Side Artwork: Stylized Interactive Ink Sketch */}
                <div className="md:col-span-6 relative flex items-center justify-center min-h-[240px] select-none">
                  <svg
                    viewBox="30 50 270 230"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-[330px] h-auto drop-shadow-sm transform hover:scale-105 transition-transform duration-500"
                  >
                    <path d="M40 180 C80 60, 240 40, 280 140" stroke="#E5E5DE" strokeWidth="1" strokeDasharray="3 3" />
                    
                    <path
                      d="M60 170 C100 80, 160 100, 190 140 C230 190, 170 270, 240 260 C270 255, 290 200, 260 150 C235 110, 180 80, 150 120"
                      stroke="#1C1917"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M125 180 Q160 215, 205 185 Q250 155, 220 230 Q200 270, 175 220 Z"
                      fill="#1C1917"
                    />

                    <circle cx="125" cy="180" r="16" fill="#1C1917" />

                    <line x1="225" y1="120" x2="235" y2="120" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="230" y1="115" x2="230" y2="125" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />

                    <path
                      d="M230 250 C240 220, 260 215, 255 245 C250 270, 270 275, 285 240"
                      stroke="#1C1917"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M120 230 C130 240, 145 240, 155 235"
                      stroke="#1C1917"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <path d="M150 230 L156 235 L150 240" stroke="#1C1917" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

                    <text
                      x="70"
                      y="215"
                      fill="#1C1917"
                      fontSize="14"
                      fontStyle="italic"
                      fontFamily="Playfair Display, serif"
                      transform="rotate(-12, 70, 215)"
                    >
                      Ideas
                    </text>
                    <text
                      x="74"
                      y="230"
                      fill="#1C1917"
                      fontSize="13"
                      fontStyle="italic"
                      fontFamily="Playfair Display, serif"
                      transform="rotate(-12, 74, 230)"
                    >
                      happen here.
                    </text>
                  </svg>
                </div>
              </div>

              {/* Bottom Feature Badges Strip */}
              <div className="grid grid-cols-3 border-t border-stone-200 pt-6">
                {(featuredGame.features || []).map((feat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                      idx !== 0 ? 'border-l border-stone-200 pl-4 sm:pl-6' : 'pr-4'
                    }`}
                  >
                    <span className="text-xl mb-1 text-stone-800">{feat.icon}</span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase">
                      {feat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Game Rows 02 to 05 */}
            <div className="lg:col-span-5 divide-y divide-stone-200 bg-[#FAF9F7]">
              {secondaryGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => {
                    setFeaturedGame(game);
                    setSelectedMood(game.mood);
                  }}
                  className="p-6 sm:p-7 hover:bg-white transition-all duration-200 cursor-pointer group flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-5 sm:gap-6 min-w-0">
                    {/* Number & Category */}
                    <div className="flex flex-col w-14 shrink-0">
                      <span className="text-xl font-bold text-stone-900 group-hover:text-[#FF4400] transition-colors font-mono">
                        {game.num}
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">
                        / {game.category}
                      </span>
                    </div>

                    {/* Custom SVG Icon */}
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-2xs group-hover:border-stone-300 transition-colors">
                      {game.icon}
                    </div>

                    {/* Title & Description */}
                    <div className="min-w-0 pr-2">
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#FF4400] transition-colors truncate">
                        {game.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 leading-snug line-clamp-2">
                        {game.description}
                      </p>
                    </div>
                  </div>

                  {/* Circular Arrow Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalGame(game);
                    }}
                    className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 shrink-0 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
                    aria-label={`Play ${game.title}`}
                  >
                    <span className="text-base group-hover:translate-x-0.5 transition-transform duration-200">
                      →
                    </span>
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Mood Selector Bar */}
          <div className="border-t border-stone-200 px-6 sm:px-10 py-5 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-stone-600 uppercase mr-1">
                PICK YOUR MOOD
              </span>
              <span className="text-stone-300 hidden sm:inline">|</span>

              {moods.map((m) => {
                const isActive = selectedMood === m.label;
                return (
                  <button
                    key={m.label}
                    onClick={() => handleMoodSelect(m.label, m.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#FF4400] text-white shadow-sm'
                        : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Mini Signal & Slogan */}
            <div className="flex items-center gap-4 text-right">
              <div className="hidden sm:block">
                <p className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase">
                  DESIGNED FOR SHORT BREAKS.
                </p>
                <p className="text-[10px] font-mono font-bold tracking-wider text-stone-400 uppercase">
                  BUILT FOR A SHARPER TOMORROW.
                </p>
              </div>

              {/* Minimal Signal Indicator */}
              <div className="flex items-end gap-0.5 h-4 text-stone-900">
                <span className="w-1 bg-stone-900 h-1.5 rounded-2xs" />
                <span className="w-1 bg-stone-900 h-2.5 rounded-2xs" />
                <span className="w-1 bg-stone-900 h-3.5 rounded-2xs" />
                <span className="w-1 bg-stone-900 h-4.5 rounded-2xs" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Game Modal Window (Native top-layer dialog) */}
      <GameModal
        game={activeModalGame}
        onClose={() => setActiveModalGame(null)}
      />
    </div>
  );
};
