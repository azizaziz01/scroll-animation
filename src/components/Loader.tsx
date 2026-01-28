import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to('.loader-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.05,
        delay: 0.1
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loader-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="loader-line" />
      ))}
    </div>
  );
};

export default Loader;
