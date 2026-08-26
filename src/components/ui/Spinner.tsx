import { type ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export function Spinner({ children, className = '' }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-16 ${className}`}>
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-canvas-200" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-saffron-500 animate-spin" />
      </div>
      {children && <p className="text-sm text-ink-500">{children}</p>}
    </div>
  );
}
