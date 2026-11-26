import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Award, ArrowUpRight, Eye, FileText, X } from 'lucide-react';
import { ModalDialog } from '../components/ui/ModalDialog';
import certFundamentals from '../assets/certificate- Fundamentals of Scientific Communication.webp';
import certCVs from '../assets/certificate Crafting Impactful CVs and Resumes.webp';
import certAMD from '../assets/AMDcertificate.webp';
import certCodeAlpha from '../assets/codealpha-certificate.webp';
import lorCodeAlpha from '../assets/codealpha-lor.webp';

const EDUCATION = [
  {
    num: '01',
    institution: 'Alard University',
    period: '2025 — PRESENT',
    tag: 'B.TECH DEGREE',
    description: 'B.Tech in Artificial Intelligence and Data Science — focusing on machine learning, data engineering, and interactive web systems.',
  },
  {
    num: '02',
    institution: 'Blossom Public School',
    period: '2024 — 2025',
    tag: 'SENIOR SECONDARY',
    description: 'Completed 11th & 12th (Science) — senior secondary education grounded in mathematics, computing, and core sciences.',
  },
];

interface WorkItem {
  num: string;
  role: string;
  period: string;
  tag: string;
  description: string;
  disciplines: string;
  documents?: { label: string; href: string }[];
}

const WORK_EXPERIENCE: WorkItem[] = [
  {
    num: '01',
    role: 'CodeAlpha — Artificial Intelligence Intern',
    period: '10 OCT — 10 NOV 2026',
    tag: 'INTERNSHIP',
    description: 'Completed the CodeAlpha Virtual Internship Program in Artificial Intelligence (Student ID: CA/DF1/313372), delivering analytical AI solutions and earning a formal Letter of Recommendation.',
    disciplines: 'Artificial Intelligence · Analytical Engineering · Team Collaboration',
    documents: [
      { label: 'Certificate PDF', href: '/certificates/codealpha-certificate.pdf' },
      { label: 'LOR PDF', href: '/certificates/codealpha-lor.pdf' },
    ],
  },
  {
    num: '02',
    role: 'Freelance Front-End Web Designer',
    period: '2025 — PRESENT',
    tag: 'INDEPENDENT PRACTICE',
    description: 'Bridging technical functionality with creative architectural direction to deliver high-speed, responsive web experiences for clients.',
    disciplines: 'React Architecture · Tailwind Systems · Interactive Motion',
  },
];

export interface CertificateItem {
  num: string;
  title: string;
  issuer: string;
  period: string;
  description: string;
  image: string;
  pdf?: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    num: '01',
    title: 'CodeAlpha AI Internship Certificate',
    issuer: 'CODEALPHA • CA/DF1/313372',
    period: 'NOV 2026',
    description: 'Certificate of Completion for the CodeAlpha Virtual Internship Program in Artificial Intelligence (10 Oct – 10 Nov 2026).',
    image: certCodeAlpha,
    pdf: '/certificates/codealpha-certificate.pdf',
  },
  {
    num: '02',
    title: 'CodeAlpha Letter of Recommendation',
    issuer: 'CODEALPHA • CA/DF1/313372',
    period: 'NOV 2026',
    description: 'Official Letter of Recommendation from CodeAlpha recognizing analytical skill, adaptability, and high-productivity AI internship contributions.',
    image: lorCodeAlpha,
    pdf: '/certificates/codealpha-lor.pdf',
  },
  {
    num: '03',
    title: 'Fundamentals of Scientific Communication',
    issuer: 'SCIENTIFIC RESEARCH',
    period: '2026',
    description: 'Developed structured frameworks for communicating scientific research, empirical models, and complex technical datasets clearly.',
    image: certFundamentals,
  },
  {
    num: '04',
    title: 'Crafting Impactful CVs and Resumes',
    issuer: 'CAREER ARCHITECTURE',
    period: '2026',
    description: 'Mastered editorial hierarchy and narrative framing for engineering portfolios and technical career milestones.',
    image: certCVs,
  },
  {
    num: '05',
    title: 'AMD Certification',
    issuer: 'AMD ACADEMY',
    period: '2026',
    description: 'Achieved verified proficiency across modern compute systems, GPU architectures, and enterprise workflows certified by AMD.',
    image: certAMD,
  },
];

