import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    let currentProgress = 0;

    const targetPauses = [25, 67, 98];
    let currentTargetIndex = 0;

    const incrementProgress = () => {
      if (cancelled) return;

      if (currentTargetIndex < targetPauses.length) {
        const target = targetPauses[currentTargetIndex];
        
        if (currentProgress < target) {
          // Increment progress towards the target (1% at a time)
          currentProgress += 1;
          if (currentProgress > target) {
             currentProgress = target;
          }
          setProgress(currentProgress);
          // Faster delay between ticks (25ms to 55ms)
          setTimeout(incrementProgress, Math.random() * 30 + 25);
        } else {
          // We hit a target percentage, pause here
          setProgress(target);
          currentTargetIndex++;
          
          if (target === 98) {
            // Longer pause at 98% (500ms to 1000ms)
            setTimeout(incrementProgress, Math.random() * 500 + 500);
          } else {
            // Shorter pause at 25% and 67% (150ms to 350ms)
            setTimeout(incrementProgress, Math.random() * 200 + 150);
          }
        }
      } else {
        // We've passed all pauses (we are at 98%), now go to 100%
        setTimeout(() => {
          if (cancelled) return;
          setProgress(100);
          
          // Wait a moment at 100% so the user can read it, then fade out
          setTimeout(() => {
            if (cancelled) return;
            setIsVisible(false);
            setTimeout(() => {
              if (!cancelled) onCompleteRef.current();
            }, 800);
          }, 600);
        }, Math.random() * 800 + 800); // Final dramatic longer pause at 98% before hitting 100%
      }
    };

    // Kick off the loading sequence
    setTimeout(incrementProgress, 100);

    return () => {
      cancelled = true;
    };
  }, []);

  const marqueeText = 'AI ENGINEER FULL STACK • ';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#E5E6EB] overflow-hidden"
        >
          {/* Huge Scrolling Background Text — pure CSS marquee, zero glitches */}
          <div className="loading-marquee-wrapper">
            <div className="loading-marquee">
              <span className="loading-marquee-text">{marqueeText}</span>
              <span className="loading-marquee-text">{marqueeText}</span>
              <span className="loading-marquee-text">{marqueeText}</span>
              <span className="loading-marquee-text">{marqueeText}</span>
            </div>
          </div>

          {/* Loading Pill */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Gradient Border Wrapper */}
            <div className="p-[1.5px] rounded-full bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 shadow-2xl">
              {/* Inner Pill */}
              <div className="bg-[#050505] rounded-full px-8 py-4 flex items-center gap-12 sm:gap-24 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-[0.2em]">
                  LOADING
                </span>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm font-mono tracking-wider w-8 text-right">
                    {progress}%
                  </span>
                  {/* Blinking Cursor */}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2.5 h-4 bg-gray-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
