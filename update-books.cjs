const fs = require('fs');
const path = '/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/public/landing-pages/complete-shelf-v2.html';
let content = fs.readFileSync(path, 'utf8');

const projects = [
  {
    title: 'Detailed Portfolio',
    discipline: 'React Component Library',
    deck: 'A premium, highly interactive React component library for modern web applications.',
    note: 'Premium UI components and animations.',
    theme: 'React · TypeScript · Framer Motion',
    chapters: ["Overview", "Architecture", "Conclusion"],
    image: '/projects/Project-1-image.webp'
  },
  {
    title: 'Live Portfolio',
    discipline: 'Interactive Web Journey',
    deck: 'A modern and interactive portfolio crafted to showcase my passion for technology, creativity, and innovation. Explore my journey and projects.',
    note: 'Personal showcase and interactive web journey.',
    theme: 'HTML · CSS · JS',
    chapters: ["Introduction", "Showcase", "Impact"],
    image: '/projects/Project-2-image.webp'
  },
  {
    title: 'Hover Reveal',
    discipline: 'Creative Coding',
    deck: 'A premium, interactive portfolio landing page featuring a stunning liquid hover reveal effect built using the HTML5 Canvas API.',
    note: 'Fluid canvas rendering and SVG filters.',
    theme: 'HTML · CSS · JS · Canvas',
    chapters: ["Canvas Setup", "Shaders", "Interactivity"],
    image: '/projects/sculpture-hover.webp'
  },
  {
    title: 'Weather App',
    discipline: 'Web Application',
    deck: 'A modern weather application providing real-time forecasts and conditions.',
    note: 'Real-time global weather data.',
    theme: 'HTML · CSS · JS',
    chapters: ["Data Fetching", "UI Design", "Deployment"],
    image: '/projects/weather-image.webp'
  },
  {
    title: '3D Login',
    discipline: 'Frontend Development',
    deck: 'A modern, 3D animated login interface built with React, showcasing interactive elements and fluid CSS animations.',
    note: 'Immersive login experience.',
    theme: 'HTML · React JS · CSS',
    chapters: ["Concept", "3D Elements", "Result"],
    image: '/projects/Project-3-image.webp'
  }
];

const regex = /const BOOKS = (\[[\s\S]*?\]);\s*const COVER_ATLAS_DATA/m;
const match = content.match(regex);
if (match) {
  let booksStr = match[1];
  let books;
  eval('books = ' + booksStr);
  
  for (let i = 0; i < projects.length; i++) {
    books[i].title = projects[i].title;
    books[i].discipline = projects[i].discipline;
    books[i].deck = projects[i].deck;
    books[i].note = projects[i].note;
    books[i].theme = projects[i].theme;
    books[i].chapters = projects[i].chapters;
    books[i].image = projects[i].image;
  }
  
  books[5].title = "Contact Me";
  books[5].discipline = "Let's work together";
  books[5].deck = "Reach out for exciting projects and collaborations in web development and AI.";
  books[5].note = "Let's connect.";
  books[5].theme = "Email · GitHub · LinkedIn";
  books[5].chapters = ["Connect", "Collaborate", "Create"];

  books[6].title = "My Resume";
  books[6].discipline = "Professional Experience";
  books[6].deck = "Detailed overview of my professional experience, education, and skill set.";
  books[6].note = "Experience & Education";
  books[6].theme = "Skills · Experience · Education";
  books[6].chapters = ["Experience", "Education", "Skills"];

  const newBooksStr = JSON.stringify(books, null, 2);
  content = content.replace(booksStr, newBooksStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully updated books');
} else {
  console.log('BOOKS array not found');
}
