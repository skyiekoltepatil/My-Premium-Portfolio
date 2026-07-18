import { motion, useScroll, useTransform } from 'framer-motion';
import workingGif from '../assets/workinggif.mp4';

export const Home = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start justify-start z-10 overflow-hidden -mt-24 pt-24"
    >
      {/* Background Video — fills the entire hero section */}
      <div className="absolute inset-0 z-0">
        <video
          src={workingGif}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle dark gradient so white text stays readable */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Main content on top */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl px-4 md:px-8 w-full text-left flex flex-col items-start mt-4 pointer-events-none"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1.05] mb-8 text-white drop-shadow-lg"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Creative
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient"
          >
            Web Engineer.
          </motion.span>
        </motion.h1>
      </motion.div>
    </section>
  );
};
