import React, { useEffect, useRef, useMemo, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLL_TRIGGER } from '../constants/animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for ScrollReveal component
 */
interface ScrollRevealProps {
  /** Content to render (string will be split into words) */
  children: ReactNode;
  /** Starting opacity for each word (0-1) */
  baseOpacity?: number;
  /** Additional classes for the text container */
  textClassName?: string;
}

/**
 * ScrollReveal Component
 * 
 * Reveals text word-by-word as the user scrolls.
 * Each word animates from baseOpacity to full opacity based on scroll position.
 * 
 * @example
 * <ScrollReveal baseOpacity={0.1}>
 *   This text will reveal word by word
 * </ScrollReveal>
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseOpacity = 0.1,
  textClassName = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll<HTMLSpanElement>('.word');
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      words.forEach((word) => {
        // Set GPU hint for smooth animation
        gsap.set(word, { willChange: 'opacity' });

        gsap.fromTo(
          word,
          { opacity: baseOpacity },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: word,
              start: 'top 80%',
              end: 'top 40%',
              scrub: SCROLL_TRIGGER.SCRUB_TIGHT,
              fastScrollEnd: true,
            },
            onComplete: () => {
              // Clean up will-change after animation
              gsap.set(word, { willChange: 'auto' });
            },
          }
        );
      });
    }, textRef);

    return () => ctx.revert();
  }, [baseOpacity]);

  /**
   * Split text into individual word spans for animation
   */
  const renderText = useMemo(() => {
    if (typeof children !== 'string') return children;

    return children.split(' ').map((word, index) => (
      <span
        key={`word-${index}-${word}`}
        className="word inline-block mr-[0.25em]"
        style={{ opacity: baseOpacity }}
      >
        {word}
      </span>
    ));
  }, [children, baseOpacity]);

  return (
    <div ref={textRef} className={textClassName} aria-label={typeof children === 'string' ? children : undefined}>
      {renderText}
    </div>
  );
};

export default ScrollReveal;