export const Experience = () => {
  const location = useLocation();
  const isStandalone = location.pathname === '/experience';
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={`${isStandalone ? 'pt-1 sm:pt-2 pb-16 bg-[#F9F9F8] min-h-screen' : 'py-12 md:py-20 bg-[#F9F9F8]'} relative z-10`}
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Outer Architectural Container */}
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden">
          {/* Top Editorial Kicker Bar */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4400]" />
              <span className="font-bold text-stone-950">
                {isStandalone ? 'CURRICULUM & CREDENTIALS' : '04 / CURRICULUM & PRACTICE'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">2024 — 2026</span>
              {!isStandalone && (
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-stone-300 bg-white hover:bg-black hover:text-white hover:border-black text-stone-900 font-bold transition-colors"
                >
                  <span>Certificates ({String(CERTIFICATES.length).padStart(2, '0')})</span>
                  <ArrowUpRight size={13} />
                </Link>
              )}
            </div>
          </div>

          {/* Title Band */}
          <div className="px-6 sm:px-10 py-10 md:py-14 border-b border-stone-200">
            <div className="max-w-3xl">
              {isStandalone ? (
                <h1 id="experience-heading" className="font-editorial text-[clamp(3rem,8vw,6.25rem)] font-normal tracking-tight text-stone-950 leading-[0.9] mb-4">
                  Experience &amp; <span className="italic font-serif font-light text-stone-400">Study.</span>
                </h1>
              ) : (
                <h2 id="experience-heading" className="font-editorial text-[clamp(2.5rem,6vw,5rem)] font-normal tracking-tight text-stone-950 leading-[0.9] mb-4">
                  My <span className="italic font-serif font-light text-stone-400">Experience.</span>
                </h2>
              )}
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Academic foundations in AI &amp; Data Science paired with hands-on freelance interface engineering.
              </p>
            </div>
          </div>

          {/* Split Curriculum Chambers: Education + Work Practice */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 bg-white">
            {/* Education Ledger */}
            <div className="lg:col-span-6 p-6 sm:p-10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950">
                  // 01 ACADEMIC TIMELINE
                </h3>
                <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">
                  EDUCATION
                </span>
              </div>

              <div className="divide-y divide-stone-200">
                {EDUCATION.map((item, i) => (
                  <motion.div
                    key={item.institution}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="py-6 first:pt-0 last:pb-0 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#FF4400]">
                        {item.num} / {item.period}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full border border-stone-200 bg-[#FAF9F7] font-mono text-[10px] font-bold tracking-wider text-stone-600 uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight mb-2 group-hover:text-[#FF4400] transition-colors font-sans">
                      {item.institution}
                    </h4>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Practice & Freelance Ledger */}
            <div className="lg:col-span-6 p-6 sm:p-10 bg-[#FAF9F7]/40">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950">
                  // 02 FIELD PRACTICE
                </h3>
                <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">
                  EXPERIENCE
                </span>
              </div>

              <div className="divide-y divide-stone-200">
                {WORK_EXPERIENCE.map((item, i) => (
                  <motion.div
                    key={item.role}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="py-6 first:pt-0 last:pb-0 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#FF4400]">
                        {item.num} / {item.period}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 font-mono text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                        ● {item.tag}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight mb-2 group-hover:text-[#FF4400] transition-colors font-sans">
                      {item.role}
                    </h4>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="p-5 rounded-2xl border border-stone-200 bg-white flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase mb-1">
                          PRIMARY DISCIPLINES
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-stone-800">
                          {item.disciplines}
                        </p>
                      </div>
                      {item.documents && item.documents.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {item.documents.map((doc) => (
                            <a
                              key={doc.href}
                              href={doc.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-[#FAF9F7] hover:bg-black hover:text-white hover:border-black text-xs font-mono font-bold tracking-wider uppercase text-stone-900 transition-colors"
                            >
                              <FileText size={13} />
                              <span>{doc.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <Link
                          to="/project"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase text-stone-900 hover:text-[#FF4400] transition-colors"
                        >
                          <span>View Works</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates Exhibition Grid (Standalone Experience Route) */}
          {isStandalone && (
            <div className="border-t border-stone-200 bg-[#FAF9F7]">
              <div className="px-6 sm:px-10 py-6 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-stone-400 uppercase mb-1">
                    03 / CREDENTIAL PLATE ARCHIVE
                  </p>
                  <h2 id="certificates-heading" className="font-editorial text-2xl sm:text-4xl font-normal text-stone-950">
                    Verified <span className="italic font-serif font-light text-stone-500">Certificates.</span>
                  </h2>
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-stone-500 uppercase">
                  CLICK ANY PLATE TO INSPECT
                </span>
              </div>

              <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
                {CERTIFICATES.map((cert, i) => (
                  <motion.article
                    key={cert.num}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group border border-stone-200 rounded-[1.75rem] bg-[#FAF9F7] overflow-hidden hover:border-stone-400 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="text-left w-full flex flex-col h-full cursor-pointer focus-visible:outline-none"
                    >
                      {/* Clean Framed Certificate Plate */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-stone-200 bg-stone-100">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-[10px] font-bold tracking-widest">
                            {cert.num}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <Eye size={14} />
                          </span>
                        </div>
                      </div>

                      {/* Metadata Ledger */}
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between gap-2 text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase mb-2">
                            <span>{cert.issuer}</span>
                            <span className="text-[#FF4400]">{cert.period}</span>
                          </div>
                          <h3 className="text-lg font-bold text-stone-950 group-hover:text-[#FF4400] transition-colors leading-snug mb-2 font-sans">
                            {cert.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                            {cert.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-5 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono font-bold tracking-widest uppercase text-stone-700">
                          <span className="inline-flex items-center gap-1.5">
                            <Award size={14} className="text-[#FF4400]" />
                            Verified Issue
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform">Inspect →</span>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Ledger Footer */}
          <div className="border-t border-stone-200 px-6 sm:px-10 py-4 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-widest text-stone-500 uppercase">
            <span>CONTINUOUS ACADEMIC &amp; CREATIVE EVOLUTION</span>
            <Link to="/project" className="text-stone-900 font-bold hover:text-[#FF4400] transition-colors">
              EXPLORE SHIPPED PROJECTS —→
            </Link>
          </div>
        </div>
      </div>

      {/* Native Accessible Lightbox Dialog for Certificates */}
      <ModalDialog
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        labelledBy="cert-modal-title"
      >
        {selectedCert && (
          <div className="bg-[#FAF9F7] border border-stone-300 rounded-[2rem] overflow-hidden shadow-2xl w-[min(92vw,56rem)] flex flex-col">
            <div className="px-6 py-4 border-b border-stone-200 bg-white flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono font-bold tracking-widest text-[#FF4400] uppercase">
                  {selectedCert.num} / {selectedCert.issuer} • {selectedCert.period}
                </p>
                <h1 id="cert-modal-title" className="text-base sm:text-lg font-bold text-stone-950 font-sans">
                  {selectedCert.title}
                </h1>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {selectedCert.pdf && (
                  <a
                    href={selectedCert.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black hover:bg-[#FF4400] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                  >
                    <FileText size={14} />
                    <span>Open PDF</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  autoFocus
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-black hover:text-white hover:border-black text-stone-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-stone-100 flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-w-full max-h-[68vh] object-contain rounded-xl border border-stone-200 shadow-md"
              />
            </div>
          </div>
        )}
      </ModalDialog>
    </section>
  );
};
