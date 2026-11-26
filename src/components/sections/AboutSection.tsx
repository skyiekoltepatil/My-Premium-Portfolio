import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import aboutImage from '../../assets/image-1.webp';
import LogoLoop from '../effects/LogoLoop';

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

export const AboutSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="about-me" aria-labelledby="about-me-heading" className="py-12 md:py-20 relative z-10 bg-[#F9F9F8]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
          {/* Header Row */}
          <div className="px-6 sm:px-10 py-8 md:py-10 border-b border-stone-200 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-3">
                03 / MONOGRAPH &amp; STACK
              </p>
              <h2 id="about-me-heading" className="font-editorial text-[clamp(2.5rem,6vw,5rem)] font-normal tracking-tight text-stone-950 leading-[0.9]">
                About <span className="italic font-serif font-light text-stone-500">Me.</span>
              </h2>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-[#FF4400] text-white text-xs font-mono font-bold tracking-widest uppercase transition-colors min-h-[44px]"
            >
              <span>GitHub Dossier &amp; Profile</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* 50/50 Architectural Biography Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white">
            {/* Portrait Column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[1.75rem] overflow-hidden border border-stone-200 bg-stone-100 group">
                <img
                  src={aboutImage}
                  alt="Bhushan Kolte portrait"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </motion.div>

            {/* Editorial Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="lg:col-span-7 flex flex-col justify-between gap-8"
            >
              <div className="font-serif text-stone-900 text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.55] font-medium space-y-5">
                <p>
                  Hi, I&apos;m <span className="font-bold not-italic">Bhushan Kolte</span>, an Artificial Intelligence and Data Science student at Alard University, Pune, driven by a passion for technology and innovation.
                </p>
                <p className="text-stone-700">
                  I am constantly exploring new ideas, building technical skills, and challenging myself to grow both personally and professionally. My focus is on crafting modern web experiences that balance architectural precision with seamless functionality.
                </p>
                <p className="text-stone-700">
                  I bring a tailored identity to every portfolio and product — collaborating directly with clients as a freelance front-end designer to bring ambitious visions to life.
                </p>
              </div>

              {/* Spec Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-stone-200 pt-6 gap-6">
                <div>
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-stone-400 uppercase mb-1">
                    DEGREE TRACK
                  </p>
                  <p className="text-sm font-bold text-stone-900">B.Tech AI &amp; Data Science</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-stone-400 uppercase mb-1">
                    PRIMARY FOCUS
                  </p>
                  <p className="text-sm font-bold text-stone-900">Creative Web &amp; UI Craft</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-stone-400 uppercase mb-1">
                    PRACTICE
                  </p>
                  <p className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active Freelancer
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Logo Loop with Accessible Pause Button */}
          <div className="border-t border-stone-200 bg-[#FAF9F7] px-6 sm:px-10 py-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-[0.2em]">
                TECHNOLOGIES I WORK WITH
              </p>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-300 bg-white hover:border-black text-stone-700 hover:text-black text-[11px] font-mono font-bold uppercase tracking-wider transition-colors min-h-[36px]"
              >
                {isPaused ? <Play size={12} /> : <Pause size={12} />}
                <span>{isPaused ? 'Play' : 'Pause'}</span>
              </button>
            </div>

            <div style={{ height: '64px', position: 'relative' }} className="w-full overflow-hidden">
              <LogoLoop
                logos={allLogos}
                speed={45}
                direction="left"
                logoHeight={40}
                gap={52}
                scaleOnHover
                fadeOut
                fadeOutColor="#FAF9F7"
                paused={isPaused}
                ariaLabel="Technology stack"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
