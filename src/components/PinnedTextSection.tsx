import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../data/works';

gsap.registerPlugin(ScrollTrigger);

// Size classes for each depth layer
const DEPTH_STYLES = {
  near: {
    size: 'w-[200px] h-[300px] md:w-[350px] md:h-[500px] lg:w-[320px] lg:h-[480px]',
    opacity: 'opacity-100',
    blur: '',
    zIndex: 'z-30',
  },
  mid: {
    size: 'w-[160px] h-[240px] md:w-[280px] md:h-[400px] lg:w-[250px] lg:h-[380px]',
    opacity: 'opacity-90',
    blur: '',
    zIndex: 'z-20',
  },
  far: {
    size: 'w-[100px] h-[150px] md:w-[180px] md:h-[270px] lg:w-[160px] lg:h-[240px]',
    opacity: 'opacity-60',
    blur: 'blur-[1px]',
    zIndex: 'z-10',
  },
};

const PinnedTextSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imagesRef.current) return;

    const imageElements = imagesRef.current.querySelectorAll<HTMLElement>('.scroll-image');
    
    gsap.set(imageElements, { force3D: true, willChange: 'transform' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      imageElements.forEach((img, index) => {
        const speed = IMAGES[index]?.speed || 0.3;
        // Make all images start from the bottom (positive y) and move up (negative y)
        // Add an extra offset to ensure the text is visible first
        const yStart = 1000 * speed + 200; 
        const yEnd = -600 * speed;
        
        tl.fromTo(img, { y: yStart }, { y: yEnd, ease: 'none' }, 0);
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.set(imageElements, { willChange: 'auto' });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative mt-0 min-h-[150vh] md:min-h-[340vh]"
      style={{ contain: 'paint layout' }}
    >
      {/* Sticky Text */}
      <div className="sticky top-0 z-40 h-screen flex items-center justify-center pointer-events-none">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-semibold tracking-tighter uppercase">
          All Work
        </h2>
      </div>

      {/* Parallax Images with Depth */}
      <div ref={imagesRef} className="absolute inset-0 pointer-events-none" style={{ contain: 'strict' }}>
        {IMAGES.map((image, index) => {
          const depthStyle = DEPTH_STYLES[image.depth];
          
          return (
            <div
              key={index}
              className={`scroll-image absolute ${image.position} ${depthStyle.zIndex} group rounded-lg overflow-hidden ${depthStyle.size} ${depthStyle.opacity} ${image.shadow || ''}`}
            >
              <img
                src={image.url}
                alt={image.title}
                className={`w-full h-full object-cover ${depthStyle.blur} transition-transform duration-700 group-hover:scale-110`}
                loading="lazy"
                decoding="async"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-100 transition-opacity duration-500" />
              
              {/* Title */}
              <h3 
                className={`absolute z-40 bottom-4 left-4 font-display font-medium tracking-widest uppercase text-white 
                translate-y-0 opacity-100 transition-all duration-500
                ${image.depth === 'far' ? 'text-[10px]' : 'text-xs md:text-sm'}`}
              >
                {image.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PinnedTextSection;