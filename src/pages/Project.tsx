import Project1Image from '../assets/Project-1-image.webp';
import Project2Image from '../assets/Project-2-image.webp';
import Project3Image from '../assets/Project-3-image.webp';
import WeatherImage from '../assets/weather-image.webp';
import SculptureHoverImage from '../assets/sculpture-hover.webp';
import { CompleteShelfLandingPage } from '../shaders/landing-pages/LandingPages';
import '../shaders/threeui.css';

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
