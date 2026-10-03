import { motion } from 'framer-motion';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import Project1Image from '../assets/Project-1-image.webp';
import Project2Image from '../assets/Project-2-image.webp';
import Project3Image from '../assets/Project-3-image.webp';
import WeatherImage from '../assets/weather-image.webp';
import SculptureHoverImage from '../assets/sculpture-hover.webp';
import { CompleteShelfLandingPage } from '../shaders/landing-pages/LandingPages';
import '../shaders/threeui.css';

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
    <div id="project" className="relative z-10 w-full">
      {/* 3D Bookshelf Component */}
      <div className="w-full h-[100dvh] overflow-hidden">
        <CompleteShelfLandingPage
          headingFont="iowan-old-style"
          bodyFont="inter"
          headingWeight="400"
          bodyWeight="400"
          primaryColor="#c87046"
          headingSize={60}
          bodySize={12}
          headingLetterSpacing={-0.055}
        />
      </div>
    </div>
  );
};
