import React, { memo } from 'react';

/**
 * Props for SectionHeader component
 */
interface SectionHeaderProps {
  /** Main section title */
  title: string;
  /** Subtitle or description */
  subtitle: string;
  /** Additional classes for the title */
  titleClassName?: string;
  /** Additional classes for the subtitle */
  subtitleClassName?: string;
  /** Additional classes for the container */
  className?: string;
  /** Optional ID for anchor linking */
  id?: string;
}

/**
 * SectionHeader Component
 * 
 * Reusable section header with consistent styling.
 * Features a main title and supporting subtitle.
 * 
 * @example
 * <SectionHeader 
 *   title="Our Services" 
 *   subtitle="What we offer"
 *   id="services"
 * />
 */
const SectionHeader: React.FC<SectionHeaderProps> = memo(({
  title,
  subtitle,
  titleClassName = '',
  subtitleClassName = '',
  className = '',
  id,
}) => {
  return (
    <header
      id={id}
      className={`max-w-8xl mx-auto lg:px-16 px-4 mb-10 relative z-20 ${className}`}
    >
      <div className="flex items-baseline gap-4">
        <h2
          className={`text-white text-5xl md:text-7xl font-display uppercase tracking-tighter ${titleClassName}`}
        >
          {title}
        </h2>
      </div>
      <p
        className={`text-zinc-500 mt-2 max-w-sm font-body uppercase tracking-widest text-sm ${subtitleClassName}`}
      >
        {subtitle}
      </p>
    </header>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
