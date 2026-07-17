import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/image-1.png';
import LogoLoop from '../components/LogoLoop';
import ScrambledText from '../components/ScrambledText';
import { GitHubCalendar } from 'react-github-calendar';
import { Users, BookOpen, Star, GitFork, MapPin, Mail, Building2 } from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiVite, SiNodedotjs, SiPython, SiPostgresql,
  SiFirebase, SiFigma,
  SiGooglegemini, SiOllama, SiAnthropic, SiVercel, SiGithub,
  SiJupyter, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiKaggle, SiOpencv, SiPlotly, SiStreamlit, SiGooglecolab, SiR,
} from 'react-icons/si';
import { FaLinkedin, FaMicrosoft } from 'react-icons/fa';

const allLogos = [
  { node: <SiReact style={{ color: '#61DAFB' }} />, title: 'React' },
  { node: <SiNextdotjs style={{ color: '#111827' }} />, title: 'Next.js' },
  { node: <SiTypescript style={{ color: '#3178C6' }} />, title: 'TypeScript' },
  { node: <SiTailwindcss style={{ color: '#06B6D4' }} />, title: 'Tailwind CSS' },
  { node: <SiVite style={{ color: '#646CFF' }} />, title: 'Vite' },
  { node: <SiNodedotjs style={{ color: '#339933' }} />, title: 'Node.js' },
  { node: <SiFirebase style={{ color: '#F5A623' }} />, title: 'Firebase' },
  { node: <SiFigma style={{ color: '#F24E1E' }} />, title: 'Figma' },
  { node: <SiVercel style={{ color: '#111827' }} />, title: 'Vercel' },
  { node: <SiGithub style={{ color: '#181717' }} />, title: 'GitHub' },
  { node: <FaLinkedin style={{ color: '#0A66C2' }} />, title: 'LinkedIn' },
  { node: <SiGooglegemini style={{ color: '#886FBF' }} />, title: 'Gemini' },
  { node: <SiAnthropic style={{ color: '#D4A27F' }} />, title: 'Claude' },
  { node: <SiOllama style={{ color: '#111827' }} />, title: 'Ollama' },
  { node: <SiPython style={{ color: '#3776AB' }} />, title: 'Python' },
  { node: <SiR style={{ color: '#276DC3' }} />, title: 'R' },
  { node: <SiJupyter style={{ color: '#F37626' }} />, title: 'Jupyter' },
  { node: <SiGooglecolab style={{ color: '#F9AB00' }} />, title: 'Google Colab' },
  { node: <SiPandas style={{ color: '#150458' }} />, title: 'Pandas' },
  { node: <SiNumpy style={{ color: '#013243' }} />, title: 'NumPy' },
  { node: <SiScikitlearn style={{ color: '#F7931E' }} />, title: 'Scikit-learn' },
  { node: <SiTensorflow style={{ color: '#FF6F00' }} />, title: 'TensorFlow' },
  { node: <SiOpencv style={{ color: '#5C3EE8' }} />, title: 'OpenCV' },
  { node: <SiPlotly style={{ color: '#3F4F75' }} />, title: 'Plotly' },
  { node: <SiStreamlit style={{ color: '#FF4B4B' }} />, title: 'Streamlit' },
  { node: <SiKaggle style={{ color: '#20BEFF' }} />, title: 'Kaggle' },
  { node: <SiPostgresql style={{ color: '#4169E1' }} />, title: 'PostgreSQL' },
  { node: <FaMicrosoft style={{ color: '#5E5E5E' }} />, title: 'Power BI / Excel' },
];

