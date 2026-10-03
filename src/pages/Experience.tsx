import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { BookOpen, Award } from 'lucide-react';
import certFundamentals from '../assets/certificate- Fundamentals of Scientific Communication.webp';
import certCVs from '../assets/certificate Crafting Impactful CVs and Resumes.webp';
import certAMD from '../assets/AMDcertificate.webp';


const EDUCATION = [
  {
    institution: 'Alard University',
    period: '2025-Present',
    description: 'B.Tech in Artificial Intelligence and Data Science.'
  },
  {
    institution: 'Blossom Public School',
    period: '2024 — 2025',
    description: 'Completed 11th & 12th (Science) Successfully completed senior secondary education with a focus on core sciences.'
  }
];

const WORK_EXPERIENCE = [
  {
    role: 'Freelance Front-End Web Designer',
    period: '2025 — Present',
    description: 'Bridging technical functionality with creative design to deliver seamless digital experience'
  }
];

export const CERTIFICATES = [
  {
    title: 'Fundamentals of Scientific Communication',
    period: '2026',
    description: 'Developed essential skills for effectively communicating scientific research, concepts, and data to diverse audiences.',
    image: certFundamentals
  },
  {
    title: 'Crafting Impactful CVs and Resumes',
    period: '2026',
    description: 'Mastered the principles of designing compelling professional profiles to highlight achievements and career milestones.',
    image: certCVs
  },
  {
    title: 'AMD Certification',
    period: '2026',
    description: 'Achieved proficiency in advanced technologies and professional solutions certified by AMD.',
    image: certAMD
  }
];

export const Experience = () => {
  const location = useLocation();
  const showCertificates = location.pathname === '/experience';

  return (
    <div id="experience" className="py-24 relative z-10">

      {/* Experience Timeline Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tighter text-slate-900">My <span className="text-gradient">Experience</span></h2>
        </div>

        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-blue-50 text-slate-800 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
                <BookOpen size={28} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800">Education</h3>
            </div>

            <div className="relative pl-8 border-l border-slate-200 ml-8 space-y-12">
              {EDUCATION.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute left-[-44px] top-1.5 w-6 h-6 rounded-full bg-[#e8f1fa] border-4 border-white shadow-sm flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">{item.institution}</h4>
                  <div className="text-blue-700 font-medium text-base mt-2 mb-3">{item.period}</div>
                  <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-blue-50 text-slate-800 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
                <BookOpen size={28} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800">Experience</h3>
            </div>

            <div className="relative pl-8 border-l border-slate-200 ml-8 space-y-12">
              {WORK_EXPERIENCE.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute left-[-44px] top-1.5 w-6 h-6 rounded-full bg-[#e8f1fa] border-4 border-white shadow-sm flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">{item.role}</h4>
                  <div className="text-blue-700 font-medium text-base mt-2 mb-3">{item.period}</div>
                  <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Certificates Section */}
      {showCertificates && (
        <section aria-labelledby="certificates-heading" className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
          <div className="mb-12 md:mb-20 text-center">
            <h2 id="certificates-heading" className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tighter text-slate-900">
              My <span className="text-gradient">Certificates</span>
            </h2>
          </div>

          {/* Premium 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-16">
            {CERTIFICATES.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="relative w-full aspect-[4/5] bg-slate-50 border border-indigo-900/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden group"
              >
                {/* Top Image Section */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-indigo-900/5 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                {/* The Flowing Divider & Information Section */}
                <div className="absolute bottom-0 left-0 w-full h-[45%] pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                  {/* Gap filler for safety during translate */}
                  <div className="absolute top-[98%] left-0 w-full h-12 bg-[#f8fafd]" />

                  {/* Organic Divider Mask (Optimized for portrait aspect) */}
                  <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="absolute inset-0 w-full h-full text-[#f8fafd] fill-current drop-shadow-[0_-4px_16px_rgba(30,30,80,0.06)]"
                  >
                    {/* 
                      Start left edge -> Horizontal (wider shelf for portrait) -> Large rounded corner -> Horizontal -> Curve downward -> Connect to right side 
                    */}
                    <path d="M0,0 L65,0 C75,0 75,30 85,30 L90,30 C95,30 100,38 100,50 L100,100 L0,100 Z" />
                  </svg>

                  {/* Info Content */}
                  <div className="relative z-10 w-full h-full p-6 sm:p-8 pb-6 flex flex-col justify-end pointer-events-auto">
                    {/* Title Area - constrained to fit high shelf */}
                    <div className="w-[70%] mb-auto pt-1">
                      {/* Accent Line */}
                      <div className="w-8 h-1 bg-indigo-600 rounded-full mb-3 sm:mb-4 transition-transform duration-500 origin-left group-hover:scale-x-150" />
                      
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight tracking-tight line-clamp-2">
                        {cert.title}
                      </h4>
                    </div>

                    {/* Bottom Area - Description & Date */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {cert.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-indigo-600" />
                        <span className="text-indigo-800 font-bold text-xs sm:text-sm bg-indigo-600/10 px-3 py-1 rounded-full">
                          {cert.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
