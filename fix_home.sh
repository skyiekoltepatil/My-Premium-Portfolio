cat << 'INNER_EOF' > /Users/anakolte/Documents/GitHub/My-Premium-Portfolio/src/pages/Home.tsx
import { useEffect, useRef } from 'react';
import baseImgSrc from '../../assets/hero_images/image 2.png';
import overlayImgSrc from '../../assets/hero_images/image 3.png';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.src = baseImgSrc;

    const overlayImg = new Image();
    overlayImg.src = overlayImgSrc;

    let width = 0, height = 0;
    
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isHovering = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchend', handleMouseLeave);

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
    let maskRadius = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const dims = getFitDimensions(baseImg);
      if (!dims) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Smooth mouse interpolation
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      // Smooth radius interpolation based on hover state
      const targetRadius = isHovering ? 250 : 0;
      maskRadius += (targetRadius - maskRadius) * 0.1;

      // 1. Draw the overlay image (F1 Helmet) first
      if (overlayImg.complete && overlayImg.naturalWidth > 0) {
        const scale = 1;
        const scaledWidth = dims.drawWidth * scale;
        const scaledHeight = dims.drawHeight * scale;
        const drawX = dims.offsetX + (dims.drawWidth - scaledWidth) / 2;
        const drawY = dims.offsetY + (dims.drawHeight - scaledHeight) / 2;

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(overlayImg, drawX, drawY, scaledWidth, scaledHeight);
      }

      // 2. Apply the circular hover mask
      if (maskRadius > 1) {
        ctx.globalCompositeOperation = 'destination-in';
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, maskRadius);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(currentX, currentY, maskRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        // If radius is effectively 0, clear the overlay image completely
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw the base image (Guy) BEHIND the masked overlay
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
    </section>
  );
};

export default Home;
INNER_EOF
cp /Users/anakolte/Documents/GitHub/My-Premium-Portfolio/src/pages/Home.tsx /Users/anakolte/Documents/GitHub/My-Premium-Portfolio/src/mobile-ui-ux/pages/Home.tsx
