import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuoteItem {
  id: string;
  num: string;
  quote: string;
  author: string;
  accentColor: string;
  tags: string[];
}

export const QUOTES_DATA: QuoteItem[] = [
  {
    id: 'max',
    num: '01',
    quote: 'You can sleep while you are dead.',
    author: 'MAX VERSTAPPEN',
    accentColor: '#FF4400',
    tags: ['SPEED', 'DISCIPLINE', 'PERSPECTIVE', 'EVERYDAY'],
  },
  {
    id: 'lewis',
    num: '02',
    quote: "Don't forget who you are mate.",
    author: 'LEWIS HAMILTON',
    accentColor: '#2563EB',
    tags: ['IDENTITY', 'FOCUS', 'JOURNEY', 'SELF'],
  },
  {
    id: 'einstein',
    num: '03',
    quote: 'I have no special talent. I am only passionately curious.',
    author: 'ALBERT EINSTEIN',
    accentColor: '#9333EA',
    tags: ['CURIOSITY', 'LEARNING', 'GROWTH', 'LIFE'],
  },
  {
    id: 'bagehot',
    num: '04',
    quote: "The greatest pleasure I've had is trying to do something that everybody says could not be done.",
    author: 'WALTER BAGEHOT',
    accentColor: '#16A34A',
    tags: ['COURAGE', 'PERSISTENCE', 'POSSIBILITIES', 'HISTORY'],
  },
  {
    id: 'kolte',
    num: '05',
    quote: "nothing is free. Even the gifts, got in birthday's aren't free",
    author: 'BHUSHAN KOLTE',
    accentColor: '#EA580C',
    tags: ['EFFORT', 'REALITY', 'PERSPECTIVE', 'LIFE'],
  },
  {
    id: 'parrish',
    num: '06',
    quote: 'The curse of discipline is that every day looks the same and the curse of indiscipline is that every year looks the same.',
    author: 'SHANE PARRISH',
    accentColor: '#D97706',
    tags: ['DISCIPLINE', 'CHOICES', 'LONG TERM', 'FREEDOM'],
  },
  {
    id: 'rajput',
    num: '07',
    quote: "Till the time you know the why of doing what you do you don't need Inspiration",
    author: 'SUSHANT SINGH RAJPUT',
    accentColor: '#0284C7',
    tags: ['PURPOSE', 'CLARITY', 'ACTION', 'INSPIRATION'],
  },
];

