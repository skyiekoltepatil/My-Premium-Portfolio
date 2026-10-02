import { useRef } from 'react';
import baseImgSrc from '../assets/hero_images/image 2.png';
import overlayImgSrc from '../assets/hero_images/image 3.png';
import VariableProximity from '../components/effects/VariableProximity';
import TopographicBackground from '../components/effects/TopographicBackground';
import LiquidMaskHover from '../components/effects/LiquidMaskHover';

export const Home = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex items-start justify-start overflow-hidden bg-white -mt-24 pt-24 cursor-crosshair select-none"
    >
      <TopographicBackground />
      <LiquidMaskHover
        baseImage={baseImgSrc}
        hoverImage={overlayImgSrc}
        className="absolute top-0 left-0 w-full h-full z-10"
      />
      {/* Aria introduction text - lower left */}
      <div
        ref={textContainerRef}
        className="absolute left-8 md:left-12 bottom-[10%] z-20 w-[450px] max-w-[85vw] pointer-events-none"
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
        <button
          onClick={() => {
            window.dispatchEvent(new Event('openAria'));
          }}
          className="pointer-events-auto mt-5 px-7 py-3 bg-black text-white font-bold text-base tracking-wide rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
        >
          Aria
        </button>
      </div>
    </section>
  );
};
