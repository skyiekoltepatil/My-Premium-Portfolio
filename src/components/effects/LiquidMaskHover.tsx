import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    vUv.y = 1.0 - vUv.y;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  
  uniform sampler2D uBaseTexture;
  uniform sampler2D uHoverTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uIsMobile;
  
  // Simplex noise function
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float canvasAspect = uResolution.x / uResolution.y;
    float imgAspect = uImageResolution.x / uImageResolution.y;
    vec2 uv = vUv;
    
    vec2 scale = vec2(1.0);
    vec2 offset = vec2(0.0);
    
    // object-fit: contain logic for UV mapping
    if (canvasAspect > imgAspect) {
      float targetWidth = uResolution.y * imgAspect;
      scale.x = uResolution.x / targetWidth;
      offset.x = (1.0 - scale.x) * 0.5;
    } else {
      float targetHeight = uResolution.x / imgAspect;
      scale.y = uResolution.y / targetHeight;
      offset.y = (1.0 - scale.y) * 0.5;
    }
    
    vec2 imgUv = uv * scale + offset;
    
    if (imgUv.x < 0.0 || imgUv.x > 1.0 || imgUv.y < 0.0 || imgUv.y > 1.0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec2 st = vUv;
    st.x *= canvasAspect;
    vec2 m = uMouse;
    m.x *= canvasAspect;

    float dist = distance(st, m);
    
    // Liquid noise radius
    float n = snoise(st * 4.0 + uTime * 0.4);
    // Base radius
    float baseRadius = 0.2;
    float radius = baseRadius + n * 0.06;
    
    float mouseMask = 1.0 - smoothstep(radius * 0.5, radius, dist);
    
    // Autonomous wandering hover influence
    vec2 wanderPos = vec2(
      snoise(vec2(uTime * 0.2, 0.0)) * 0.5 + 0.5,
      snoise(vec2(0.0, uTime * 0.2)) * 0.5 + 0.5
    ) * vec2(canvasAspect, 1.0);
    
    float wanderDist = distance(st, wanderPos);
    float wanderMask = 1.0 - smoothstep(radius * 0.5, radius, wanderDist);
    
    // Disable wander mask on mobile
    float activeWander = mix(wanderMask * 0.7, 0.0, uIsMobile);
    float mask = max(mouseMask, activeWander);
    
    // Smooth, simple scale reveal without inner displacement
    vec2 scaledHoverUv = (imgUv - 0.5) * (1.0 / 1.05) + 0.5;
    
    vec4 baseColor = texture2D(uBaseTexture, imgUv);
    vec4 hoverColor = texture2D(uHoverTexture, scaledHoverUv);
    
    vec4 finalColor = mix(baseColor, hoverColor, mask * hoverColor.a);
    
    gl_FragColor = vec4(finalColor.rgb, finalColor.a);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface LiquidMaskHoverProps {
  baseImage: string;
  hoverImage: string;
  className?: string;
}

export const LiquidMaskHover: React.FC<LiquidMaskHoverProps> = ({
  baseImage,
  hoverImage,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uImageResolution = gl.getUniformLocation(program, 'uImageResolution');
    const uIsMobile = gl.getUniformLocation(program, 'uIsMobile');
    const uBaseTexture = gl.getUniformLocation(program, 'uBaseTexture');
    const uHoverTexture = gl.getUniformLocation(program, 'uHoverTexture');

    let animationFrameId: number;
    let isRunning = false;
    let isIntersecting = true;
    let startTime = Date.now();
    let currentMouseX = -10.0;
    let currentMouseY = -10.0;
    let targetMouseX = -10.0;
    let targetMouseY = -10.0;
    let isMobile = window.innerWidth <= 768;
    const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let baseTexture: WebGLTexture | null = null;
    let hoverTexture: WebGLTexture | null = null;
    
    // Texture loading
    const loadTexture = (url: string, index: number) => {
      const texture = gl.createTexture();
      if (index === 0) baseTexture = texture;
      else hoverTexture = texture;

      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // Placeholder while loading
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
      
      const image = new Image();
      image.src = url;
      return new Promise<HTMLImageElement>((resolve, reject) => {
        image.onload = () => {
          gl.activeTexture(gl.TEXTURE0 + index);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          resolve(image);
        };
        image.onerror = (err) => {
          console.error("Failed to load texture:", url, err);
          reject(err);
        };
      });
    };

    let baseImgRes = { width: 1, height: 1 };
    
    Promise.all([
      loadTexture(baseImage, 0),
      loadTexture(hoverImage, 1)
    ]).then(([baseImg]) => {
      baseImgRes.width = baseImg.naturalWidth;
      baseImgRes.height = baseImg.naturalHeight;
    });

    const resize = () => {
      isMobile = window.innerWidth <= 768;
      // Cap DPR to 1 on mobile/low-memory, and 1.5 on high-end desktop to prevent GPU strain
      const maxDpr = isMobile || isLowMemory ? 1.0 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.round(container.clientWidth * dpr);
      canvas.height = Math.round(container.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    };
    
    const handleMouseLeave = () => {
      targetMouseX = -10.0;
      targetMouseY = -10.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        targetMouseX = (touch.clientX - rect.left) / rect.width;
        targetMouseY = (touch.clientY - rect.top) / rect.height;
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('touchstart', handleTouchMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleMouseLeave, { passive: true });

    // Blending setup for transparent background
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const render = () => {
      if (!isIntersecting || document.hidden) {
        isRunning = false;
        return;
      }

      const time = (Date.now() - startTime) * 0.001;
      
      // Interpolate mouse for smooth inertia
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uTime, prefersReducedMotion ? 0 : time);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uImageResolution, baseImgRes.width, baseImgRes.height);
      gl.uniform1f(uIsMobile, isMobile || prefersReducedMotion ? 1.0 : 0.0);
      
      gl.uniform1i(uBaseTexture, 0);
      gl.uniform1i(uHoverTexture, 1);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning && isIntersecting && !document.hidden) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    // Pause rendering when off-screen to save 100% of GPU/CPU when scrolled
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) startLoop();
      else stopLoop();
    }, { threshold: 0.05 });

    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleMouseLeave);

      // Clean up WebGL resources to prevent memory leaks on 3-4 GB RAM devices
      if (baseTexture) gl.deleteTexture(baseTexture);
      if (hoverTexture) gl.deleteTexture(hoverTexture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [baseImage, hoverImage]);

  return (
    <div ref={containerRef} className={className || "relative w-full h-full"}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      />
    </div>
  );
};

export default LiquidMaskHover;
