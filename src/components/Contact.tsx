import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Calendar } from 'lucide-react';
import Button from './Button';
import { ANIMATION_DURATION, ANIMATION_EASE } from '../constants/animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Heading text parts for split animation
 */
interface HeadingPart {
  text: string;
  className?: string;
  isAccent?: boolean;
}

const HEADING_PARTS: HeadingPart[] = [
  { text: "LET'S" },
  { text: 'START', isAccent: true },
  { text: 'A PROJECT' },
];

/**
 * Contact buttons configuration
 */
const CONTACT_BUTTONS = [
  {
    id: 'talk',
    label: 'Talk with us',
    icon: Mail,
    variant: 'dark' as const,
  },
  {
    id: 'book',
    label: 'Book a call',
    icon: Calendar,
    variant: 'light' as const,
  },
] as const;

/**
 * Contact Section Component
 * 
 * Call-to-action section with animated headings and contact options.
 * Features dynamic background blobs and character-reveal animations.
 */
const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize scroll-triggered animations
   */
  const initializeAnimations = useCallback(() => {
    if (!sectionRef.current) return null;

    return gsap.context(() => {
      // Background blobs floating animation
      gsap.to('.bg-blob', {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 1,
          from: 'random',
        },
      });

      // Character-like reveal for heading parts
      const headingParts = document.querySelectorAll('.heading-part');
      gsap.from(headingParts, {
        y: 100,
        opacity: 0,
        rotateX: -45,
        stagger: 0.15,
        duration: ANIMATION_DURATION.EXTENDED,
        ease: ANIMATION_EASE.EXPO_OUT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          fastScrollEnd: true,
        },
      });

      // Buttons reveal animation
      gsap.from('.btn-reveal', {
        y: 30,
        opacity: 0,
        duration: ANIMATION_DURATION.SLOW,
        delay: 0.5,
        ease: ANIMATION_EASE.OUT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);
  }, []);

  useEffect(() => {
    const ctx = initializeAnimations();
    return () => ctx?.revert();
  }, [initializeAnimations]);

  // Memoize heading parts render
  const renderedHeading = useMemo(
    () =>
      HEADING_PARTS.map((part, index) => (
        <React.Fragment key={part.text}>
          <div className="overflow-hidden inline-block">
            <span
              className={`heading-part inline-block ${
                part.isAccent ? 'text-accent' : ''
              }`}
            >
              {part.text}
            </span>
          </div>
          {index === 0 && <br />}
        </React.Fragment>
      )),
    []
  );

  // Memoize buttons render
  const renderedButtons = useMemo(
    () =>
      CONTACT_BUTTONS.map(({ id, label, icon: Icon, variant }) => (
        <Button
          key={id}
          label={label}
          icon={<Icon size={20} aria-hidden="true" />}
          variant={variant}
          className="w-full sm:w-auto px-10 py-5 text-[15px]"
        />
      )),
    []
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden"
      aria-label="Contact us"
    >
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
        <div className="bg-blob absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] will-change-transform" />
        <div className="bg-blob absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-dark/15 rounded-full blur-[140px] will-change-transform" />
        <div className="bg-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-bg-primary/30 rounded-full blur-[100px] will-change-transform" />
      </div>

      <div
        ref={containerRef}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          {/* Pre-heading label */}
          <span className="inline-block text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-8 btn-reveal">
            Project in mind?
          </span>

          {/* Main heading with character reveal */}
          <h2
            className="font-extrabold tracking-tight text-zinc-950 perspective-1000 text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02]"
          >
            {renderedHeading}
          </h2>

          {/* CTA Buttons */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 btn-reveal"
            role="group"
            aria-label="Contact options"
          >
            {renderedButtons}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
