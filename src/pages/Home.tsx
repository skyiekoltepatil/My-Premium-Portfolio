import { useRef, useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import baseImgSrc from '../assets/hero_images/image 2.webp';
import overlayImgSrc from '../assets/hero_images/image 3.webp';
import VariableProximity from '../components/effects/VariableProximity';
import TopographicBackground from '../components/effects/TopographicBackground';
import LiquidMaskHover from '../components/effects/LiquidMaskHover';
import ScrollVelocity from '../components/effects/ScrollVelocity';
import { RainbowButton } from '../components/ui/RainbowButton';

export const Home = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Prevent touch scroll on iOS / Android mobile & tablet devices
      const preventTouchScroll = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('#aria-container') && !target.closest('button')) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', preventTouchScroll, { passive: false });
      return () => {
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
        document.removeEventListener('touchmove', preventTouchScroll);
      };
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
  }, [isScrollLocked]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col md:flex-row items-start justify-start overflow-hidden bg-white -mt-24 pt-24 cursor-default select-none"
    >
      <TopographicBackground />

      {/* Background Scrolling Text */}
      <div className="absolute top-[35vh] md:top-1/2 left-0 w-full -translate-y-1/2 z-[5] pointer-events-none">
        <ScrollVelocity
          texts={['SKYIE@ ✦ BHUSHAN KOLTE ✦ AI & DATA SCIENCE ✦ CREATIVE DEVELOPER ✦ ']} 
          velocity={50} 
          velocityMapping={{ input: [0, 1000], output: [0, 0] }}
          className="text-black/20"
        />
        <ScrollVelocity
          texts={['MACHINE LEARNING ✦ NEXT-GEN PORTFOLIO ✦ FRONT END DEVELOPER ✦ INNOVATION ✦ ']} 
          velocity={-50} 
          velocityMapping={{ input: [0, 1000], output: [0, 0] }}
          className="text-black/20"
        />
      </div>

      <LiquidMaskHover
        baseImage={baseImgSrc}
        hoverImage={overlayImgSrc}
        className="relative w-full h-[60svh] md:absolute md:top-0 md:left-0 md:h-full z-10"
      />

      {/* Lock Scroll Button - Mobile & Tablets */}
      <div className="absolute top-12 sm:top-14 right-4 sm:right-8 z-[60] pointer-events-auto min-[990px]:hidden">
        <button 
          onClick={() => setIsScrollLocked(!isScrollLocked)}
          className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 pr-1 py-1 rounded-full bg-[#18181b]/70 backdrop-blur-md hover:bg-black active:scale-[0.98] transition-all duration-200 shadow-[0_8px_25px_rgba(0,0,0,0.35)] border border-white/10 select-none group cursor-pointer"
          aria-label={isScrollLocked ? "Back to scroll" : "Tap to lock scroll"}
        >
          <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap">
            {isScrollLocked ? "BACK TO SCROLL" : "TAP TO LOCK"}
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] sm:rounded-[14px] bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
            {isScrollLocked ? (
              <Unlock className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-black" strokeWidth={2.4} />
            ) : (
              <Lock className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-black" strokeWidth={2.4} />
            )}
          </div>
        </button>
      </div>

      {/* Aria introduction text */}
      <div
        ref={textContainerRef}
        className="relative px-8 pb-12 mt-4 z-20 w-full pointer-events-none md:absolute md:left-12 md:bottom-8 md:w-[450px] md:max-w-[85vw]"
      >
        <div className="text-lg md:text-xl text-gray-800 leading-relaxed tracking-wide min-h-[120px]">
          <span className="text-2xl">✨</span>{' '}
          <VariableProximity
            label="Meet Aria, She's here to guide you through my portfolio. Chat with her to discover more about my technical skills, creative projects, and professional journey. Ask her anything!"
            className="text-gray-800"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={textContainerRef}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="mt-5 pointer-events-auto flex items-center gap-4">
          <RainbowButton
            onClick={() => {
              window.dispatchEvent(new Event('openAria'));
            }}
          >
            Aria
          </RainbowButton>
        </div>
      </div>
    </section>
  );
};
