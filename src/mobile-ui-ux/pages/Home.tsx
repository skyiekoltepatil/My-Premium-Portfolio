import { useRef } from 'react';
import baseImgSrc from '../assets/hero_images/image 2.png';
import overlayImgSrc from '../assets/hero_images/image 3.png';
import VariableProximity from '../components/effects/VariableProximity';
import TopographicBackground from '../components/effects/TopographicBackground';
import LiquidMaskHover from '../components/effects/LiquidMaskHover';
import ScrollVelocity from '../components/effects/ScrollVelocity';
import { RainbowButton } from '../components/ui/RainbowButton';

export const Home = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex items-start justify-start overflow-hidden bg-white -mt-24 pt-24 cursor-default select-none"
    >
      <TopographicBackground />
      
      {/* Background Scrolling Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[5] pointer-events-none">
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
        className="absolute top-0 left-0 w-full h-full z-10"
      />
      {/* Aria introduction text - lower left */}
      <div
        ref={textContainerRef}
        className="absolute left-8 md:left-12 bottom-[15%] z-20 w-[450px] max-w-[85vw] pointer-events-none"
        style={{ position: 'absolute' }}
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
        <div className="mt-5 pointer-events-auto">
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
