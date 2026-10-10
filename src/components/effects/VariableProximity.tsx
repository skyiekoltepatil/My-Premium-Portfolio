// @ts-nocheck
'use client';

import { forwardRef, useMemo, useRef, useEffect, useState } from 'react';
import './VariableProximity.css';

function useMousePositionRef(containerRef: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  const positionRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!enabled) return;

    const updatePosition = (clientX: number, clientY: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: clientX - rect.left, y: clientY - rect.top };
      } else {
        positionRef.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef, enabled]);

  return positionRef;
}

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const [isCapable, setIsCapable] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory <= 4;

    setIsCapable(!isTouch && !prefersReducedMotion && !isSmallScreen && !isLowMemory);
  }, []);

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterCentersRef = useRef<{ x: number; y: number }[]>([]);
  const activeIndicesRef = useRef(new Set<number>());
  const mousePositionRef = useMousePositionRef(containerRef, isCapable);
  const lastPositionRef = useRef({ x: -1000, y: -1000 });

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  // Pre-measure letter centers once and on resize (avoids layout thrashing during animation)
  useEffect(() => {
    if (!isCapable) return;

    const measureCenters = () => {
      if (!containerRef?.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      letterCentersRef.current = letterRefs.current.map(el => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top
        };
      });
    };

    // Small delay to ensure layout is complete
    const timeoutId = setTimeout(measureCenters, 100);
    window.addEventListener('resize', measureCenters, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureCenters);
    };
  }, [containerRef, isCapable, label]);

  // Frame loop with zero synchronous layout queries
  useEffect(() => {
    if (!isCapable) return;

    let rafId: number;

    const tick = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x !== x || lastPositionRef.current.y !== y) {
        lastPositionRef.current = { x, y };

        const centers = letterCentersRef.current;
        const letters = letterRefs.current;
        const newActive = new Set<number>();

        for (let i = 0; i < centers.length; i++) {
          const center = centers[i];
          const letterRef = letters[i];
          if (!letterRef || !center) continue;

          const distance = Math.hypot(x - center.x, y - center.y);
          if (distance < radius) {
            newActive.add(i);
            const falloffValue = calculateFalloff(distance);
            const newSettings = parsedSettings
              .map(({ axis, fromValue, toValue }) => {
                const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
                return `'${axis}' ${interpolatedValue}`;
              })
              .join(', ');
            letterRef.style.fontVariationSettings = newSettings;
          } else if (activeIndicesRef.current.has(i)) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings;
          }
        }

        activeIndicesRef.current = newActive;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isCapable, radius, parsedSettings, fromFontVariationSettings]);

  // For touch/low-end devices, render high-performance semantic markup
  if (!isCapable) {
    return (
      <span
        ref={ref}
        className={`${className} variable-proximity`}
        onClick={onClick}
        style={{ display: 'inline', ...style }}
        {...restProps}
      >
        {label}
      </span>
    );
  }

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings,
                  willChange: 'font-variation-settings'
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
