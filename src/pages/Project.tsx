import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, Layers, SlidersHorizontal, X } from 'lucide-react';
import { ModalDialog } from '../components/ui/ModalDialog';

import Project1Image from '../assets/Project-1-image.webp';
import Project2Image from '../assets/Project-2-image.webp';
import Project3Image from '../assets/Project-3-image.webp';
import WeatherImage from '../assets/weather-image.webp';
import SculptureHoverImage from '../assets/sculpture-hover.webp';
import DinoKeyImage from '../assets/dino-key-image.webp';

/* ──────────────────────────────────────────────
   Project Data Model
   ────────────────────────────────────────────── */

export interface ProjectHighlight {
  title: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  year: string;
  category: string;
  filter: 'all' | 'creative' | 'apps' | 'ui' | 'hardware';
  title: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  highlights?: ProjectHighlight[];
  tech: string[];
  image: string;
  link?: string;
  github: string;
  status: 'Live Production' | 'Open Source' | 'Interactive Demo';
  accent: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'dino-key',
    num: '01',
    year: '2026',
    category: 'Hardware & IoT',
    filter: 'hardware',
    title: 'DINO KEY V1',
    tagline: 'ESP32-C3 + 1.3" SH1106 OLED desk companion',
    description:
      'An interactive wearable mini desk-companion powered by an ESP32-C3 and a 128×64 SH1106 OLED display, featuring 9 hardware modes, 20 pixel expressions, playable Dino Run, Bluetooth LE HID & battery/time sync, captive Wi-Fi NTP provisioning, a native macOS menu-bar sync app, and a browser OLED simulator.',
    challenge:
      'Packing 50 FPS pixel animations, a playable endless runner, multi-radio wireless synchronization (BLE + Wi-Fi AP/NTP), and battery telemetry onto an ultra-compact keychain controller operated from a single input pin.',
    solution:
      'Engineered a non-blocking C++ firmware engine over 400 kHz I2C (GPIO 6/7) with automatic touch/button input detection (GPIO 3), NVS high-score and brightness persistence, a CoreBluetooth macOS companion (DinoKeySync.app), and an HTML5 Web Bluetooth/Serial emulator.',
    highlights: [
      {
        title: '9 Hardware Modes',
        detail:
          'Single-click cycles Home (clock + blinking face), Digital Clock (BLE/NTP/Web/RTC sync badge), Live Stopwatch, Battery Diagnostics (0x180F BLE / MAX17048), Dino Run, 20 Full Faces, Connect Portal, 5-Step Brightness, and Sleep.',
      },
      {
        title: 'Single-Pin Gesture Control',
        detail:
          'GPIO 3 automatically detects Active-HIGH TTP223 capacitive touch or Active-LOW push buttons (INPUT_PULLUP), supporting single click, double click, jump press, and long press sleep/reset.',
      },
      {
        title: 'Companion Sync Ecosystem',
        detail:
          'Includes a native Swift CoreBluetooth macOS menu-bar app (DinoKeySync.app), a 2.4 GHz captive Wi-Fi setup portal (DINO-KEY / 192.168.4.1), and a browser 128×64 Web Bluetooth & Web Serial simulator.',
      },
    ],
    tech: ['ESP32-C3', 'C++ / PlatformIO', 'SH1106 OLED', 'BLE 5.0', 'Wi-Fi NTP', 'Swift (macOS)', 'Web Bluetooth'],
    image: DinoKeyImage,
    github: 'https://github.com/skyiekoltepatil/Dino-key',
    status: 'Open Source',
    accent: '#FF4400',
  },
  {
    id: 'detailed-portfolio',
    num: '02',
    year: '2026',
    category: 'Design Engineering',
    filter: 'creative',
    title: 'My Detailed Portfolio',
    tagline: 'Hyper-responsive creative portfolio engine',
    description: 'A premium, highly interactive React component library and personal showcase engineered with custom physics, smooth shaders, and bespoke micro-interactions.',
    challenge: 'Architecting a portfolio with high-fidelity visual effects while maintaining near-instant initial paint times and zero frame-drops across mobile and desktop.',
    solution: 'Engineered with React 19, Vite, and tailored Tailwind styling, delegating intensive animations to GPU-composited layers and lightweight CSS variables.',
    tech: ['React 19', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    image: Project1Image,
    link: 'https://bhushankolte.netlify.app',
    github: 'https://github.com/skyiekoltepatil',
    status: 'Live Production',
    accent: '#FF4400',
  },
  {
    id: 'live-portfolio',
    num: '03',
    year: '2025',
    category: 'Web Experience',
    filter: 'creative',
    title: 'Live Creative Showcase',
    tagline: 'Modern dynamic digital identity platform',
    description: 'An interactive portfolio platform crafted to showcase creative engineering, featuring tailored layout grids, smooth magnetic interactions, and responsive aesthetics.',
    challenge: 'Creating a clean editorial design that feels tactile like a physical magazine while staying fluidly adaptable to any viewport size.',
    solution: 'Designed a Swiss-inspired layout grid with subtle hairlines, variable typography, and modular sections.',
    tech: ['HTML5', 'Modern CSS', 'JavaScript ES6+', 'Vite'],
    image: Project2Image,
    link: 'https://bhushankolte.netlify.app',
    github: 'https://github.com/skyiekoltepatil',
    status: 'Live Production',
    accent: '#2563EB',
  },
  {
    id: 'login-interface',
    num: '04',
    year: '2025',
    category: 'Interactive UI',
    filter: 'ui',
    title: '3D Animated Login Interface',
    tagline: 'Spatial perspective authentication system',
    description: 'A modern, 3D animated authentication experience built with React, showcasing interactive tilt elements, tactile feedback, and fluid CSS spatial animations.',
    challenge: 'Simulating tactile 3D physical movement in pure CSS/React without bundling heavy WebGL engines.',
    solution: 'Utilized CSS 3D perspective transforms combined with pointer tracking math to deliver smooth depth effects with minimal memory footprint.',
    tech: ['React JS', '3D Transforms', 'CSS Modules', 'Framer Motion'],
    image: Project3Image,
    github: 'https://github.com/skyiekoltepatil/Login-Interface',
    status: 'Open Source',
    accent: '#9333EA',
  },
  {
    id: 'weather-app',
    num: '05',
    year: '2025',
    category: 'Application',
    filter: 'apps',
    title: 'Precision Weather App',
    tagline: 'Atmospheric telemetry & real-time radar',
    description: 'A sleek, data-driven weather application providing real-time forecasts, atmospheric telemetry, dynamic vector weather graphics, and location-based meteorological radar.',
    challenge: 'Presenting dense atmospheric metrics in an intuitive, beautifully readable interface that loads instantly.',
    solution: 'Integrated lightweight REST APIs with intelligent client caching and vector-animated status graphics tailored to current weather conditions.',
    tech: ['REST API', 'JavaScript', 'CSS3', 'Geolocation'],
    image: WeatherImage,
    github: 'https://github.com/skyiekoltepatil/weather-app',
    status: 'Open Source',
    accent: '#0284C7',
  },
  {
    id: 'liquid-hover',
    num: '06',
    year: '2026',
    category: 'Creative Tech',
    filter: 'creative',
    title: 'Liquid Hover Distortion',
    tagline: 'Mathematical displacement shader reveal',
    description: 'An interactive portfolio landing page featuring an organic liquid hover distortion effect built using the HTML5 Canvas API and mathematical displacement shaders.',
    challenge: 'Running realistic fluid ripple and displacement calculations on high-res images without throttling CPU execution.',
    solution: 'Engineered optimized HTML5 2D canvas buffer pipelines with SVG turbulence displacement matrix filters for responsive visual flow.',
    tech: ['Canvas API', 'WebGL Lite', 'SVG Filters', 'JavaScript'],
    image: SculptureHoverImage,
    github: 'https://github.com/skyiekoltepatil/sculpture-hover',
    status: 'Interactive Demo',
    accent: '#16A34A',
  },
];

