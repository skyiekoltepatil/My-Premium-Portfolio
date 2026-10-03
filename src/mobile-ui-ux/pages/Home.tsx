import { useRef, useState, useEffect } from 'react';
import baseImgSrc from '../assets/hero_images/image 2.png';
import overlayImgSrc from '../assets/hero_images/image 3.png';
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
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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

      {/* Lock Scroll Button - Mobile Only Top Right */}
      <button 
        onClick={() => setIsScrollLocked(!isScrollLocked)}
        className="md:hidden absolute top-12 right-4 z-[60] px-4 py-2 rounded-full border border-black/20 text-sm font-medium transition-colors hover:bg-black/5 flex items-center gap-2 bg-white/70 backdrop-blur-md pointer-events-auto shadow-sm"
      >
        {isScrollLocked ? (
          <>
            <span>🔒</span> Locked
          </>
        ) : (
          <>
            <span>🔓</span> Lock Scroll
          </>
        )}
      </button>

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
