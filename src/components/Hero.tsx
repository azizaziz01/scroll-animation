import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_EASE, BREAKPOINTS } from '../constants/animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero statistics data
 */
const HERO_STATS = [
  { value: '18+', label: 'Years' },
  { value: '700+', label: 'Projects' },
  { value: '2', label: 'Days w/o incident' },
  { value: '0', label: 'Scrubs' },
] as const;

/**
 * Hero Component
 * 
 * Landing section with scroll-triggered image expansion animation.
 * Features responsive layout with pinned scroll effect.
 */
const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textTopRef = useRef<HTMLHeadingElement>(null);
  const textBottomRef = useRef<HTMLHeadingElement>(null);

  /**
   * Initialize hero animations with media query support
   */
  const initializeAnimations = useCallback(() => {
    if (
      !heroRef.current ||
      !containerRef.current ||
      !imageWrapperRef.current ||
      !textTopRef.current ||
      !textBottomRef.current
    ) {
      return null;
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: BREAKPOINTS.DESKTOP,
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        // Set initial GPU hints for smooth animation
        gsap.set(imageWrapperRef.current, { willChange: 'width, height, transform' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // Animate from responsive starting values to full screen
        tl.fromTo(
          imageWrapperRef.current,
          {
            width: isDesktop ? '24vw' : '70vw',
            height: isDesktop ? '60vh' : '45vh',
            rotation: -5,
          },
          {
            width: '100vw',
            height: '100vh',
            rotation: 0,
            scale: 1,
            ease: ANIMATION_EASE.INOUT,
            onComplete: () => {
              // Clean up will-change after animation
              gsap.set(imageWrapperRef.current, { willChange: 'auto' });
            },
          }
        );

        // Fade out text elements
        tl.to(
          [textTopRef.current, textBottomRef.current],
          {
            opacity: 0,
            scale: 0.8,
            ease: ANIMATION_EASE.INOUT,
          },
          '<'
        );

        return () => {};
      },
      heroRef
    );

    return mm;
  }, []);

  useEffect(() => {
    const mm = initializeAnimations();

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mm?.revert();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [initializeAnimations]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-bg-primary flex flex-col justify-between py-8"
      aria-label="Hero section"
    >
      {/* Top Heading */}
      <div className="w-full flex justify-center z-10">
        <h1
          ref={textTopRef}
          className="text-display md:mt-10 mt-20 text-[12vw] md:text-[6.5vw] leading-[0.8] font-bold text-[#232527] uppercase tracking-tighter text-center"
        >
          CLARITY FIRST
        </h1>
      </div>

      {/* Centered Image Container with decorative layers */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        {/* Decorative background layers */}
        <div
          className="flex items-center justify-center absolute -z-10 lg:h-[60vh] h-[45vh] lg:w-[24vw] w-[70vw]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#7B68EE] rotate-3 translate-x-4 translate-y-4 z-10" />
          <div className="absolute inset-0 bg-[#ee68d1] -rotate-6 translate-x-4 translate-y-4 z-10" />
        </div>

        {/* Main video container */}
        <div
          ref={imageWrapperRef}
          className="relative lg:w-[24vw] w-[70vw] lg:h-[60vh] h-[45vh] overflow-hidden -rotate-[5deg] transform-gpu"
        >
          <video
            src="/asstes/video/hero-vid.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Bottom Heading */}
      <div className="w-full flex justify-center z-10">
        <h1
          ref={textBottomRef}
          className="text-display pt-10 text-[12vw] -mt-28 md:text-[6.5vw] leading-[0.8] font-bold text-[#232527] uppercase tracking-tighter text-center"
        >
          IMPACT FOREVER
        </h1>
      </div>

      {/* Left Stats */}
      <aside
        className="absolute bottom-8 left-8 text-[#232527] text-sm font-medium z-10 hidden md:block"
        aria-label="Company statistics"
      >
        {HERO_STATS.map((stat) => (
          <p key={stat.label}>
            {stat.value} {stat.label}
          </p>
        ))}
      </aside>

      {/* Right Description */}
      <aside className="absolute bottom-8 right-8 text-[#232527] text-sm font-medium text-right max-w-xs z-10 hidden md:block">
        <p>
          AZIZ is a strategic design agency helping brands win new customers,
          engage users, and infuriate their competition.
        </p>
      </aside>
    </section>
  );
};

export default Hero;
