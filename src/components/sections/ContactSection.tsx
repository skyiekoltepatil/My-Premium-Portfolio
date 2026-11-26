import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('bhushankolte20@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact-section" aria-labelledby="home-contact-heading" className="py-12 md:py-20 bg-[#F9F9F8] relative z-10">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm"
        >
          {/* Kicker Strip */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <span className="font-bold text-stone-950">05 / DIRECT INQUIRY</span>
            <span className="flex items-center gap-2 font-semibold text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              TYPICALLY REPLIES WITHIN 24H
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Statement */}
            <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 bg-white border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between gap-8">
              <div>
                <h2 id="home-contact-heading" className="font-editorial text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal tracking-tight text-stone-950 leading-[0.94] mb-5">
                  Get in <span className="italic font-serif font-light text-stone-500">Touch.</span>
                </h2>
                <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-md">
                  Available for freelance web engineering, creative direction, and product collaborations. Let&apos;s build something focused and memorable.
                </p>
              </div>

              <div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-black hover:bg-[#FF4400] text-white text-xs font-mono font-bold tracking-widest uppercase transition-all min-h-[44px] group"
                >
                  <span>Open Contact Form &amp; Studio</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Contact Ledger Rows */}
            <div className="lg:col-span-6 divide-y divide-stone-200 bg-[#FAF9F7] flex flex-col justify-center">
              <div className="relative p-6 sm:p-10 flex items-center justify-between gap-4 hover:bg-white transition-colors group">
                <a
                  href="mailto:bhushankolte20@gmail.com"
                  className="flex items-center gap-5 min-w-0 flex-1 after:content-[''] after:absolute after:inset-0"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-[#FF4400] group-hover:text-[#FF4400] transition-colors">
                    <Mail size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-stone-400 uppercase mb-1">
                      ELECTRONIC MAIL
                    </p>
                    <p className="text-base sm:text-lg font-bold text-stone-900 truncate group-hover:text-[#FF4400] transition-colors">
                      bhushankolte20@gmail.com
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="relative z-10 px-4 py-2 rounded-full border border-stone-300 bg-white hover:border-black text-xs font-mono font-bold uppercase tracking-wider text-stone-700 hover:text-black transition-colors shrink-0 inline-flex items-center gap-1.5 min-h-[40px] cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a
                href="tel:+918421361302"
                className="p-6 sm:p-10 flex items-center justify-between gap-4 hover:bg-white transition-colors group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-[#FF4400] group-hover:text-[#FF4400] transition-colors">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-stone-400 uppercase mb-1">
                      DIRECT LINE (IST)
                    </p>
                    <p className="text-base sm:text-lg font-bold text-stone-900 tabular-nums group-hover:text-[#FF4400] transition-colors">
                      +91 8421361302
                    </p>
                  </div>
                </div>

                <span className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                  <ArrowUpRight size={16} />
                </span>
              </a>

              <div aria-live="polite" className="visually-hidden">
                {copied ? 'Email address copied to clipboard.' : ''}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
