import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { ANIMATION_EASE, THEME } from '../constants/animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImageGrowSection Component
 * 
 * A scroll-triggered section featuring an expanding video with
 * a form card overlay animation. Includes theme transition from dark to light.
 */
const ImageGrowSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize scroll-triggered animations
   */
  const initializeAnimations = useCallback(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const formCard = formCardRef.current;

    if (!section || !container || !imageWrapper || !formCard) return null;

    return gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Set initial GPU hints
      gsap.set([imageWrapper, formCard], { willChange: 'transform, opacity' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
        onComplete: () => {
          // Clean up will-change after animation
          gsap.set([imageWrapper, formCard], { willChange: 'auto' });
        },
      });

      // Background color and theme variables transition
      tl.to(
        section,
        {
          backgroundColor: THEME.BG_PRIMARY,
          duration: 0.5,
        },
        0
      );

      tl.to(
        document.documentElement,
        {
          '--app-bg': THEME.BG_PRIMARY,
          '--app-text': THEME.TEXT_DARK,
          duration: 0.5,
          ease: ANIMATION_EASE.NONE,
        },
        0
      );

      // Image grow animation (first half of scroll)
      tl.fromTo(
        imageWrapper,
        {
          width: isMobile ? '85vw' : '40vw',
          height: isMobile ? '55vh' : '40vh',
          borderRadius: '2rem',
        },
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0rem',
          ease: ANIMATION_EASE.NONE,
          duration: 0.5,
        },
        0
      );

      // Form card slide in animation (second half of scroll)
      tl.fromTo(
        formCard,
        {
          y: '100%',
          opacity: 0,
          scale: 0.9,
        },
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          duration: 0.5,
        },
        '>'
      );
    }, sectionRef);
  }, []);

  useEffect(() => {
    const ctx = initializeAnimations();

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
      ctx?.revert();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [initializeAnimations]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden pinned-section"
      aria-label="Featured project showcase"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Expanding video container */}
        <div
          ref={imageWrapperRef}
          className="relative overflow-hidden z-10 transform-gpu"
          style={{ width: '85vw', height: '50vh' }}
        >
          <video
            src="https://stokt.b-cdn.net/Golf%20Ball%20Render%20V1.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          />

          {/* Subtle Overlay */}
          <div
            className="absolute inset-0 bg-black/40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h2 className="text-white text-3xl md:text-5xl font-display opacity-80 text-center px-6">
              <span className="uppercase tracking-[0.2em]">The Visionary</span>
              <br />
              <span className="text-sm md:text-xl font-body font-light">
                Digital Architecture
              </span>
            </h2>
          </div>
        </div>

        {/* Form Card Overlay */}
        <div
          ref={formCardRef}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-4 md:px-0"
          style={{ opacity: 0 }}
        >
          <article className="bg-accent p-8 md:p-16 max-w-2xl w-full mx-auto shadow-2xl pointer-events-auto rounded-3xl backdrop-blur-sm border border-white/5">
            {/* Featured Image */}
            <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-xl bg-black/20">
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Strategic planning session"
                className="w-full h-full object-cover mix-blend-overlay opacity-90"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Brand Name */}
            <p className="text-center text-[10px] md:text-xs tracking-[0.5em] uppercase text-zinc-950/40 mb-6 font-mono font-bold">
              AZIZ STUDIO / GLOBAL
            </p>

            {/* Main Heading */}
            <h3 className="text-center text-2xl md:text-4xl font-display text-white mb-6 leading-[1.1] uppercase tracking-tighter">
              Engineering Unparalleled
              <br />
              Digital Environments
            </h3>

            {/* Description */}
            <p className="text-center text-white/70 text-xs md:text-base leading-relaxed mb-10 font-light max-w-lg mx-auto">
              We specialize in high-performance digital architecture. From
              zero-latency interactions to immersive 3D interfaces, we build
              the technological foundations that allow modern brands to scale,
              engage, and dominate.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button label="Start Your Project" className="px-10 py-4" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ImageGrowSection;
