'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services, type Service } from '../data/services';
import SectionHeader from './SectionHeader';
import { ANIMATION_DURATION, ANIMATION_EASE, THEME } from '../constants/animation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Props for ServiceCard component
 */
interface ServiceCardProps {
  service: Service;
  index: number;
}

/**
 * Individual service card - memoized for horizontal scroll performance
 */
const ServiceCard = React.memo<ServiceCardProps>(({ service, index }) => {
  return (
    <article
      className="shrink-0 w-[85vw] md:w-[450px] mr-8 md:mr-16 group"
      aria-label={`${service.title} service`}
    >
      <div className="relative aspect-4/5 bg-zinc-900 overflow-hidden rounded-sm mb-6">
        {/* Overlay effect */}
        <div 
          className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" 
          aria-hidden="true"
        />
        
        {/* Service video with lazy loading */}
        <video
          src={service.image}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 transform-gpu"
          // Improve performance by reducing memory usage
          preload="metadata"
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-20" 
          aria-hidden="true"
        />

        {/* Service info */}
        <div className="absolute inset-x-0 bottom-0 p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-accent text-xs font-mono mb-2 block tracking-widest uppercase">
            0{index + 1}
          </span>
          <h3 className="text-white text-3xl font-display uppercase tracking-tight">
            {service.title}
          </h3>
          {/* Add description on hover for better UX */}
          <p className="text-white/60 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body">
            {service.description}
          </p>
        </div>
      </div>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';

/**
 * Services Section Component
 * 
 * Displays services in a horizontal scrolling layout with theme transitions.
 * Optimized for smooth scroll performance with GPU-accelerated transforms.
 */
export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Set dark theme for services section
   */
  const setServiceTheme = useCallback(() => {
    gsap.to(document.documentElement, {
      '--app-bg': THEME.BG_DARK,
      '--app-text': THEME.TEXT_LIGHT,
      duration: ANIMATION_DURATION.SLOW,
      ease: ANIMATION_EASE.INOUT,
    });
  }, []);

  /**
   * Remove dark theme (restore light theme)
   */
  const removeServiceTheme = useCallback(() => {
    gsap.to(document.documentElement, {
      '--app-bg': '#eadcc9',
      '--app-text': THEME.TEXT_DARK,
      duration: ANIMATION_DURATION.SLOW,
      ease: ANIMATION_EASE.INOUT,
    });
  }, []);

  /**
   * Initialize horizontal scroll and theme animations
   */
  const initializeAnimations = useCallback(() => {
    const scrollContainer = scrollRef.current;
    const container = containerRef.current;
    if (!scrollContainer || !container) return null;

    return gsap.context(() => {
      const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

      // Theme transition trigger
      ScrollTrigger.create({
        trigger: container,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: setServiceTheme,
        onEnterBack: setServiceTheme,
        onLeaveBack: removeServiceTheme,
      });

      // Horizontal scroll animation with GPU optimization
      gsap.to(scrollContainer, {
        x: -totalWidth,
        ease: ANIMATION_EASE.NONE,
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          // Performance optimizations
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
    }, containerRef);
  }, [setServiceTheme, removeServiceTheme]);

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

  // Memoize rendered service cards
  const renderedServices = useMemo(
    () =>
      services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      )),
    []
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-12 md:py-16 outline-none"
      id="services"
      aria-label="Our services"
    >
      <SectionHeader
        title="Services"
        subtitle="Comprehensive design & development solutions for the modern age."
      />

      <div
        className="flex flex-row relative px-6 md:px-12 transform-gpu"
        ref={scrollRef}
        role="list"
        aria-label="Service offerings"
      >
        {renderedServices}
        {/* Spacer for end of scroll */}
        <div className="shrink-0 w-[10vw]" aria-hidden="true" />
      </div>
    </section>
  );
}
