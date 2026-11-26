import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Medal, Brain, Swords, Gamepad, Gamepad2, Users, CheckCircle2, Play, Pause } from 'lucide-react';
import dotaVideo from '../assets/Dota 2 Info.mp4';
import cricketImg from '../assets/cricket-image.webp';
import badmintonImg from '../assets/badminton-image.webp';
import dotaImg from '../assets/dota 2-image.webp';
import phasmophobiaImg from '../assets/Phasmophobia-image.webp';
import tanjiroImg from '../assets/tanjiro-images.webp';
import nezukoImg from '../assets/nezuko-image.webp';
import spyxfamilyImg from '../assets/spyxfamily-image.webp';

const sportsList = ['Badminton', 'Cricket', 'Basketball', 'Table Tennis', 'Volleyball', 'Swimming', 'Relay Race', '100m Sprint'];
const representations = [
  'Represented my school in Cricket tournaments.',
  'Represented my school in Volleyball competitions.',
  'Competed in official Relay Race events.',
];
const sportsLearnings = [
  'Leadership under pressure.',
  'Team coordination and communication.',
  'Strategic decision-making.',
  'Competitive mindset and consistency.',
  'Mental resilience and sportsmanship.',
];
const compGames = ['Dota 2 (Main Game)', 'Valorant', 'Counter-Strike 2', 'PUBG', 'Among Us'];
const storyGames = ['God of War', 'GTA V', 'Hitman', 'Resident Evil', 'Borderlands 2', 'It Takes Two', 'Phasmophobia'];
const genres = ['MOBA', 'FPS', 'Survival Horror', 'RPG', 'Open World', 'Co-op Adventures', 'Strategy Games', 'Indie Titles'];
const gamingLearnings = [
  'Strategic thinking and quick decision-making.',
  'Teamplay and communication.',
  'Learning complex game mechanics.',
  'Competitive mindset and adaptability.',
  'Appreciation for storytelling, design, and immersive experiences.',
];

