import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import profileImage from '../assets/image1.webp';
import LogoLoop from '../components/effects/LogoLoop';
import { GitHubCalendar } from 'react-github-calendar';
import { Users, BookOpen, Star, GitFork, MapPin, Mail, Building2, ArrowUpRight, Pause, Play } from 'lucide-react';
import { getTodayCommits } from '../utils/github';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiVite, SiNodedotjs, SiPython, SiPostgresql,
  SiFirebase, SiFigma,
  SiGooglegemini, SiOllama, SiAnthropic, SiVercel, SiGithub,
  SiKaggle,
} from 'react-icons/si';
import { FaLinkedin, FaFileExcel, FaChartBar } from 'react-icons/fa';

const allLogos = [
  { node: <SiReact style={{ color: '#61DAFB' }} />, title: 'React', href: 'https://react.dev/' },
  { node: <SiNextdotjs style={{ color: '#111827' }} />, title: 'Next.js', href: 'https://nextjs.org/' },
  { node: <SiTypescript style={{ color: '#3178C6' }} />, title: 'TypeScript', href: 'https://www.typescriptlang.org/' },
  { node: <SiTailwindcss style={{ color: '#06B6D4' }} />, title: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { node: <SiVite style={{ color: '#646CFF' }} />, title: 'Vite', href: 'https://vitejs.dev/' },
  { node: <SiNodedotjs style={{ color: '#339933' }} />, title: 'Node.js', href: 'https://nodejs.org/' },
  { node: <SiFirebase style={{ color: '#F5A623' }} />, title: 'Firebase', href: 'https://firebase.google.com/' },
  { node: <SiFigma style={{ color: '#F24E1E' }} />, title: 'Figma', href: 'https://www.figma.com/' },
  { node: <SiVercel style={{ color: '#111827' }} />, title: 'Vercel', href: 'https://vercel.com/' },
  { node: <SiGithub style={{ color: '#181717' }} />, title: 'GitHub', href: 'https://github.com/' },
  { node: <FaLinkedin style={{ color: '#0A66C2' }} />, title: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { node: <SiGooglegemini style={{ color: '#886FBF' }} />, title: 'Gemini', href: 'https://gemini.google.com/' },
  { node: <SiAnthropic style={{ color: '#D4A27F' }} />, title: 'Claude', href: 'https://claude.ai/' },
  { node: <SiOllama style={{ color: '#111827' }} />, title: 'Ollama', href: 'https://ollama.com/' },
  { node: <SiPython style={{ color: '#3776AB' }} />, title: 'Python', href: 'https://www.python.org/' },
  { node: <SiKaggle style={{ color: '#20BEFF' }} />, title: 'Kaggle', href: 'https://www.kaggle.com/' },
  { node: <SiPostgresql style={{ color: '#4169E1' }} />, title: 'PostgreSQL', href: 'https://www.postgresql.org/' },
  { node: <FaFileExcel style={{ color: '#217346' }} />, title: 'Excel', href: 'https://www.microsoft.com/en-us/microsoft-365/excel' },
  { node: <FaChartBar style={{ color: '#F2C811' }} />, title: 'Power BI', href: 'https://powerbi.microsoft.com/' },
];

export const About = () => {
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [realtimeCommits, setRealtimeCommits] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const username = 'skyiekoltepatil';

  useEffect(() => {
    const CACHE_KEY = `gh_cache_${username}`;
    const CACHE_TTL = 10 * 60 * 1000;

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          if (data.profile) setProfile(data.profile);
          if (data.repos) setRepos(data.repos);
          if (data.commits !== undefined) setRealtimeCommits(data.commits);
          return;
        }
      }
    } catch {
      // sessionStorage unavailable
    }

    const fetchedData: { profile?: any; repos?: any[]; commits?: number } = {};

    const updateCache = () => {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: fetchedData, timestamp: Date.now() }));
      } catch {
        // Ignore cache write errors
      }
    };

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        fetchedData.profile = data;
        updateCache();
      })
      .catch((err) => console.error(err));

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const excludedRepos = [
            'Login-Interface',
            'learningJs-2025',
            'learning-react-JS-2025',
            'Data-Structures-Algorithmns-main',
          ];
          const filteredRepos = data.filter((repo) => !excludedRepos.includes(repo.name));
          const slice = filteredRepos.slice(0, 6);
          setRepos(slice);
          fetchedData.repos = slice;
          updateCache();
        }
      })
      .catch((err) => console.error(err));

    getTodayCommits(username).then((commits: number) => {
      setRealtimeCommits(commits);
      fetchedData.commits = commits;
      updateCache();
    });
  }, [username]);

  const transformCalendarData = (data: Array<any>) => {
    if (realtimeCommits === 0) return data;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayIndex = data.findIndex((d) => d.date === todayStr);

    if (todayIndex !== -1) {
      if (data[todayIndex].count < realtimeCommits) {
        data[todayIndex].count = realtimeCommits;
        data[todayIndex].level =
          realtimeCommits >= 10 ? 4 : realtimeCommits >= 5 ? 3 : realtimeCommits >= 2 ? 2 : 1;
      }
    }
    return data;
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans pb-16 pt-1 sm:pt-2 relative">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Outer Architectural Container */}
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden">
          {/* Top Kicker Bar */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4400]" />
              <span className="font-bold text-stone-950">DEVELOPER DOSSIER</span>
              <span className="text-stone-300">/</span>
              <span className="font-semibold text-stone-500">@{username}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">PUNE, INDIA</span>
              <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-800 font-bold">
                LIVE GITHUB SYNC
              </span>
            </div>
          </div>

          {/* Main Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {/* Left Identity Sidebar */}
            <aside className="lg:col-span-4 p-6 sm:p-10 bg-white flex flex-col gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 mb-6 group"
                >
                  <img
                    src={profileImage}
                    alt="Bhushan Kolte portrait"
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>

                <div className="mb-5">
                  <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight leading-tight">
                    Bhushan Kolte
                  </h1>
                  <p className="font-mono text-xs font-bold tracking-widest text-stone-400 uppercase mt-1">
                    @{username}
                  </p>
                </div>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {profile?.bio || 'Artificial Intelligence & Data Science Student at Alard University | Creative Developer'}
                </p>

                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-black hover:bg-[#FF4400] text-white text-xs font-mono font-bold tracking-widest uppercase transition-colors min-h-[44px]"
                >
                  <span>Follow on GitHub</span>
                  <ArrowUpRight size={15} />
                </a>

                {/* Telemetry Row */}
                <div className="grid grid-cols-3 border-y border-stone-200 py-4 my-6 text-center font-mono">
                  <div>
                    <p className="text-lg font-extrabold text-stone-950">{profile?.followers ?? 0}</p>
                    <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">FOLLOWERS</p>
                  </div>
                  <div className="border-x border-stone-200">
                    <p className="text-lg font-extrabold text-stone-950">{profile?.following ?? 0}</p>
                    <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">FOLLOWING</p>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-stone-950">{profile?.public_repos ?? 0}</p>
                    <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">REPOS</p>
                  </div>
                </div>

                {/* Fact Sheet */}
                <div className="space-y-3 text-sm text-stone-700">
                  <div className="flex items-center gap-3">
                    <Building2 size={16} className="text-stone-400 shrink-0" />
                    <span className="font-medium">Alard University</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-stone-400 shrink-0" />
                    <span>Pune, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-stone-400 shrink-0" />
                    <a href="mailto:bhushankolte20@gmail.com" className="hover:text-[#FF4400] transition-colors truncate">
                      bhushankolte20@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-stone-400 shrink-0" />
                    <span>Available for Freelance</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest">
                <Link to="/experience" className="text-stone-600 hover:text-[#FF4400] transition-colors">
                  Experience →
                </Link>
                <Link to="/contact" className="text-stone-950 hover:text-[#FF4400] transition-colors">
                  Contact ↗
                </Link>
              </div>
            </aside>

            {/* Right Main Dossier Columns */}
            <div className="lg:col-span-8 divide-y divide-stone-200 bg-[#FAF9F7]">
              {/* Monograph Chamber (README) */}
              <div className="p-6 sm:p-10 bg-white">
                <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200 text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-500">
                  <span>01 / {username.toUpperCase()} — README.MD</span>
                  <span className="text-[#FF4400]">MONOGRAPH</span>
                </div>

                <div className="font-serif text-stone-900 text-lg sm:text-xl leading-relaxed space-y-5">
                  <p>
                    Hi, I&apos;m <strong className="font-bold">Bhushan Kolte</strong>, an AI &amp; Data Science student and creative front-end developer based in India.
                  </p>
                  <p className="text-stone-700">
                    I&apos;m passionate about web architecture, artificial intelligence, and crafting interactive digital experiences. I enjoy building fast, typographically sharp, performance-driven projects using modern standards and purposeful animation.
                  </p>
                  <p className="text-stone-700">
                    Beyond code, I explore UI/UX systems, competitive gaming, and athletics. My focus is combining engineering rigor with expressive visual design to ship meaningful products every single day.
                  </p>
                </div>

                {/* Stack Marquee with Pause Button */}
                <div className="mt-10 pt-8 border-t border-stone-200">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-[0.2em]">
                      TECHNOLOGIES I WORK WITH
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsPaused((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-[#FAF9F7] hover:border-black text-[11px] font-mono font-bold uppercase tracking-wider text-stone-700 hover:text-black transition-colors min-h-[34px]"
                    >
                      {isPaused ? <Play size={12} /> : <Pause size={12} />}
                      <span>{isPaused ? 'Play' : 'Pause'}</span>
                    </button>
                  </div>
                  <div style={{ height: '60px', position: 'relative' }} className="w-full overflow-hidden">
                    <LogoLoop
                      logos={allLogos}
                      speed={80}
                      direction="left"
                      logoHeight={34}
                      gap={40}
                      scaleOnHover
                      fadeOut
                      fadeOutColor="#FFFFFF"
                      paused={isPaused}
                      ariaLabel="Technology stack"
                    />
                  </div>
                </div>
              </div>

              {/* Pinned Repositories Ledger */}
              <div className="p-6 sm:p-10 bg-[#FAF9F7]">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950">
                    02 / PINNED REPOSITORIES
                  </h2>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-stone-400">
                    LATEST 06 ARCHIVES
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repos.length > 0 ? (
                    repos.slice(0, 6).map((repo: any, idx: number) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col justify-between p-5 rounded-2xl border border-stone-200 hover:border-black bg-white hover:-translate-y-0.5 transition-all duration-200 group min-h-[144px]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-[#FF4400] transition-colors">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <BookOpen size={15} className="text-stone-400 shrink-0" />
                              <h3 className="font-bold text-stone-950 group-hover:text-[#FF4400] transition-colors truncate font-sans text-base">
                                {repo.name}
                              </h3>
                            </div>
                            <ArrowUpRight size={15} className="text-stone-400 group-hover:text-[#FF4400] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-4">
                            {repo.description || 'Architectural engineering repository.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-mono font-bold text-stone-500 pt-3 border-t border-stone-100">
                          {repo.language && (
                            <div className="flex items-center gap-1.5 text-stone-800">
                              <span className="w-2 h-2 rounded-full bg-[#FF4400]" />
                              <span>{repo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Star size={13} />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={13} />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    [1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-36 bg-white rounded-2xl animate-pulse border border-stone-200" />
                    ))
                  )}
                </div>
              </div>

              {/* Contribution Calendar Matrix */}
              <div className="p-6 sm:p-10 bg-white">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950">
                    03 / CONTRIBUTION TELEMETRY
                  </h2>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-stone-400">
                    {new Date().getFullYear()} ACTIVITY
                  </span>
                </div>

                <div className="border border-stone-200 rounded-2xl bg-[#FAF9F7] p-5 sm:p-6 overflow-x-auto">
                  <div className="min-w-[680px] flex justify-center items-center">
                    <GitHubCalendar
                      username={username}
                      year={new Date().getFullYear()}
                      colorScheme="light"
                      transformData={transformCalendarData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-stone-200 px-6 sm:px-10 py-4 bg-[#FAF9F7] flex items-center justify-between text-[11px] font-mono tracking-widest text-stone-500 uppercase">
            <span>BHUSHAN KOLTE // PROFILE DOSSIER</span>
            <Link to="/project" className="text-stone-950 font-bold hover:text-[#FF4400] transition-colors">
              VIEW SELECTED WORKS —→
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
