import React, { memo, type ReactNode, type ButtonHTMLAttributes } from 'react';

/**
 * Button variant types
 */
type ButtonVariant = 'dark' | 'light';

/**
 * Props for Button component
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Show plus icon (default: true) */
  showPlus?: boolean;
  /** Custom icon element (overrides showPlus) */
  icon?: ReactNode;
  /** Button color variant */
  variant?: ButtonVariant;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
}


const VARIANT_STYLES: Record<ButtonVariant, string> = {
  dark: 'bg-zinc-950 text-white',
  light: 'bg-white text-zinc-950 border border-zinc-200 hover:text-white',
} as const;


const Button: React.FC<ButtonProps> = memo(({
  label,
  onClick,
  className = '',
  showPlus = true,
  icon,
  variant = 'dark',
  type = 'button',
  disabled,
  ...rest
}) => {
  const baseStyles = `
    group relative px-8 py-3 rounded-full overflow-hidden 
    transition-all duration-300 hover:scale-[1.02] active:scale-95 
    shadow-2xl flex items-center justify-center gap-3 cursor-pointer
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent 
    focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
  `.trim().replace(/\s+/g, ' ');

  const variantStyles = VARIANT_STYLES[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...rest}
    >
      <span className="relative z-10 text-sm font-body tracking-[0.2em] uppercase transition-colors duration-300">
        {label}
      </span>
      
      {icon ? (
        <span className="relative z-10 transition-colors duration-300" aria-hidden="true">
          {icon}
        </span>
      ) : (
        showPlus && (
          <span className="relative z-10 text-xl transition-colors duration-300" aria-hidden="true">
            +
          </span>
        )
      )}
      
      {/* Hover background effect */}
      <div
        className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out group-disabled:translate-y-full"
        aria-hidden="true"
      />
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