export const Hobbies = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  return (
    <div id="hobbies" className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans pb-16 pt-1 sm:pt-2 relative">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Outer Architectural Container */}
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden">
          {/* Top Kicker Bar */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4400]" />
              <span className="font-bold text-stone-950">ARCHIVE OF INTERESTS</span>
            </div>
            <span className="font-semibold">ATHLETICS · GAMING · ANIME</span>
          </div>

          {/* Hero Banner */}
          <div className="px-6 sm:px-10 py-10 md:py-16 border-b border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-3">
                LIFE OUTSIDE THE IDE
              </p>
              <h1 className="font-editorial text-[clamp(3rem,8vw,6.25rem)] font-normal tracking-tight text-stone-950 leading-[0.88] mb-5">
                Beyond the <span className="italic font-serif font-light text-stone-400">Screen.</span>
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Competition on the field, strategic depth inside competitive lobbies, and visual storytelling that shapes how I design interfaces.
              </p>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-8 font-mono text-xs space-y-2 text-stone-500">
              <p><strong className="text-stone-950">01 /</strong> ATHLETICS &amp; FIELD SPORTS</p>
              <p><strong className="text-stone-950">02 /</strong> STRATEGIC ESPORTS &amp; CO-OP</p>
              <p><strong className="text-stone-950">03 /</strong> ANIME &amp; NARRATIVE WORLDS</p>
            </div>
          </div>

          {/* ==================== CHAPTER 01: SPORTS & ATHLETICS ==================== */}
          <section aria-labelledby="sports-heading" className="bg-white border-b border-stone-200">
            <div className="px-6 sm:px-10 py-5 border-b border-stone-200 bg-[#FAF9F7] flex items-center justify-between">
              <h2 id="sports-heading" className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950">
                01 / SPORTS &amp; ATHLETICS
              </h2>
              <span className="text-[11px] font-mono font-bold text-[#FF4400]">DISCIPLINE</span>
            </div>

            {/* Cricket Row */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-stone-200">
              <div className="lg:col-span-6">
                <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={cricketImg}
                    alt="Cricket pitch match"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <p className="text-xs font-mono font-bold tracking-widest text-[#FF4400] uppercase">01.1 / PATIENCE &amp; STRATEGY</p>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950">Cricket</h3>
                <div className="text-stone-600 text-base leading-relaxed space-y-3">
                  <p>Cricket is more than just a game to me; it&apos;s a test of patience, strategy, and explosive skill. Standing at the crease, every delivery is a mind game against the bowler requiring complete focus.</p>
                  <p>Hitting a timed cover drive or coordinating eleven players on the field in absolute synchrony built my competitive drive and mental resilience from a young age.</p>
                </div>
              </div>
            </div>

            {/* Badminton Row */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-stone-200">
              <div className="lg:col-span-6 lg:order-2">
                <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={badmintonImg}
                    alt="Badminton racket and shuttlecock"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 lg:order-1 space-y-4">
                <p className="text-xs font-mono font-bold tracking-widest text-[#FF4400] uppercase">01.2 / SPEED &amp; AGILITY</p>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950">Badminton</h3>
                <div className="text-stone-600 text-base leading-relaxed space-y-3">
                  <p>Badminton requires lightning-fast reflexes, intense court agility, and split-second decision making where momentum shifts in the blink of an eye.</p>
                  <p>The sheer speed of a jump smash demands physical precision and keeps both my reaction speed and endurance sharp.</p>
                </div>
              </div>
            </div>

            {/* Sports Summary Ledger */}
            <div className="p-6 sm:p-10 bg-[#FAF9F7]">
              <p className="font-serif italic text-xl sm:text-2xl text-stone-900 leading-relaxed max-w-4xl mb-10">
                &ldquo;I thrive in competitive environments — whether on the court, on the field, or at the starting line.&rdquo;
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-stone-200">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Target size={16} className="text-[#FF4400]" />
                    All Disciplines
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sportsList.map((sport) => (
                      <span key={sport} className="px-3 py-1 bg-white text-stone-700 rounded-full text-xs font-mono font-semibold border border-stone-200">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Medal size={16} className="text-[#FF4400]" />
                    Representation
                  </h4>
                  <ul className="space-y-2.5 text-sm text-stone-600">
                    {representations.map((rep, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Brain size={16} className="text-[#FF4400]" />
                    Core Takeaways
                  </h4>
                  <ul className="space-y-2.5 text-sm text-stone-600">
                    {sportsLearnings.map((learning, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400] shrink-0" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== CHAPTER 02: GAMING ==================== */}
          <section aria-labelledby="gaming-heading" className="bg-white border-b border-stone-200">
            <div className="px-6 sm:px-10 py-5 border-b border-stone-200 bg-[#09090B] text-white flex items-center justify-between">
              <h2 id="gaming-heading" className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
                02 / COMPETITIVE &amp; STORY GAMING
              </h2>
              <span className="text-[11px] font-mono font-bold text-[#FF4400]">SYSTEMS PLAY</span>
            </div>

            {/* Dota 2 Theater Block */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-stone-200">
              <div className="lg:col-span-6">
                <div className="relative rounded-[1.75rem] overflow-hidden border border-stone-300 bg-[#09090B] group">
                  <video
                    ref={videoRef}
                    src={dotaVideo}
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    loop
                    playsInline
                    onTimeUpdate={() => {
                      if (videoRef.current) {
                        setProgress((videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100);
                      }
                    }}
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    src={dotaImg}
                    alt="Dota 2 gameplay showcase"
                    className={`relative w-full aspect-[4/3] object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} group-hover:scale-[1.03] z-0`}
                  />

                  <div className={`absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-300 z-20 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'}`}>
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause Dota 2 highlight' : 'Play Dota 2 highlight'}
                      className="w-16 h-16 bg-white/95 hover:bg-[#FF4400] text-stone-950 hover:text-white rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer"
                    >
                      {isPlaying ? <Pause size={26} /> : <Play size={26} className="ml-0.5" />}
                    </button>
                  </div>

                  {isPlaying && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-8 cursor-pointer z-30 flex flex-col justify-end"
                      onClick={(e) => {
                        if (!videoRef.current || !videoRef.current.duration) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        videoRef.current.currentTime = (clickX / rect.width) * videoRef.current.duration;
                      }}
                    >
                      <div className="w-full h-1.5 bg-white/20">
                        <div className="h-full bg-[#FF4400]" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <p className="text-xs font-mono font-bold tracking-widest text-[#FF4400] uppercase">02.1 / MAIN COMPETITIVE ARENA</p>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950">Dota 2</h3>
                <div className="text-stone-600 text-base leading-relaxed space-y-3">
                  <p>Dota 2 is the ultimate test of strategic depth, five-player teamwork, and demanding mechanical execution. Every match is a dynamic systems puzzle with infinite drafting variables.</p>
                  <p>Executing synchronized team fights under high pressure deeply sharpened my analytical clarity and real-time decision speed.</p>
                </div>
              </div>
            </div>

            {/* Phasmophobia Row */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-stone-200">
              <div className="lg:col-span-6 lg:order-2">
                <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={phasmophobiaImg}
                    alt="Phasmophobia atmospheric investigation"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 lg:order-1 space-y-4">
                <p className="text-xs font-mono font-bold tracking-widest text-[#FF4400] uppercase">02.2 / CO-OP INVESTIGATION</p>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950">Phasmophobia</h3>
                <div className="text-stone-600 text-base leading-relaxed space-y-3">
                  <p>Phasmophobia delivers atmospheric suspense balanced with methodical evidence gathering — walking haunted corridors reliant on team communication.</p>
                  <p>It remains my go-to title for thrilling, investigative co-op sessions with friends.</p>
                </div>
              </div>
            </div>

            {/* Gaming 4-Column Catalog */}
            <div className="p-6 sm:p-10 bg-[#FAF9F7]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Swords size={15} className="text-[#FF4400]" />
                    Competitive
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-600">
                    {compGames.map((g) => (
                      <li key={g}>• {g}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Gamepad size={15} className="text-[#FF4400]" />
                    Story &amp; Co-op
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-600">
                    {storyGames.map((g) => (
                      <li key={g}>• {g}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Gamepad2 size={15} className="text-[#FF4400]" />
                    Genres
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {genres.map((genre) => (
                      <span key={genre} className="px-2.5 py-1 bg-white text-stone-700 rounded-full text-xs font-mono font-semibold border border-stone-200">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-950 mb-4 font-sans">
                    <Users size={15} className="text-[#FF4400]" />
                    Why Play
                  </h4>
                  <ul className="space-y-2.5 text-sm text-stone-600">
                    {gamingLearnings.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400] shrink-0 mt-2" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== CHAPTER 03: ANIME & NARRATIVE WORLDS ==================== */}
          <section aria-labelledby="anime-heading" className="bg-white">
            <div className="px-6 sm:px-10 py-5 border-b border-stone-200 bg-[#FAF9F7] flex items-center justify-between">
              <h2 id="anime-heading" className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950">
                03 / VISUAL WORLDS &amp; ANIME
              </h2>
              <span className="text-[11px] font-mono font-bold text-[#FF4400]">STORYTELLING</span>
            </div>

            <div className="p-6 sm:p-10 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={tanjiroImg}
                      alt="Tanjiro Kamado"
                      className="w-full aspect-square object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={nezukoImg}
                      alt="Nezuko Kamado"
                      className="w-full aspect-square object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <p className="text-xs font-mono font-bold tracking-widest text-[#FF4400] uppercase">03.1 / RESOLVE &amp; CRAFT</p>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950">Demon Slayer</h3>
                  <div className="text-stone-600 text-base leading-relaxed space-y-3">
                    <p>I draw endless inspiration from the pacing, visual artistry, and emotional depth of anime storytelling.</p>
                    <p>Tanjiro Kamado stands out for his unwavering determination, discipline, and kindness under impossible odds.</p>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 lg:order-2">
                  <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={spyxfamilyImg}
                      alt="Spy x Family"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 lg:order-1 space-y-4">
                  <p className="text-xs font-mono font-bold tracking-widest text-[#FF4400] uppercase">03.2 / CURATED WATCHLIST</p>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950">Favorite Series</h3>
                  <div className="text-stone-600 text-base leading-relaxed space-y-3">
                    <p>From the razor-sharp psychological battles of <strong className="text-stone-900">Death Note</strong> to the kinetic intensity of <strong className="text-stone-900">Jujutsu Kaisen</strong> and <strong className="text-stone-900">Chainsaw Man</strong>, alongside the warmth of <strong className="text-stone-900">Spy × Family</strong> and comedy of <strong className="text-stone-900">One Punch Man</strong>.</p>
                    <p>Each series sharpens my eye for framing, rhythm, and creative atmosphere.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Bar */}
          <div className="border-t border-stone-200 px-6 sm:px-10 py-4 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-widest text-stone-500 uppercase">
            <span>ATHLETICS · STRATEGY · DESIGN INSPIRATION</span>
            <Link to="/fun-games" className="text-stone-950 font-bold hover:text-[#FF4400] transition-colors">
              TRY FUN GAMES PLAYGROUND —→
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
