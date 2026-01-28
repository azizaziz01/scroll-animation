import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_DURATION, ANIMATION_EASE, STAGGER } from '../constants/animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Navigation link configuration
 */
interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

/**
 * Footer column configuration
 */
interface FooterColumn {
  id: string;
  title: string;
  links: NavLink[];
}

/**
 * Footer navigation data - extracted for maintainability
 */
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 'index',
    title: 'Index',
    links: [
      { label: 'Home', href: '#' },
      { label: 'Work', href: '#work' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
    ],
  },
  {
    id: 'terms',
    title: 'Terms',
    links: [
      { label: 'License', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
  {
    id: 'store',
    title: 'Store',
    links: [
      { label: 'Templates', href: '#' },
      { label: 'Assets', href: '#' },
      { label: 'Freebies', href: '#' },
    ],
  },
  {
    id: 'socials',
    title: 'Socials',
    links: [
      { label: 'Instagram', href: '#', isExternal: true },
      { label: 'LinkedIn', href: '#', isExternal: true },
      { label: 'Behance', href: '#', isExternal: true },
      { label: 'Twitter', href: '#', isExternal: true },
    ],
  },
];

/**
 * Footer link component - handles internal and external links
 */
interface FooterLinkProps {
  link: NavLink;
}

const FooterLink = React.memo<FooterLinkProps>(({ link }) => {
  if (link.isExternal) {
    return (
      <a
        href={link.href}
        className="group flex items-center gap-1 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
        <span
          className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href={link.href}
      className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded"
    >
      {link.label}
    </a>
  );
});

FooterLink.displayName = 'FooterLink';

/**
 * Footer column component
 */
interface FooterColumnProps {
  column: FooterColumn;
}

const FooterColumnComponent = React.memo<FooterColumnProps>(({ column }) => (
  <div className="footer-column">
    <h4 className="text-zinc-500 font-display text-sm tracking-widest uppercase mb-6">
      {column.title}
    </h4>
    <ul className="space-y-3 font-body text-sm md:text-base text-zinc-400">
      {column.links.map((link) => (
        <li key={link.label}>
          <FooterLink link={link} />
        </li>
      ))}
    </ul>
  </div>
));

FooterColumnComponent.displayName = 'FooterColumn';

/**
 * Handle scroll to top action
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Footer Component
 * 
 * Site footer with brand information, navigation links, and social media links.
 * Features scroll-triggered reveal animations and decorative background.
 */
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize footer animations
   */
  const initializeAnimations = useCallback(() => {
    if (!footerRef.current) return null;

    return gsap.context(() => {
      gsap.from('.footer-column', {
        y: 40,
        opacity: 0,
        duration: ANIMATION_DURATION.SLOW,
        stagger: STAGGER.NORMAL,
        ease: ANIMATION_EASE.OUT,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          fastScrollEnd: true,
        },
      });
    }, footerRef);
  }, []);

  useEffect(() => {
    const ctx = initializeAnimations();
    return () => ctx?.revert();
  }, [initializeAnimations]);

  // Memoize footer columns
  const renderedColumns = useMemo(
    () =>
      FOOTER_COLUMNS.map((column) => (
        <FooterColumnComponent key={column.id} column={column} />
      )),
    []
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      ref={footerRef}
      className="relative m-3 rounded-xl bg-zinc-950 text-white pt-24 pb-12 overflow-hidden"
      role="contentinfo"
    >
      {/* Background Graphic Element */}
      <div
        className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-40"
        aria-hidden="true"
      >
        <img
          src="https://framerusercontent.com/images/6cGsflAPFCSTYGPeNRuSZsTt8Y.png?scale-down-to=2048"
          alt=""
          className="w-full h-full object-cover grayscale opacity-20"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          {/* Left Column: Brand */}
          <div className="lg:col-span-4 footer-column">
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4">
              AZIZ STUDIO
            </h2>
            <address className="space-y-1 text-zinc-400 font-body text-sm md:text-base opacity-60 not-italic">
              <p>
                <a
                  href="mailto:hello@azizstudio.com"
                  className="hover:text-white transition-colors"
                >
                  hello@azizstudio.com
                </a>
              </p>
            </address>
          </div>

          {/* Right Columns: Links */}
          <nav
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            aria-label="Footer navigation"
          >
            {renderedColumns}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase">
          <p>© {currentYear} AZIZ STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
