import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollStack.css';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  index?: number;
  totalCards?: number;
  scrollYProgress?: any;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ 
  children, 
  itemClassName = '', 
  index = 0,
  totalCards = 1,
  scrollYProgress
}) => {
  // Card starts scaling exactly when it reaches its sticky position
  // which roughly correlates to index / totalCards in the container's scroll progress
  const startProgress = index / totalCards;
  
  // Each card scales down a bit more than the one above it
  const finalScale = 1 - ((totalCards - 1 - index) * 0.05);
  const finalBlur = (totalCards - 1 - index) * 2;
  
  const scale = useTransform(
    scrollYProgress,
    [startProgress, 1],
    [1, finalScale]
  );
  
  const blurValue = useTransform(
    scrollYProgress,
    [startProgress, 1],
    [0, finalBlur]
  );
  
  const filter = useTransform(blurValue, v => `blur(${v}px)`);

  return (
    <motion.div 
      className={`scroll-stack-card ${itemClassName}`.trim()}
      style={{
        position: 'sticky',
        top: `calc(15vh + ${index * 25}px)`,
        scale,
        filter,
        zIndex: index + 10,
        transformOrigin: "top center"
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  // Kept for backward compatibility to prevent crashes if props are still passed
  useWindowScroll?: boolean;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  baseScale?: number;
  blurAmount?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire container seamlessly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15vh", "end 90vh"] // Start when top hits 15vh, end when bottom hits 90vh
  });

  const count = React.Children.count(children);

  return (
    <div ref={containerRef} className={`scroll-stack-container ${className}`.trim()}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            index,
            totalCards: count,
            scrollYProgress
          });
        }
        return child;
      })}
    </div>
  );
};

export default ScrollStack;
