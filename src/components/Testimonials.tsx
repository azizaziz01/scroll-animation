import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';

import SectionHeader from './SectionHeader';
import Avatar from './Avatar';
import { ANIMATION_DURATION, ANIMATION_EASE, STAGGER } from '../constants/animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Testimonial data structure
 */
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

/**
 * Testimonials data - extracted for maintainability
 * In production, this could come from a CMS or API
 */
const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "Jay's the real deal. Not only a Framer pro, but he truly cares—bringing ideas, polish, and extra miles we didn't even ask for. On Lorikeet, he turned loose homepage hero concepts into a live staging link in just a day, completely reshaping what we thought was possible. Creative, proactive, and lightning-fast with QA, he delivers unique animations, smart solutions, and clear comms. Funny, honest, and a joy to work with—we can't wait for the next project.",
    author: 'Dinesh Dave',
    role: 'CO-FOUNDER & CREATIVE DIRECTOR',
    company: 'WORK IS PLAY',
    avatar: '',
  },
  {
    id: 'testimonial-2',
    quote: "Jay is a one-of-a-kind creative mind (in the best way possible!). He's always coming up with mind-blowing ideas, and I've had the pleasure of working with him on various projects over the years. Jay consistently delivers exceptional results and never underperforms. I would highly recommend him for your next project—he's essentially a Swiss Army knife of content creation.",
    author: 'Max Trudel',
    role: 'DIRECTOR / DOP',
    company: 'SIDE HIT FILMS',
    avatar: '',
  },
  {
    id: 'testimonial-3',
    quote: "The man's a chameleon, minus the clichés. While many designers get stuck in a 'house style' (which can be as polarizing as pineapple on pizza), Jay's versatility is his superpower. Over the years working with Boombox, he's proven time and time again that no creative challenge is too big, too niche, or too wild. From 2D animations to 3D renders and even web design, Jay's range is nothing short of extraordinary.",
    author: 'Tj Walker',
    role: 'HEAD OF PRODUCTION',
    company: 'BOOMBOX',
    avatar: '',
  },
  {
    id: 'testimonial-4',
    quote: "Working with Jay was an absolute pleasure. He has a masterful understanding of design and what it takes to create stunning visuals. He was able to reimagine our brand identity and build a brand new website from scratch. I highly recommend him to any startup or business owner who wants to build an unforgettable brand.",
    author: 'Charles Lacasse',
    role: 'FOUNDER',
    company: 'WE SCALE IT',
    avatar: '',
  },
  {
    id: 'testimonial-5',
    quote: "The man's a chameleon, minus the clichés. While many designers get stuck in a 'house style' (which can be as polarizing as pineapple on pizza), Jay's versatility is his superpower. Over the years working with Boombox, he's proven time and time again that no creative challenge is too big, too niche, or too wild. From 2D animations to 3D renders and even web design, Jay's range is nothing short of extraordinary.",
    author: 'Tj Walker',
    role: 'HEAD OF PRODUCTION',
    company: 'BOOMBOX',
    avatar: '',
  },
  {
    id: 'testimonial-6',
    quote: "Working with Jay was an absolute pleasure. He has a masterful understanding of design and what it takes to create stunning visuals. He was able to reimagine our brand identity and build a brand new website from scratch. I highly recommend him to any startup or business owner who wants to build an unforgettable brand.",
    author: 'Charles Lacasse',
    role: 'FOUNDER',
    company: 'WE SCALE IT',
    avatar: '',
  },
];

/**
 * Quote icon component - extracted for reusability
 */
const QuoteIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 40 40" 
    fill="none" 
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M10 20H4C4 13.37 9.37 8 16 8V11C11.03 11 7 15.03 7 20H10V28H4V20H7M30 20H24C24 13.37 29.37 8 36 8V11C31.03 11 27 15.03 27 20H30V28H24V20H27" 
      fill="currentColor" 
    />
  </svg>
);

/**
 * Props for TestimonialCard component
 */
interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

/**
 * Individual testimonial card - memoized for performance
 */
const TestimonialCard = React.memo<TestimonialCardProps>(({ testimonial, index }) => {
  const isOdd = index % 2 !== 0;
  
  return (
    <article
      className={`h-full bg-zinc-900/50 backdrop-blur-sm text-white p-8 md:p-10 rounded-4xl border border-white/5 hover:border-accent/20 transition-all duration-500 group flex flex-col ${
        isOdd ? 'md:mt-16' : ''
      }`}
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      <div className="mb-8">
        <QuoteIcon className="text-accent/30 group-hover:text-accent transition-colors duration-500" />
      </div>

      <blockquote className="text-base md:text-lg leading-relaxed mb-10 font-body text-zinc-300 italic">
        "{testimonial.quote}"
      </blockquote>

      <footer className="flex items-center gap-5 mt-auto pt-6 border-t border-white/5">
        <Avatar 
          src={testimonial.avatar} 
          alt={`${testimonial.author}'s profile picture`} 
        />
        <div>
          <cite className="font-bold text-white text-[15px] tracking-tight uppercase not-italic block">
            {testimonial.author}
          </cite>
          <p className="text-[10px] text-accent font-mono uppercase tracking-[0.2em] mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            {testimonial.role} <span className="mx-1 opacity-30">—</span> {testimonial.company}
          </p>
        </div>
      </footer>
    </article>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

/**
 * Swiper configuration - memoized to prevent recreation
 */
const SWIPER_BREAKPOINTS = {
  640: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
} as const;

/**
 * Testimonials Section Component
 * 
 * Displays client testimonials in a responsive carousel format
 * with scroll-triggered animations.
 */
const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize scroll-triggered animations
   */
  const initializeAnimations = useCallback(() => {
    if (!sectionRef.current) return null;

    return gsap.context(() => {
      // Heading animation with optimized settings
      gsap.from('.testimonial-heading', {
        y: 60,
        opacity: 0,
        duration: ANIMATION_DURATION.SLOW,
        stagger: STAGGER.DRAMATIC,
        ease: ANIMATION_EASE.OUT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          // Performance optimization
          fastScrollEnd: true,
        },
      });
    }, sectionRef);
  }, []);

  useEffect(() => {
    const ctx = initializeAnimations();
    return () => ctx?.revert();
  }, [initializeAnimations]);

  // Memoize rendered testimonial cards
  const renderedTestimonials = useMemo(
    () =>
      TESTIMONIALS.map((testimonial, index) => (
        <SwiperSlide key={testimonial.id} className="h-auto">
          <TestimonialCard testimonial={testimonial} index={index} />
        </SwiperSlide>
      )),
    []
  );

  return (
    <section
      className="min-h-[70vh] cursor-grab flex flex-col justify-center relative overflow-hidden py-12 md:py-16"
      id="testimonials"
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex w-full items-center justify-center">
          <SectionHeader
            title="Trusted by Innovators"
            subtitle="See what top brands say about working with us."
            titleClassName="testimonial-heading text-center"
            className="mb-8 md:mb-12 flex flex-col text-center items-center mx-0! px-0!"
          />
        </div>

        {/* Testimonials Swiper */}
        <div className="testimonial-content">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Improved UX
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-accent !opacity-20',
              bulletActiveClass: '!opacity-100',
            }}
            breakpoints={SWIPER_BREAKPOINTS}
            className="pb-16! overflow-visible!"
            a11y={{
              prevSlideMessage: 'Previous testimonial',
              nextSlideMessage: 'Next testimonial',
            }}
          >
            {renderedTestimonials}
          </Swiper>
        </div>
      </div>

      {/* Decorative Blur Elements - reduced for performance */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none will-change-transform" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent-dark/5 rounded-full blur-[120px] pointer-events-none will-change-transform" 
        aria-hidden="true"
      />
    </section>
  );
};

export default Testimonials;
