import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const HOME_QUOTES = [
  {
    num: '01',
    quote: 'You can sleep while you are dead.',
    author: 'Max Verstappen',
    accent: '#FF4400',
    tags: ['SPEED', 'DISCIPLINE', 'PERSPECTIVE'],
    align: 'left' as const,
  },
  {
    num: '02',
    quote: "Don't forget who you are mate.",
    author: 'Lewis Hamilton',
    accent: '#09090B',
    tags: ['IDENTITY', 'FOCUS', 'JOURNEY'],
    align: 'right' as const,
  },
];

export const QuoteSection = () => {
  return (
    <section id="quote-section" aria-labelledby="home-quotes-heading" className="py-12 md:py-20 bg-[#F9F9F8] relative z-10 overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
          {/* Header Kicker */}
          <div className="px-6 sm:px-10 py-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-stone-400">02 /</span>
              <h2 id="home-quotes-heading" className="text-xs font-mono font-bold tracking-[0.2em] text-stone-950 uppercase">
                GUIDING PHILOSOPHY
              </h2>
            </div>

            <Link
              to="/quote"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 bg-white hover:bg-black hover:text-white hover:border-black text-[11px] font-mono font-bold tracking-widest uppercase transition-colors"
            >
              <span>Full Archive (07)</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Monumental Two-Quote Ledger */}
          <div className="divide-y divide-stone-200 bg-white">
            {HOME_QUOTES.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className={`lg:col-span-2 flex items-center gap-4 lg:flex-col lg:items-start lg:justify-between h-full ${item.align === 'right' ? 'lg:order-2 lg:items-end lg:border-l border-stone-200 lg:pl-8' : 'lg:border-r border-stone-200 lg:pr-8'}`}>
                  <span className="font-editorial text-4xl sm:text-5xl text-stone-900 font-light select-none">
                    {item.num}
                  </span>
                  <div className={`flex flex-wrap lg:flex-col gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase ${item.align === 'right' ? 'lg:text-right' : ''}`}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-10 flex flex-col justify-between ${item.align === 'right' ? 'lg:order-1 lg:text-right lg:items-end lg:pr-6' : 'lg:pl-4'}`}>
                  <span
                    className="text-4xl sm:text-5xl font-serif font-black leading-none select-none mb-2"
                    style={{ color: item.accent }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  <blockquote className="quote-text text-[clamp(2rem,4.8vw,4rem)] tracking-tight leading-[1.06] mb-8 max-w-4xl">
                    {item.quote}
                  </blockquote>

                  <div className={`flex items-center gap-4 ${item.align === 'right' ? 'flex-row-reverse' : ''}`}>
                    <div
                      className="w-12 h-1 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <p className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-stone-700 uppercase">
                      {item.author}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
