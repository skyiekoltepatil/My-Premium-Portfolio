import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { BookOpen, Award } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../components/effects/ScrollStack';
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
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900">My <span className="text-gradient">Experience</span></h2>
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
        <section aria-labelledby="certificates-heading">
          <div className="mb-16 md:mb-24 text-center">
            <h2 id="certificates-heading" className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900">My <span className="text-gradient">Certificates</span></h2>
            <p className="text-slate-500 mt-4 text-lg">Scroll down to explore all certificates</p>
          </div>

          <ScrollStack
            useWindowScroll={true}
            itemDistance={60}
            itemScale={0.04}
            itemStackDistance={25}
            baseScale={0.9}
            blurAmount={1.5}
            role="list"
            aria-label="List of Certificates"
          >
            {CERTIFICATES.map((item, i) => (
              <ScrollStackItem 
                key={i} 
                itemClassName="cert-card"
                role="listitem"
                aria-labelledby={`cert-title-${i}`}
                aria-describedby={`cert-desc-${i}`}
              >
                <div className="cert-image-wrapper" aria-hidden="true">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="cert-text">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <Award size={18} />
                    </div>
                    <span className="text-blue-700 font-bold text-sm">{item.period}</span>
                  </div>
                  <h4 id={`cert-title-${i}`} className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p id={`cert-desc-${i}`} className="text-slate-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </section>
      )}

    </div>
  );
};
