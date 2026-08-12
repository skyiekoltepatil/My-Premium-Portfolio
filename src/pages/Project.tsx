import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import Project1Image from '../assets/Project-1-image.webp';
import Project2Image from '../assets/Project-2-image.webp';
import Project3Image from '../assets/Project-3-image.webp';
import WeatherImage from '../assets/weather-image.webp';
import SculptureHoverImage from '../assets/sculpture-hover.webp';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76 0-1.4-.5-2.6-1.4-3.5.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C6 2.7 5 3 5 3c-.7 1.8-.2 3.2-.1 3.5-1 .9-1.5 2.1-1.5 3.5 0 5.2 3 6.5 6 6.8-.7.3-1.3 1-1.5 2.1-.2 0-.8.3-2.3-1-1-.8-1.5-1.5-1.5-1-.2-1.8.2-1.8.2.8.1 1.2 1 1.2 1 .7 1.2 2 1.7 3 1.2 0 1 .1 2.3.1 3" />
  </svg>
);

export const PROJECTS = [
  {
    title: 'My Detailed Portfolio',
    description: 'A premium, highly interactive React component library for modern web applications.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    image: Project1Image,
    link: 'https://bhushankolte.netlify.app',
    github: 'https://github.com/skyiekoltepatil'
  },
  {
    title: 'Live Portfolio',
    description: 'A modern and interactive portfolio crafted to showcase my passion for technology, creativity, and innovation. Explore my journey, projects, and the ideas that drive me to build meaningful digital experiences.',
    tech: ['HTML', 'CSS', 'JS'],
    image: Project2Image,
    link: 'https://bhushankolte.netlify.app',
    github: 'https://github.com/skyiekoltepatil'
  },
  {
    title: '3D Animated Login Interface',
    description: 'A modern, 3D animated login interface built with React, showcasing interactive elements and fluid CSS animations.',
    tech: ['HTML', 'React JS', 'CSS'],
    image: Project3Image,
    link: 'https://github.com/skyiekoltepatil/Login-Interface',
    github: 'https://github.com/skyiekoltepatil/Login-Interface'
  },
  {
    title: 'Weather App',
    description: 'A modern weather application providing real-time forecasts and conditions.',
    tech: ['HTML', 'CSS', 'JS'],
    image: WeatherImage,
    link: 'https://github.com/skyiekoltepatil/weather-app',
    github: 'https://github.com/skyiekoltepatil/weather-app'
  },
  {
    title: 'Liquid Hover Reveal',
    description: 'A premium, interactive portfolio landing page featuring a stunning liquid hover reveal effect built using the HTML5 Canvas API and SVG filters.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    image: SculptureHoverImage,
    link: 'https://immersive-g.com/',
    github: 'https://github.com/skyiekoltepatil/sculpture-hover'
  }
];

export const Project = () => {
  return (
    <div id="project" className="py-24 relative z-10">
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tighter text-slate-900">Selected <span className="text-gradient">Work</span></h2>
        </div>

        <div className="space-y-32">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-20 items-center`}
            >
              <div className="w-full md:w-3/5">
                <div className="relative rounded-[2.5rem] overflow-hidden group border border-slate-200 shadow-2xl shadow-slate-300/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <InteractiveHoverButton href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </InteractiveHoverButton>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/5 space-y-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full glass-panel text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-slate-900">{project.title}</h3>
                <p className="text-slate-600 text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed font-medium">{project.description}</p>

                <div className="pt-8 flex items-center gap-8">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-slate-700 hover:text-blue-600 transition-colors">
                    <GithubIcon size={20} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
