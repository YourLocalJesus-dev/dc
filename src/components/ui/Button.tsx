import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  magnetic?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-900 text-canvas-50 hover:bg-ink-800 shadow-lg shadow-ink-900/10',
  secondary:
    'bg-saffron-400 text-ink-900 hover:bg-saffron-300 shadow-lg shadow-saffron-500/20',
  ghost: 'text-ink-700 hover:bg-ink-100',
  outline:
    'border border-ink-300 text-ink-800 hover:border-ink-900 hover:bg-ink-50',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', children, className = '', magnetic = false, ...props }, ref) => {
    const magRef = useMagnetic<HTMLButtonElement>(0.25);
    const usedRef = magnetic ? magRef : ref;

    return (
      <button
        ref={usedRef}
        className={`relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
