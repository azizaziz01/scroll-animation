import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import Button from './Button';
import { ANIMATION_DURATION, ANIMATION_EASE } from '../constants/animation';

/**
 * Navigation items configuration - matches actual section IDs in the app
 */
const NAV_ITEMS = ['work', 'services', 'testimonials'] as const;
const MOBILE_NAV_ITEMS = ['work', 'services', 'testimonials', 'contact'] as const;

/**
 * Navbar Component
 * 
 * Responsive navigation with hide-on-scroll behavior and animated mobile menu.
 * Features staggered line animations and smooth transitions.
 */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuLinesRef = useRef<HTMLDivElement[]>([]);
  const menuLinksRef = useRef<HTMLButtonElement[]>([]);

  /**
   * Handle scroll events with debouncing for performance
   */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (menuOpen) {
            ticking = false;
            return;
          }

          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          setScrolled(currentScrollY > 50);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  /**
   * Lock body scroll when menu is open
   */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /**
   * Menu open/close animations
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.to(menuRef.current, {
          autoAlpha: 1,
          duration: 0.1,
        });

        // Animate the solid background container
        gsap.fromTo(
          contentRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            duration: ANIMATION_DURATION.EXTENDED,
            ease: ANIMATION_EASE.EXPO_INOUT,
          }
        );

        gsap.fromTo(
          menuLinesRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: ANIMATION_DURATION.SLOW,
            stagger: 0.05,
            ease: ANIMATION_EASE.EXPO_INOUT,
          }
        );

        gsap.fromTo(
          menuLinksRef.current,
          { y: '100%', rotate: 5, skewY: 7 },
          {
            y: 0,
            rotate: 0,
            skewY: 0,
            duration: ANIMATION_DURATION.EXTENDED,
            stagger: 0.08,
            delay: 0.5,
            ease: ANIMATION_EASE.EXPO_OUT,
          }
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, { autoAlpha: 0 });
          },
        });

        tl.to(menuLinksRef.current, {
          y: '100%',
          opacity: 0,
          rotate: -2,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power4.in',
        });

        tl.to(
          contentRef.current,
          {
            clipPath: 'circle(0% at 50% 50%)',
            opacity: 0,
            duration: ANIMATION_DURATION.SLOW,
            ease: ANIMATION_EASE.EXPO_INOUT,
          },
          '-=0.3'
        );

        tl.to(
          menuLinesRef.current,
          {
            scaleY: 0,
            transformOrigin: 'bottom',
            duration: 0.6,
            stagger: 0.05,
            ease: ANIMATION_EASE.EXPO_INOUT,
          },
          '-=0.5'
        );
      }
    });

    return () => ctx.revert();
  }, [menuOpen]);

  /**
   * Smooth scroll to section
   */
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  }, []);

  /**
   * Toggle menu handler
   */
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Memoize desktop nav items
  const desktopNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => (
        <button
          key={item}
          onClick={() => scrollToSection(item)}
          className="text-sm cursor-pointer text-[#232527]/80 hover:text-[#232527] capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1"
          aria-label={`Navigate to ${item} section`}
        >
          {item}
        </button>
      )),
    [scrollToSection]
  );

  // Memoize mobile menu items
  const mobileMenuItems = useMemo(
    () =>
      MOBILE_NAV_ITEMS.map((item, i) => (
        <div key={item} className="overflow-hidden py-2">
          <button
            ref={(el) => {
              menuLinksRef.current[i] = el!;
            }}
            onClick={() => scrollToSection(item)}
            className="group relative text-5xl md:text-8xl font-black uppercase tracking-tighter text-white hover:text-white/80 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            aria-label={`Navigate to ${item} section`}
          >
            <span className="relative z-10 block">{item}</span>
            <div
              className="absolute -bottom-2 left-0 w-0 h-2 bg-white group-hover:w-full transition-all duration-500 ease-expo"
              aria-hidden="true"
            />
          </button>
        </div>
      )),
    [scrollToSection]
  );

  // Memoize background lines
  const backgroundLines = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            menuLinesRef.current[i] = el!;
          }}
          className="flex-1 w-full bg-bg-primary border-b border-black/5 shadow-2xl"
          aria-hidden="true"
        />
      )),
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 py-4 transition-all duration-300 transform ${
        isVisible || menuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-black/5 py-3' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative z-1002">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-wider text-[#232527] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="AZIZ Studio - Home"
        >
          <span>AZIZ</span>
          <span
            className="w-2 h-2 bg-accent rounded-full animate-pulse"
            aria-hidden="true"
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex ml-20 gap-4 items-center">
          {desktopNavItems}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            label="Let's Talk"
            showPlus={false}
            className="py-2 scale-90"
            onClick={() => scrollToSection('contact')}
          />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-1001 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#232527] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-6 h-0.5 bg-[#232527] transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-6 h-0.5 bg-[#232527] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className="fixed inset-0 z-1000 invisible pointer-events-none"
        aria-hidden={!menuOpen}
      >
        {/* Staggered Background Lines */}
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {backgroundLines}
        </div>

        {/* Menu Content */}
        <div
          ref={contentRef}
          className={`relative h-screen bg-accent w-full flex flex-col items-center justify-center gap-6 pointer-events-auto ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          {mobileMenuItems}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
