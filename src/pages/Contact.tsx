import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, MapPin, Copy, Check } from 'lucide-react';
import { Mascot } from 'page-mascot';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('bhushankolte20@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const GithubIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );

  const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  return (
    <div id="contact" className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans pb-16 pt-1 sm:pt-2 relative">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Outer Architectural Container */}
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden">
          {/* Top Kicker Strip */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-stone-950">CONTACT STUDIO</span>
              <span className="text-stone-300">/</span>
              <span className="font-semibold">18.5204° N, 73.8567° E</span>
            </div>
            <span className="font-semibold text-stone-700">AVAILABLE FOR SELECT WORK</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200"
          >
            {/* Left Sidebar Profile Card (Preserves Mascot inside Blue Container) */}
            <aside className="lg:col-span-4 p-6 sm:p-10 bg-white flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                {/* Signature Blue Container Mascot */}
                <div className="w-32 h-32 bg-blue-100 rounded-3xl mb-5 flex items-center justify-center shadow-inner border border-blue-200 overflow-hidden">
                  <Mascot
                    directions="/mascots/cap-directions.webp"
                    reactions="/mascots/cap-reactions.webp"
                    size={185}
                    className="translate-y-[18px]"
                  />
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight mb-2">
                  Bhushan Kolte
                </h1>
                <span className="px-3.5 py-1 rounded-full bg-[#FAF9F7] border border-stone-200 text-stone-700 font-mono text-[11px] font-bold tracking-widest uppercase">
                  Creative Developer
                </span>
              </div>

              <div className="divide-y divide-stone-200 border-y border-stone-200">
                <div className="relative py-4 flex items-center justify-between gap-3 group">
                  <a href="mailto:bhushankolte20@gmail.com" className="flex items-center gap-3.5 min-w-0 flex-1 after:content-[''] after:absolute after:inset-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-[#FF4400] group-hover:text-[#FF4400] transition-colors">
                      <Mail size={17} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">EMAIL</p>
                      <p className="text-sm font-semibold text-stone-800 truncate group-hover:text-[#FF4400] transition-colors">
                        bhushankolte20@gmail.com
                      </p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="relative z-10 p-2 rounded-lg border border-stone-200 hover:border-black text-stone-600 hover:text-black transition-colors shrink-0 cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                </div>

                <a href="tel:+918421361302" className="py-4 flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-[#FF4400] group-hover:text-[#FF4400] transition-colors">
                    <Phone size={17} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">PHONE</p>
                    <p className="text-sm font-semibold text-stone-800 tabular-nums group-hover:text-[#FF4400] transition-colors">
                      +91 8421361302
                    </p>
                  </div>
                </a>

                <div className="py-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] border border-stone-200 flex items-center justify-center shrink-0 text-stone-500">
                    <Calendar size={17} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">BIRTHDAY</p>
                    <p className="text-sm font-semibold text-stone-800">13 February 2008</p>
                  </div>
                </div>

                <div className="py-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] border border-stone-200 flex items-center justify-center shrink-0 text-stone-500">
                    <MapPin size={17} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">LOCATION</p>
                    <p className="text-sm font-semibold text-stone-800 leading-tight">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">
                  SOCIAL CHANNELS
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/skyiekoltepatil"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile"
                    className="w-10 h-10 rounded-full border border-stone-200 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-stone-700 transition-colors"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bhushan-kolte-458561380/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-10 h-10 rounded-full border border-stone-200 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-stone-700 transition-colors"
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Workspace: Map Viewport + Semantic Form */}
            <div className="lg:col-span-8 p-6 sm:p-10 bg-[#FAF9F7] space-y-10">
              <div>
                <p className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4400] uppercase mb-2">
                  // DISPATCH INQUIRY
                </p>
                <h2 className="font-editorial text-[clamp(2.25rem,5vw,4rem)] font-normal text-stone-950 tracking-tight leading-[0.95]">
                  Start a <span className="italic font-serif font-light text-stone-500">Conversation.</span>
                </h2>
              </div>

              {/* Architectural Map Frame */}
              <div className="rounded-[1.75rem] overflow-hidden border border-stone-200 bg-white shadow-2xs">
                <div className="px-4 py-2.5 border-b border-stone-200 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase text-stone-500">
                  <span>BASE STUDIO — PUNE, MAHARASHTRA</span>
                  <span>INDIA</span>
                </div>
                <div className="w-full h-[220px] sm:h-[280px] bg-stone-100">
                  <iframe
                    title="Map showing studio location in Pune, Maharashtra, India"
                    src="https://maps.google.com/maps?q=Pune,+Maharashtra&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter contrast-[0.95] grayscale-[20%]"
                  />
                </div>
              </div>

              {/* Form Chamber */}
              <div className="bg-white border border-stone-200 rounded-[1.75rem] p-6 sm:p-8 shadow-2xs">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
