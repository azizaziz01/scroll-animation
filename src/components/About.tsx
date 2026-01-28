  import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Image reveal
      gsap.from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Content animation
      gsap.from('.about-content-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen flex items-center overflow-visible" id="about" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-4/5" ref={imageRef}>
              <div className="w-full h-full bg-linear-to-br from-bg-tertiary to-bg-secondary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(192, 57, 43, 0.4) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}></div>
                <span className="font-display text-8xl font-bold text-black/5 tracking-[0.2em]">AZIZ</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-48 h-48 bg-accent rounded-3xl opacity-10 -z-10"></div>
          </div>

          <div className="lg:pl-8" ref={contentRef}>
            <span className="about-content-item inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent uppercase tracking-widest mb-4">
              About Us
            </span>
            <h2 className="about-content-item text-display text-4xl md:text-5xl font-bold mb-6 text-[#232527]">
              We create digital experiences that <span className="text-gradient">matter</span>
            </h2>
            <p className="about-content-item text-[#232527]/70 leading-relaxed mb-6">
              Our team combines cutting-edge technology with artistic vision to craft 
              scroll-animated websites that leave lasting impressions. Every pixel, 
              every animation, every interaction is thoughtfully designed.
            </p>
            <p className="about-content-item text-[#232527]/70 leading-relaxed mb-10">
              We believe in the power of motion to tell stories. When done right, 
              animations guide users through your content, emphasize key moments, 
              and create emotional connections.
            </p>
            
            <div className="about-content-item flex gap-8 pt-8 border-t border-black/10">
              <div>
                <div className="font-display text-3xl font-bold text-accent">150+</div>
                <div className="text-xs text-[#232527]/50 uppercase tracking-widest">Projects</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-accent">98%</div>
                <div className="text-xs text-[#232527]/50 uppercase tracking-widest">Satisfaction</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-accent">5+</div>
                <div className="text-xs text-[#232527]/50 uppercase tracking-widest">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
