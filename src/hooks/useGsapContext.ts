import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for managing GSAP animation contexts with proper cleanup.
 * Provides a consistent pattern for scroll-triggered animations.
 * 
 * @param animationCallback - Function that sets up GSAP animations
 * @param dependencies - React dependencies array for re-running animations
 * @returns RefObject to attach to the animation scope element
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (ctx: gsap.Context) => void | (() => void),
  dependencies: React.DependencyList = []
) {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      animationCallback(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}

/**
 * Custom hook for scroll-triggered pinning animations with performance optimizations.
 * 
 * @param config - ScrollTrigger configuration options
 * @returns RefObject to attach to the trigger element
 */
export function useScrollPin<T extends HTMLElement = HTMLDivElement>(
  config: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    anticipatePin?: number;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) {
  const triggerRef = useRef<T>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: config.start || 'top top',
      end: config.end || '+=100%',
      pin: true,
      scrub: config.scrub ?? true,
      anticipatePin: config.anticipatePin ?? 1,
      invalidateOnRefresh: true,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
    });

    return () => {
      trigger.kill();
    };
  }, [config]);

  return triggerRef;
}

export default useGsapContext;
