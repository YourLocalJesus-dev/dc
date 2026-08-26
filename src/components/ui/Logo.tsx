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
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="36" height="36" rx="9" fill="#221c13" />
      <circle
        cx="12.5"
        cy="13"
        r="4"
        stroke="#f5a827"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="23.5"
        cy="23"
        r="4"
        stroke="#cc5f48"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12.5 18.5C12.5 21 14.5 23 17 23"
        stroke="#e7e7e2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1.5 2.2"
        opacity="0.7"
      />
      <path
        d="M23.5 18C23.5 15.5 21.5 13.5 19 13.5"
        stroke="#e7e7e2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1.5 2.2"
        opacity="0.7"
      />
      <circle cx="18" cy="18" r="1.6" fill="#8fb58a" />
    </svg>
  );
}

export function LogoWordmark({ className = '' }: { className?: string }): ReactNode {
  return <Logo className={className} />;
}
