import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

type Props = {
  onEnter: () => void;
};

export function LandingNav({ onEnter }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-canvas-200 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Gallery'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm text-ink-600 hover:text-ink-900 ink-underline transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <Button onClick={onEnter} size="sm" magnetic>
          Sign in
        </Button>
      </div>
    </nav>
  );
}
