import type { ReactNode } from 'react';

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function StudioHeader({ index, eyebrow, title, description, action, className = '' }: Props) {
  return (
    <header className={`studio-header ${className}`}>
      <div className="studio-index" aria-hidden="true">{index}</div>
      <div className="relative z-10 max-w-2xl">
        <p className="studio-kicker">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-light leading-[0.96] tracking-[-0.03em] text-ink-900 sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">{description}</p>
      </div>
      {action && <div className="relative z-10 shrink-0">{action}</div>}
    </header>
  );
}