export const About = () => {
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const username = "skyiekoltepatil";

  useEffect(() => {
    // Fetch profile
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));

    // Fetch repos
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const excludedRepos = [
            "Login-Interface", 
            "learningJs-2025", 
            "learning-react-JS-2025", 
            "Data-Structures-Algorithmns-main"
          ];
          const filteredRepos = data.filter(repo => !excludedRepos.includes(repo.name));
          setRepos(filteredRepos.slice(0, 6));
        }
      })
      .catch(err => console.error(err));
  }, [username]);

  return (
    <section className="pt-32 pb-24 relative z-10 bg-white/40 min-h-screen flex flex-col items-center font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-10"
        >
          {/* Left Sidebar (GitHub Profile Style) */}
          <div className="w-full lg:w-1/4 flex flex-col gap-5">
             <div className="relative group w-[260px] max-w-full mx-auto lg:mx-0">
                <img 
                  src={aboutImage} 
                  alt="Bhushan Kolte" 
                  className="w-full aspect-square object-cover rounded-full border border-slate-200 shadow-sm z-10 relative bg-white" 
                />
             </div>
             
             <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">Bhushan Kolte</h1>
                <h2 className="text-xl font-light text-slate-500">{username}</h2>
             </div>
             
             <button className="w-full py-1.5 bg-slate-50 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm">
               Follow
             </button>

             <p className="text-slate-700 text-sm leading-relaxed">
               {profile?.bio || "Artificial Intelligence & Data Science Student at Alard University | Creative Developer"}
             </p>
             
             <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Users size={16} />
                <span className="font-bold text-slate-800">{profile?.followers || 0}</span> followers <span className="mx-0.5">·</span>
                <span className="font-bold text-slate-800">{profile?.following || 0}</span> following
             </div>

             <div className="flex flex-col gap-2.5 text-sm text-slate-700 border-t border-slate-200 pt-5 mt-1">
                <div className="flex items-center gap-2"><Building2 size={16} className="text-slate-400" /> <span className="font-medium">Alard University</span></div>
                <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> Pune, India</div>
                <div className="flex items-center gap-2"><Mail size={16} className="text-slate-400" /> <a href="mailto:bhushankolte20@gmail.com" className="hover:text-blue-600 transition-colors">bhushankolte20@gmail.com</a></div>
             </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full lg:w-3/4 flex flex-col gap-8">
             
             {/* README Section */}
             <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    {username} / README.md
                </div>
                <div className="p-8 text-slate-800 text-lg leading-relaxed font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <ScrambledText className="space-y-6" radius={100} duration={1.2} speed={0.5} scrambleChars="0123456789!@#%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ">
                      <p>
                        Hi, I'm <strong>Bhushan Kolte</strong>, an Artificial Intelligence and Data Science student at Alard University, Pune, driven by a passion for technology and innovation. I am constantly exploring new ideas, building technical skills, and challenging myself to grow both personally and professionally. My focus is on crafting modern web experiences that perfectly balance sleek visual design with seamless functionality. I add a highly personalized touch to your portfolios and websites to communicate your unique brand identity in the most creative way possible. As an active freelancer, I collaborate with clients to bring their next big vision to life.
                      </p>
                    </ScrambledText>

                    {/* Logo loop embedded in README */}
                    <div className="mt-12 pt-8 border-t border-slate-200/50">
                        <p className="text-xs font-sans font-bold text-slate-400 mb-6 uppercase tracking-widest text-center">
                            Technologies I Work With
                        </p>
                        <div style={{ height: '60px', position: 'relative', fontFamily: "sans-serif" }}>
                            <LogoLoop logos={allLogos} speed={90} direction="left" logoHeight={36} gap={40} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="#ffffff" />
                        </div>
                    </div>
                </div>
             </div>

             {/* Pinned Repos */}
             <div>
                <h3 className="text-base font-normal text-slate-800 mb-4">Pinned</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repos.length > 0 ? repos.slice(0, 6).map((repo: any) => (
                    <a 
                      key={repo.id} 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex flex-col p-4 rounded-md border border-slate-200 hover:border-slate-300 transition-colors bg-white group h-32 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={16} className="text-slate-500" />
                        <h4 className="font-semibold text-blue-600 group-hover:underline truncate">{repo.name}</h4>
                        <span className="ml-auto text-xs font-medium text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">Public</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 line-clamp-2">{repo.description || "No description provided."}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-600 mt-auto">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            {repo.language}
                          </div>
                        )}
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <Star size={14} />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <GitFork size={14} />
                          {repo.forks_count}
                        </div>
                      </div>
                    </a>
                  )) : (
                    [1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="h-32 bg-slate-50 rounded-md animate-pulse border border-slate-200 shadow-sm"></div>
                    ))
                  )}
                </div>
             </div>

             {/* Contributions */}
             <div className="mt-4">
                 <div className="border border-slate-200 rounded-lg bg-white p-6 overflow-x-auto shadow-sm">
                     <div className="min-w-[700px] flex justify-center items-center">
                        <GitHubCalendar 
                          username={username} 
                          year={new Date().getFullYear()} 
                          colorScheme="light" 
                        />
                     </div>
                 </div>
             </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
