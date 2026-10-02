import { useEffect, useRef } from 'react';
import baseImgSrc from '../assets/hero_images/image 2.png';
import overlayImgSrc from '../assets/hero_images/image 3.png';
import VariableProximity from '../components/effects/VariableProximity';

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Offscreen canvas to hold the brush mask trail (the splash effect)
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d', { alpha: true });
    if (!maskCtx) return;

    const baseImg = new Image();
    baseImg.src = baseImgSrc;

    const overlayImg = new Image();
    overlayImg.src = overlayImgSrc;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      maskCanvas.width = width;
      maskCanvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let lastMoveTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      lastMoveTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
      lastMoveTime = Date.now();
    };

    const handleMouseLeave = () => {
      lastMoveTime = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchend', handleMouseLeave);

    // Use base image dimensions for BOTH images so they align perfectly
    const getFitDimensions = (img: HTMLImageElement) => {
      if (!img.complete || !img.naturalWidth || !img.naturalHeight) return null;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      return { drawWidth, drawHeight, offsetX, offsetY };
    };

    let animationFrameId: number;

    const animate = () => {
      // 1. Fade out the brush trail over time, or clear completely if inactive
      if (Date.now() - lastMoveTime > 1500) {
        maskCtx.clearRect(0, 0, width, height);
      } else {
        maskCtx.globalCompositeOperation = 'destination-out';
        maskCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        maskCtx.fillRect(0, 0, width, height);
      }

      // 2. Instantly track the mouse
      const prevX = currentX;
      const prevY = currentY;
      currentX = mouseX;
      currentY = mouseY;

      const dist = Math.hypot(currentX - prevX, currentY - prevY);

      // 3. Draw the new brush stroke on the mask ONLY if moving
      if (dist > 0.2) {
        maskCtx.globalCompositeOperation = 'source-over';
        const radius = 200;
        const gradient = maskCtx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, radius
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        maskCtx.beginPath();
        maskCtx.arc(currentX, currentY, radius, 0, Math.PI * 2);
        maskCtx.fillStyle = gradient;
        maskCtx.fill();
      }

      // 4. Render the final composite to the screen
      ctx.clearRect(0, 0, width, height);

      // Get exact fit dimensions from the BASE image
      const dims = getFitDimensions(baseImg);

      if (!dims) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // A) Draw the overlay image first
      ctx.globalCompositeOperation = 'source-over';
      if (overlayImg.complete && overlayImg.naturalWidth > 0) {
        // Scale overlay 5% larger to push dark edges off-screen
        const scale = 1.05;
        const scaledW = dims.drawWidth * scale;
        const scaledH = dims.drawHeight * scale;
        const drawX = dims.offsetX - (scaledW - dims.drawWidth) / 2;
        const drawY = dims.offsetY - (scaledH - dims.drawHeight) / 2;

        // Clip to the base image bounds so edges don't bleed
        ctx.save();
        ctx.beginPath();
        ctx.rect(dims.offsetX, dims.offsetY, dims.drawWidth, dims.drawHeight);
        ctx.clip();
        ctx.drawImage(overlayImg, drawX, drawY, scaledW, scaledH);
        ctx.restore();
      }

      // B) Apply the mask using destination-in to keep only the hovered pixels of the overlay
      // This completely ignores the black RGB color of the mask, using only its alpha!
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(maskCanvas, 0, 0);

      // C) Draw the base image BEHIND everything
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(baseImg, dims.offsetX, dims.offsetY, dims.drawWidth, dims.drawHeight);

      // Reset
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-start justify-start overflow-hidden bg-white -mt-24 pt-24 cursor-crosshair select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-10"
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
            const ariaBtn = document.querySelector('[class*="fixed bottom-0 right-0"] button') as HTMLElement;
            if (ariaBtn) ariaBtn.click();
          }}
          className="pointer-events-auto mt-5 px-7 py-3 bg-black text-white font-bold text-base tracking-wide rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
        >
          Aria
        </button>
      </div>
    </section>
  );
};