/* ──────────────────────────────────────────────
   Project Detail Modal
   ────────────────────────────────────────────── */

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <ModalDialog
      isOpen={Boolean(project)}
      onClose={onClose}
      labelledBy="project-modal-title"
    >
      {project && (
        <div className="bg-white rounded-3xl w-[min(92vw,56rem)] max-h-[88dvh] overflow-y-auto border border-stone-200 shadow-2xl relative flex flex-col">
          {/* Modal Banner Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-stone-100 overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 shadow-md"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Banner Meta */}
            <div className="absolute bottom-6 left-6 sm:left-8 right-6 text-white z-10">
              <div className="flex items-center gap-3 mb-2 font-mono text-xs tracking-widest uppercase">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold">
                  {project.num} / {project.category}
                </span>
                <span>{project.year}</span>
              </div>
              <h1 id="project-modal-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-10 flex flex-col gap-8">
            <div>
              <h2 className="text-stone-900 font-bold text-lg mb-2 font-sans">Overview</h2>
              <p className="text-stone-600 leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <div>
                <h3 className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mb-2">
                  THE CHALLENGE
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mb-2">
                  THE SOLUTION
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Detailed Breakdown (when provided) */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mb-3">
                  ARCHITECTURE & MODES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-stone-200 bg-white p-4 flex flex-col gap-2"
                    >
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                        {item.title}
                      </h4>
                      <p className="text-stone-600 text-xs leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mb-3">
                TECHNOLOGIES USED
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-xs font-mono font-bold text-stone-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider">
                  {project.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    project.link
                      ? 'border border-stone-300 hover:border-black text-stone-800'
                      : 'bg-black hover:bg-[#FF4400] text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <Github size={16} />
                  <span>{project.link ? 'Source Code' : 'GitHub'}</span>
                </a>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-black hover:bg-[#FF4400] text-white text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <span>Live Website</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalDialog>
  );
};

/* ──────────────────────────────────────────────
   Main Award-Winning Project Page
   ────────────────────────────────────────────── */

export const Project: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'creative' | 'apps' | 'ui' | 'hardware'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Floating hover preview for index table view
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.filter === filter);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans selection:bg-[#FF4400] selection:text-white pb-16 pt-0 relative"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Outer Architectural Container */}
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2.5rem] shadow-sm overflow-hidden">

          {/* Hero Section */}
          <div className="px-6 sm:px-10 py-10 md:py-16 border-b border-stone-200">
            <div className="max-w-3xl">
              <p className="text-xs font-mono font-bold tracking-[0.25em] text-stone-500 uppercase mb-4">
                CRAFTED WITH PRECISION
              </p>
              <h1 className="font-editorial text-[clamp(3.25rem,8vw,7rem)] font-normal tracking-tight text-stone-950 leading-[0.88] mb-6">
                Engineered <span className="italic font-serif font-light text-stone-400">Experiences.</span>
              </h1>
              <p className="text-stone-600 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
                A curated archive of creative web systems, interactive interfaces, and digital artifacts designed to blend architectural clarity with fluid motion.
              </p>
            </div>
          </div>

          {/* Interactive Control Filter & View Toggle Bar */}
          <div className="border-b border-stone-200 px-6 sm:px-10 py-5 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mr-2 hidden sm:inline">
                FILTER:
              </span>
              {([
                { id: 'all', label: 'All Works' },
                { id: 'hardware', label: 'Hardware & IoT' },
                { id: 'creative', label: 'Creative Tech' },
                { id: 'apps', label: 'Web Apps' },
                { id: 'ui', label: 'Interactive UI' },
              ] as const).map((tab) => {
                const isActive = filter === tab.id;
                const count = tab.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.filter === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle Switch (Grid vs Index) */}
            <div className="flex items-center gap-2 bg-white border border-stone-200 p-1 rounded-xl shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
                aria-label="Grid showcase view"
              >
                <Layers size={14} />
                <span>Showcase</span>
              </button>

              <button
                onClick={() => setViewMode('index')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'index'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
                aria-label="Index catalog view"
              >
                <SlidersHorizontal size={14} />
                <span>Index Table</span>
              </button>
            </div>

          </div>

          {/* Projects Body */}
          {viewMode === 'grid' ? (
            /* ──────────────────────────────────────────────
               Showcase Mode (Immersive Modern Bento Cards)
               ────────────────────────────────────────────── */
            <div className="p-6 sm:p-10 divide-y divide-stone-200">
              {filteredProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`py-12 first:pt-4 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
                  >
                    {/* Visual Card (Swaps sides on even/odd for architectural rhythm) */}
                    <div
                      className={`lg:col-span-7 relative group cursor-pointer ${
                        !isEven ? 'lg:order-2' : ''
                      }`}
                      onClick={() => setActiveProject(project)}
                    >
                      <div className="relative rounded-[2rem] overflow-hidden border border-stone-200 bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-stone-300">
                        {/* Status Tags Overlay */}
                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-widest uppercase">
                            {project.num} / {project.category}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 font-mono text-[11px] font-bold tracking-wider shadow-sm">
                            {project.year}
                          </span>
                        </div>

                        {/* Image Preview with Smooth Zoom */}
                        <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-5 flex flex-col justify-between ${!isEven ? 'lg:order-1' : ''}`}>
                      <div>
                        {/* Kicker */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: project.accent }}
                          />
                          <span className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase">
                            {project.tagline}
                          </span>
                        </div>

                        {/* Title */}
                        <h2
                          onClick={() => setActiveProject(project)}
                          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-950 leading-[0.98] mb-4 hover:text-[#FF4400] transition-colors cursor-pointer"
                        >
                          {project.title}
                        </h2>

                        {/* Description */}
                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {project.tech.map((t, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200/80 text-stone-700 font-mono text-[11px] font-semibold tracking-wide"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="flex items-center gap-3 pt-6 border-t border-stone-200">
                        {project.link ? (
                          <>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="px-6 py-3 rounded-xl bg-black hover:bg-[#FF4400] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer group/btn"
                            >
                              <span>LIVE DEMO</span>
                              <ArrowUpRight
                                size={16}
                                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                              />
                            </a>

                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="p-3 rounded-xl border border-stone-300 hover:border-black text-stone-700 hover:text-black transition-colors cursor-pointer shadow-2xs"
                              aria-label={`View ${project.title} on GitHub`}
                              title="View GitHub Repository"
                            >
                              <Github size={18} />
                            </a>
                          </>
                        ) : (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-xl bg-black hover:bg-[#FF4400] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                          >
                            <Github size={16} />
                            <span>GITHUB</span>
                          </a>
                        )}

                        <button
                          onClick={() => setActiveProject(project)}
                          className="px-4 py-3 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold tracking-wider transition-colors cursor-pointer ml-auto"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* ──────────────────────────────────────────────
               Index Table Mode (Editorial Minimalist Ledger)
               ────────────────────────────────────────────── */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF9F7] text-[11px] font-mono tracking-widest text-stone-500 uppercase">
                    <th className="py-4 px-6 sm:px-8 font-bold">NO.</th>
                    <th className="py-4 px-6 font-bold">PROJECT</th>
                    <th className="py-4 px-6 font-bold hidden md:table-cell">DISCIPLINE</th>
                    <th className="py-4 px-6 font-bold hidden sm:table-cell">YEAR</th>
                    <th className="py-4 px-6 font-bold hidden lg:table-cell">TECH STACK</th>
                    <th className="py-4 px-6 text-right font-bold">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => setActiveProject(project)}
                      className="hover:bg-stone-50 transition-colors cursor-pointer group"
                    >
                      <td className="py-6 px-6 sm:px-8 font-mono text-sm font-bold text-stone-400 group-hover:text-[#FF4400] transition-colors">
                        {project.num}
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-base sm:text-lg text-stone-950 group-hover:text-[#FF4400] transition-colors">
                            {project.title}
                          </span>
                          <span className="text-xs text-stone-500 line-clamp-1 font-medium">
                            {project.tagline}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6 hidden md:table-cell font-mono text-xs text-stone-600 font-semibold">
                        {project.category}
                      </td>
                      <td className="py-6 px-6 hidden sm:table-cell font-mono text-xs text-stone-500">
                        {project.year}
                      </td>
                      <td className="py-6 px-6 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded bg-stone-100 text-[10px] font-mono font-medium text-stone-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <a
                            href={project.link || project.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={project.link ? `Open live site for ${project.title}` : `View ${project.title} on GitHub`}
                            className="p-2.5 rounded-full border border-stone-200 hover:border-black hover:bg-black hover:text-white transition-all text-stone-700 shadow-2xs"
                          >
                            {project.link ? <ArrowUpRight size={16} /> : <Github size={16} />}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Ledger Bar */}
          <div className="border-t border-stone-200 px-6 sm:px-10 py-5 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-widest text-stone-500 uppercase">
            <div className="flex items-center gap-3">
              <span className="w-4 h-0.5 bg-stone-400 inline-block" />
              <span>CONTINUOUSLY DEPLOYED & OPTIMIZED</span>
            </div>

            <div className="flex items-center gap-4 text-stone-700 font-bold">
              <span>BHUSHAN KOLTE ARCHIVE</span>
              <span>—→</span>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Cursor Hover Preview Card (Active in Index Mode) */}
      <AnimatePresence>
        {viewMode === 'index' && hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x + 24,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="fixed pointer-events-none z-50 w-72 rounded-2xl overflow-hidden border border-stone-300 bg-white shadow-2xl hidden md:block"
          >
            <div className="w-full h-44 bg-stone-100 overflow-hidden">
              <img
                src={hoveredProject.image}
                alt={hoveredProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 bg-white">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase mb-1">
                <span>{hoveredProject.num}</span>
                <span>{hoveredProject.year}</span>
              </div>
              <p className="font-bold text-stone-900 text-sm truncate">
                {hoveredProject.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal (Native top-layer dialog) */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};
