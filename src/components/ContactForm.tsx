import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { MagneticElement } from './effects/Shared';
import { saveMessageToDatabase } from '../services/contactDatabase';
import emailjs from '@emailjs/browser';

export const ContactForm: React.FC = () => {
  const formHeadingId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    setStatus('sending');

    try {
      await emailjs.send(
        'service_rqxuj9m',
        'template_psip91t',
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        },
        'N671lSh1SG6Loil1o'
      );

      await saveMessageToDatabase(formData);

      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
        <h3 id={formHeadingId} className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-950 font-sans">
          MESSAGE DISPATCH FORM
        </h3>
        <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase">
          DIRECT TO INBOX
        </span>
      </div>

      <form aria-labelledby={formHeadingId} className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor={nameId} className="text-xs font-mono font-bold tracking-wider uppercase text-stone-700">
              Full Name <span className="text-[#FF4400]" aria-hidden="true">*</span>
            </label>
            <input
              id={nameId}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Bhushan Kolte"
              autoComplete="name"
              required
              disabled={status === 'sending'}
              className="w-full min-h-[48px] px-4 py-3 bg-[#FAF9F7] border border-stone-300 rounded-xl outline-none focus:border-black transition-all text-base font-medium text-stone-900 placeholder:text-stone-400 disabled:opacity-70"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={emailId} className="text-xs font-mono font-bold tracking-wider uppercase text-stone-700">
              Email Address <span className="text-[#FF4400]" aria-hidden="true">*</span>
            </label>
            <input
              id={emailId}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              required
              disabled={status === 'sending'}
              className="w-full min-h-[48px] px-4 py-3 bg-[#FAF9F7] border border-stone-300 rounded-xl outline-none focus:border-black transition-all text-base font-medium text-stone-900 placeholder:text-stone-400 disabled:opacity-70"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={messageId} className="text-xs font-mono font-bold tracking-wider uppercase text-stone-700">
            Your Message <span className="text-[#FF4400]" aria-hidden="true">*</span>
          </label>
          <textarea
            id={messageId}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project, timeline, or collaboration..."
            rows={5}
            required
            disabled={status === 'sending'}
            className="w-full px-4 py-3.5 bg-[#FAF9F7] border border-stone-300 rounded-xl outline-none focus:border-black transition-all text-base font-medium text-stone-900 placeholder:text-stone-400 resize-y disabled:opacity-70"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div role="status" aria-live="polite" className="text-xs font-mono font-medium text-stone-500">
            {status === 'sent' && 'Message transmitted cleanly.'}
            {status === 'error' && 'Delivery failed. Please email bhushankolte20@gmail.com directly.'}
          </div>

          <MagneticElement>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`flex items-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-full transition-all duration-300 min-w-[210px] justify-center text-xs font-mono font-bold tracking-widest uppercase ${
                status === 'idle'
                  ? 'bg-black hover:bg-[#FF4400] text-white cursor-pointer shadow-sm hover:-translate-y-0.5'
                  : status === 'sending'
                  ? 'bg-stone-200 text-stone-700 cursor-wait'
                  : status === 'error'
                  ? 'bg-red-600 text-white cursor-default'
                  : 'bg-emerald-600 text-white cursor-default'
              }`}
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2.5"
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </motion.span>
                )}

                {status === 'sending' && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2.5"
                  >
                    <Loader2 size={15} className="animate-spin" />
                    <span>Sending...</span>
                  </motion.span>
                )}

                {status === 'sent' && (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={15} />
                    <span>Message Sent</span>
                  </motion.span>
                )}

                {status === 'error' && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2.5"
                  >
                    <XCircle size={15} />
                    <span>Failed to Send</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </MagneticElement>
        </div>
      </form>
    </div>
  );
};