export const Quote: React.FC = () => {
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const featured = QUOTES_DATA[featuredIndex];

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev === 0 ? QUOTES_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev === QUOTES_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans selection:bg-stone-900 selection:text-white pb-16 pt-0 relative overflow-hidden">
      
      {/* Background Subtle Blueprint Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="720" cy="450" r="420" stroke="#E5E5DE" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="720" cy="450" r="620" stroke="#E5E5DE" strokeWidth="0.8" />
          <path d="M0 450H1440" stroke="#E5E5DE" strokeWidth="0.8" strokeDasharray="6 6" />
          <path d="M720 0V900" stroke="#E5E5DE" strokeWidth="0.8" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Main Architectural Bordered Card */}
        <div className="border border-stone-300/80 bg-[#FAF9F7]/90 backdrop-blur-xs rounded-[2rem] shadow-sm overflow-hidden">
          
          {/* Top Header Section */}
          <div className="px-6 sm:px-10 py-10 md:py-14 border-b border-stone-200 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
              
              {/* Left Side: Vertical Year + Huge Didone "QUOTES" */}
              <div className="flex items-start gap-6 sm:gap-10">
                <div className="flex flex-col font-mono text-xs font-semibold text-stone-400 leading-tight select-none pt-2">
                  <span>2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>6</span>
                </div>

                <div>
                  <h1 className="font-editorial text-[clamp(3.5rem,9vw,7.5rem)] font-normal tracking-tight text-stone-950 leading-[0.88] select-none">
                    QUOTES
                  </h1>
                  <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-stone-500 uppercase mt-4">
                    IDEAS / DISCIPLINE / CURIOSITY / LIFE / PERSPECTIVE
                  </p>
                </div>
              </div>

              {/* Right Side: Counter & Slogan */}
              <div className="text-left lg:text-right font-mono">
                <p className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-1">
                  001 — 007
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                  DIFFERENT MINDS
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                  SAME DIRECTION.
                </p>
              </div>

            </div>
          </div>

          {/* Hero Featured Quote Showcase (Card 01 / Selected) */}
          <div className="p-6 sm:p-10 md:p-12 border-b border-stone-200 bg-white relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Area: Big Number, Quote Marks, Main Statement, Author */}
                <div className="lg:col-span-8 flex gap-6 sm:gap-8 items-start">
                  <span className="font-editorial text-4xl sm:text-6xl text-stone-900 shrink-0 font-light select-none">
                    {featured.num}
                  </span>

                  <div className="flex flex-col justify-between h-full pt-1">
                    <div className="flex items-center gap-1 mb-2">
                      <span
                        className="text-3xl sm:text-4xl font-serif font-black leading-none select-none"
                        style={{ color: featured.accentColor }}
                      >
                        “
                      </span>
                    </div>

                    <blockquote className="font-serif italic font-bold text-[clamp(2rem,4.5vw,3.5rem)] tracking-tight leading-[1.08] text-stone-950 mb-8 max-w-2xl">
                      {featured.quote}
                    </blockquote>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-1 rounded-full"
                        style={{ backgroundColor: featured.accentColor }}
                      />
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-stone-900 uppercase">
                        {featured.author}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Area: Metadata column & Stepper Controls */}
                <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-between">
                  <div className="flex flex-col gap-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-stone-400 uppercase leading-relaxed">
                    {featured.tags.map((tag, idx) => (
                      <span key={idx} className="hover:text-stone-900 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-8">
                    <span className="font-mono text-sm font-bold text-stone-800">
                      {featured.num} / {String(QUOTES_DATA.length).padStart(2, '0')}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-11 h-11 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-2xs"
                        aria-label="Previous quote"
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-11 h-11 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-2xs"
                        aria-label="Next quote"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2-Column Grid of All Quotes (02 to 07) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 bg-[#FAF9F7]">
            
            {/* Column 1: Quotes 02, 04, 06 */}
            <div className="divide-y divide-stone-200">
              {[QUOTES_DATA[1], QUOTES_DATA[3], QUOTES_DATA[5]].map((q) => {
                const isCurrent = featured.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setFeaturedIndex(QUOTES_DATA.findIndex((item) => item.id === q.id))}
                    className={`p-6 sm:p-8 hover:bg-white transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                      isCurrent ? 'bg-white/80 ring-1 ring-stone-950/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div className="flex items-start gap-4">
                        <span className="font-editorial text-2xl sm:text-3xl text-stone-900 shrink-0 font-light select-none">
                          {q.num}
                        </span>

                        <div>
                          <span
                            className="text-2xl font-serif font-black leading-none inline-block mb-1 select-none"
                            style={{ color: q.accentColor }}
                          >
                            “
                          </span>
                          <blockquote className="font-serif italic font-semibold text-lg sm:text-xl text-stone-900 leading-snug group-hover:text-black transition-colors">
                            {q.quote}
                          </blockquote>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col text-right font-mono text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase shrink-0 pt-1">
                        {q.tags.slice(0, 4).map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-9">
                      <div
                        className="w-6 h-0.5 rounded-full"
                        style={{ backgroundColor: q.accentColor }}
                      />
                      <span className="font-mono text-[11px] font-bold tracking-widest text-stone-700 uppercase">
                        {q.author}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 2: Quotes 03, 05, 07 */}
            <div className="divide-y divide-stone-200">
              {[QUOTES_DATA[2], QUOTES_DATA[4], QUOTES_DATA[6]].map((q) => {
                const isCurrent = featured.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setFeaturedIndex(QUOTES_DATA.findIndex((item) => item.id === q.id))}
                    className={`p-6 sm:p-8 hover:bg-white transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                      isCurrent ? 'bg-white/80 ring-1 ring-stone-950/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div className="flex items-start gap-4">
                        <span className="font-editorial text-2xl sm:text-3xl text-stone-900 shrink-0 font-light select-none">
                          {q.num}
                        </span>

                        <div>
                          <span
                            className="text-2xl font-serif font-black leading-none inline-block mb-1 select-none"
                            style={{ color: q.accentColor }}
                          >
                            “
                          </span>
                          <blockquote className="font-serif italic font-semibold text-lg sm:text-xl text-stone-900 leading-snug group-hover:text-black transition-colors">
                            {q.quote}
                          </blockquote>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col text-right font-mono text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase shrink-0 pt-1">
                        {q.tags.slice(0, 4).map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-9">
                      <div
                        className="w-6 h-0.5 rounded-full"
                        style={{ backgroundColor: q.accentColor }}
                      />
                      <span className="font-mono text-[11px] font-bold tracking-widest text-stone-700 uppercase">
                        {q.author}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Footer Bar */}
          <div className="border-t border-stone-200 px-6 sm:px-10 py-5 bg-[#FAF9F7] flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 uppercase">
            <div className="flex items-center gap-3">
              <span className="w-4 h-0.5 bg-stone-400 inline-block" />
              <span>MORE QUOTES TO COME.</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700 font-bold">
              <span>001 — 007</span>
              <span>—→</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
