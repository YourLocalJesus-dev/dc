import type { ReactNode } from 'react';

type Props = {
  className?: string;
};

export function Logo({ className = '' }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={36} />
      <span className="font-display text-xl font-semibold tracking-tight text-ink-900">
        Atelier
      </span>
    </div>
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="40" height="40" rx="11" fill="#221c13" />
      <path
        d="M10 12.5C12.5 8.8 17.7 8.2 21.1 11.3C24 13.9 24.3 17.8 21.7 20.5L15.7 26.7C13.1 29.4 13.5 33.1 16.4 35.1"
        stroke="#f5a827"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path
        d="M30 27.5C27.5 31.2 22.3 31.8 18.9 28.7C16 26.1 15.7 22.2 18.3 19.5L24.3 13.3C26.9 10.6 26.5 6.9 23.6 4.9"
        stroke="#cc5f48"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path d="M12.4 14.5L27.6 25.5" stroke="#e7e7e2" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
      <circle cx="20" cy="20" r="2.1" fill="#8fb58a" stroke="#221c13" strokeWidth="1.2" />
    </svg>
  );
}

export function LogoWordmark({ className = '' }: { className?: string }): ReactNode {
  return <Logo className={className} />;
}
