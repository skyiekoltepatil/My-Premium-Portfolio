import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

const AIAssistant = lazy(() => import('../assistant/AIAssistant').then(m => ({ default: m.AIAssistant })));

const PAGE_TITLES: Record<string, string> = {
  '/': 'Bhushan Kolte — Portfolio',
  '/about': 'About & GitHub Dossier | Bhushan Kolte',
  '/experience': 'Experience & Credentials | Bhushan Kolte',
  '/hobbies': 'Hobbies & Athletics | Bhushan Kolte',
  '/fun-games': 'Fun Games Playground | Bhushan Kolte',
  '/quote': 'Quotes Archive | Bhushan Kolte',
  '/project': 'Selected Works (2025–2027) | Bhushan Kolte',
  '/contact': 'Contact Studio | Bhushan Kolte',
  '/admin': 'Messages Vault | Bhushan Kolte',
};

const AppleLogo = () => (
  <svg viewBox="0 0 384 512" className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:scale-110 transition-transform" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState<'about' | 'more' | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const hoverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenMenu(null);
    setIsHovered(false);
  }, [location.pathname, location.key]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setWindowWidth(window.innerWidth), 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
      setOpenMenu(null);
      hoverTimeoutRef.current = null;
    }, 120);
  };

  const isAboutActive = ['/about', '/experience', '/hobbies'].includes(location.pathname);
  const isMoreActive = ['/quote', '/fun-games'].includes(location.pathname);

  return (
    <header>
      {/* Full width black bezel to mimic the MacBook screen edge */}
      <div className="fixed -top-1 left-0 w-full h-[13px] sm:h-[17px] bg-black z-40 pointer-events-none" />

      <div className="fixed top-2 sm:top-3 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          aria-label="Primary"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={false}
          animate={{
            width: isHovered ? (windowWidth < 640 ? Math.min(380, windowWidth - 16) : 440) : 130,
            height: isHovered ? 48 : 32
          }}
          transition={{ type: 'tween', duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black rounded-b-[1.25rem] flex items-center justify-between px-6 sm:px-8 pointer-events-auto relative shadow-[0_4px_14px_rgba(0,0,0,0.18)] will-change-[width,height]"
        >
          {(['left', 'right'] as const).map((side) => (
            <svg
              key={side}
              width="16"
              height="16"
              aria-hidden="true"
              className={`absolute top-0 ${side === 'left' ? '-left-[15px]' : '-right-[15px]'} pointer-events-none fill-black text-black`}
              viewBox="0 0 20 20"
            >
              <path d={side === 'left' ? 'M0,0 L20,0 L20,20 A20,20 0 0,0 0,0 Z' : 'M0,0 L20,0 A20,20 0 0,0 0,20 L0,0 Z'} />
            </svg>
          ))}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.1 } }}
                transition={{ duration: 0.25, delay: 0.08 }}
                className="flex items-center justify-end gap-2 sm:gap-4 absolute right-1/2 mr-4 sm:mr-8"
              >
                <div className="relative group" onMouseEnter={() => setOpenMenu('about')} onMouseLeave={() => setOpenMenu(null)}>
                  <button
                    type="button"
                    aria-expanded={openMenu === 'about'}
                    onClick={() => setOpenMenu(openMenu === 'about' ? null : 'about')}
                    className={`transition-colors text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-1.5 py-2 ${isAboutActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {isAboutActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400]" />}
                    About Me
                    <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`absolute top-full left-0 pt-3 -mt-1 transition-all duration-200 z-50 ${openMenu === 'about' ? 'opacity-100 visible pointer-events-auto translate-y-0' : 'opacity-0 invisible pointer-events-none translate-y-2'}`}>
                    <div className="bg-[#09090B]/95 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)] rounded-2xl p-1.5 min-w-[175px] flex flex-col">
                      {[
                        ['/about', '01 / About Me'],
                        ['/experience', '02 / Experience'],
                        ['/hobbies', '03 / Hobbies'],
                      ].map(([to, label]) => (
                        <Link
                          key={to}
                          to={to}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-mono tracking-wider uppercase rounded-xl transition-colors ${location.pathname === to ? 'text-white bg-white/10 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
                        >
                          <span>{label}</span>
                          {location.pathname === to && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400]" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  to="/project"
                  className={`transition-colors text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-1.5 py-2 ${location.pathname === '/project' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  {location.pathname === '/project' && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400]" />}
                  Projects
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <Link to="/" aria-label="Home" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            <div>
              <AppleLogo />
            </div>
          </Link>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.1 } }}
                transition={{ duration: 0.25, delay: 0.08 }}
                className="flex items-center justify-start gap-2 sm:gap-4 absolute left-1/2 ml-4 sm:ml-8"
              >
                <div className="relative group" onMouseEnter={() => setOpenMenu('more')} onMouseLeave={() => setOpenMenu(null)}>
                  <button
                    type="button"
                    aria-expanded={openMenu === 'more'}
                    onClick={() => setOpenMenu(openMenu === 'more' ? null : 'more')}
                    className={`transition-colors text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-1.5 py-2 ${isMoreActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {isMoreActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400]" />}
                    More
                    <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`absolute top-full right-0 pt-3 -mt-1 transition-all duration-200 z-50 ${openMenu === 'more' ? 'opacity-100 visible pointer-events-auto translate-y-0' : 'opacity-0 invisible pointer-events-none translate-y-2'}`}>
                    <div className="bg-[#09090B]/95 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)] rounded-2xl p-1.5 min-w-[175px] flex flex-col">
                      {[
                        ['/quote', '01 / Quotes'],
                        ['/fun-games', '02 / Fun Games'],
                      ].map(([to, label]) => (
                        <Link
                          key={to}
                          to={to}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-mono tracking-wider uppercase rounded-xl transition-colors ${location.pathname === to ? 'text-white bg-white/10 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
                        >
                          <span>{label}</span>
                          {location.pathname === to && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400]" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={`transition-colors text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-1.5 py-2 ${location.pathname === '/contact' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  {location.pathname === '/contact' && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400]" />}
                  Contact
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
};

const Footer = () => {
  const [puneTime, setPuneTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      try {
        setPuneTime(
          new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(new Date())
        );
      } catch {
        setPuneTime('');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('bhushankolte20@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="relative z-10 mt-auto bg-[#F9F9F8] px-3 sm:px-6 md:px-10 pt-8 pb-6">
      <div className="max-w-[1340px] mx-auto bg-[#09090B] text-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] border border-stone-800 overflow-hidden shadow-xl">
        {/* Top Ledger Strip */}
        <div className="px-6 sm:px-10 py-4 border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-400">
          <div className="flex items-center gap-2.5">
            <span className="text-stone-200 font-bold">OPEN FOR COLLABORATION</span>
          </div>
          <div className="flex items-center gap-4">
            <span>PUNE, INDIA</span>
            {puneTime && (
              <>
                <span className="text-stone-600">/</span>
                <span className="text-stone-200 font-semibold tabular-nums">{puneTime} IST</span>
              </>
            )}
          </div>
        </div>

        {/* Main Closing Chamber */}
        <div className="px-6 sm:px-10 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-stone-800/80">
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4400] uppercase mb-3">
                // START A CONVERSATION
              </p>
              <h2 className="font-editorial text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[0.95] text-white tracking-tight">
                Let&apos;s craft something{' '}
                <span className="italic font-serif font-light text-stone-400">remarkable.</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF4400] hover:bg-white text-white hover:text-[#09090B] text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 group min-h-[44px]"
              >
                <span>Open Contact Studio</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-stone-700 hover:border-stone-400 text-stone-200 text-xs font-mono tracking-wider transition-colors min-h-[44px]"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Email Copied' : 'bhushankolte20@gmail.com'}</span>
              </button>
            </div>
          </div>

          {/* 3-Column Navigation Directory */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-stone-800/80 lg:pl-10">
            <div>
              <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-4">INDEX</p>
              <ul className="space-y-2.5 text-sm font-medium text-stone-300">
                {[
                  ['/', 'Home'],
                  ['/about', 'About Me'],
                  ['/experience', 'Experience'],
                  ['/project', 'Projects'],
                ].map(([to, label]) => (
                  <li key={to}><Link to={to} className="hover:text-[#FF4400] transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-4">PLAYGROUND</p>
              <ul className="space-y-2.5 text-sm font-medium text-stone-300">
                {[
                  ['/hobbies', 'Hobbies'],
                  ['/quote', 'Quotes (07)'],
                  ['/fun-games', 'Fun Games'],
                ].map(([to, label]) => (
                  <li key={to}><Link to={to} className="hover:text-[#FF4400] transition-colors">{label}</Link></li>
                ))}
                <li>
                  <button type="button" onClick={() => window.dispatchEvent(new Event('openAria'))} className="hover:text-[#FF4400] transition-colors text-left">
                    Ask Aria AI
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-4">NETWORK</p>
              <ul className="space-y-2.5 text-sm font-medium text-stone-300">
                {[
                  ['https://github.com/skyiekoltepatil', 'GitHub'],
                  ['https://www.linkedin.com/in/bhushan-kolte-458561380/', 'LinkedIn'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#FF4400] transition-colors">
                      <span>{label}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
                <li><a href="tel:+918421361302" className="hover:text-[#FF4400] transition-colors tabular-nums">+91 8421361302</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized Editorial Signature Wordmark */}
        <div className="px-6 sm:px-10 pt-8 pb-6 flex flex-col gap-6">
          <div className="w-full overflow-hidden">
            <p className="font-editorial text-[clamp(2.4rem,9.2vw,7.5rem)] leading-[0.86] tracking-tight text-stone-100 select-none text-center sm:text-left uppercase">
              BHUSHAN <span className="italic font-serif font-light text-stone-500">KOLTE</span>
            </p>
          </div>

          <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-widest text-stone-500 uppercase">
            <span>© {new Date().getFullYear()} BHUSHAN KOLTE. ALL RIGHTS RESERVED.</span>
            <span>DESIGNED WITH PRECISION IN PUNE, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || 'Bhushan Kolte | Portfolio';
    document.title = title;
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = prevBehavior;
  }, [location.pathname, location.key, location.hash]);

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans selection:bg-[#FF4400] selection:text-white flex flex-col overflow-x-clip w-full relative">
      <a
        href="#main-content"
        className="visually-hidden fixed top-4 left-4 z-[200] px-4 py-2.5 bg-[#09090B] text-white text-xs font-mono font-bold tracking-widest uppercase rounded-full shadow-xl"
      >
        Skip to content
      </a>

      <Navbar />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>

      <main id="main-content" tabIndex={-1} className="flex-grow pt-10 sm:pt-12 outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
