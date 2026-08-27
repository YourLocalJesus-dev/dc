import { type ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
};

export function Spinner({ children, className = '', size = 'md' }: Props) {
  const dimension = size === 'sm' ? 'h-4 w-4' : 'h-10 w-10';
  const border = size === 'sm' ? 'border' : 'border-2';
  return (
    <div className={`flex flex-col items-center justify-center ${size === 'sm' ? 'gap-0 py-0' : 'gap-4 py-16'} ${className}`}>
      <div className={`relative ${dimension}`}>
        <div className={`absolute inset-0 rounded-full ${border} border-canvas-200`} />
        <div className={`absolute inset-0 rounded-full ${border} border-transparent border-t-saffron-500 animate-spin`} />
      </div>
      {children && <p className="text-sm text-ink-500">{children}</p>}
    </div>
  );
}
