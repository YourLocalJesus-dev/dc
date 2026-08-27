import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, X } from 'lucide-react';

type Props = {
  onEnter: () => void;
};

export function LandingNav({ onEnter }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#features', note: 'The atelier, at a glance' },
    { label: 'How it works', href: '#how-it-works', note: 'A simple exchange ritual' },
    { label: 'Gallery', href: '#gallery', note: 'Meet the people and their craft' },
  ];

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
        scrolled ? 'glass border-b border-canvas-200/60 py-3 shadow-lg shadow-ink-900/5' : 'py-5'
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 sm:px-6 ${scrolled ? 'md:max-w-4xl md:rounded-full md:border md:border-canvas-200 md:bg-canvas-50/80 md:px-3 md:py-2 md:shadow-xl md:shadow-ink-900/5' : ''}`}>
        <a href="#top" className="relative z-10"><Logo /></a>
        <div className="relative hidden items-center gap-1 rounded-2xl border border-canvas-200 bg-canvas-50/60 p-1.5 md:flex">
          <span className="px-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-ink-300">Index</span>
          {links.map(({ label, href }, index) => (
            <a
              key={label}
              href={href}
              className="group relative z-10 flex items-center gap-2 rounded-xl px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink-600 transition-colors hover:bg-canvas-100 hover:text-ink-900"
            >
              <span className="font-display text-[10px] font-normal italic text-ink-300 transition-colors group-hover:text-saffron-600">0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>
        <button onClick={onEnter} className="group relative hidden h-12 w-12 items-center justify-center rounded-full border border-ink-900 bg-ink-900 text-canvas-50 transition-all hover:-rotate-12 hover:bg-saffron-400 hover:text-ink-900 sm:inline-flex" aria-label="Enter the gallery">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          <span className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.18em] text-ink-500 opacity-0 transition-opacity group-hover:opacity-100">Enter</span>
        </button>
        <button
          type="button"
          onClick={() => setIndexOpen((open) => !open)}
          className="group inline-flex h-11 items-center gap-2 rounded-full border border-canvas-300/70 bg-canvas-50/80 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700 shadow-sm backdrop-blur-sm transition-all hover:border-ink-400 hover:bg-canvas-50 sm:hidden"
          aria-expanded={indexOpen}
          aria-controls="gallery-index"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-[9px] text-canvas-50 transition-transform duration-500 group-hover:rotate-90">+</span>
          Index
        </button>
      </div>

      <div
        id="gallery-index"
        className={`sm:hidden absolute left-4 right-4 top-[calc(100%+0.65rem)] origin-top transition-all duration-500 ${
          indexOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-3 scale-95 pointer-events-none opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-canvas-300/80 bg-canvas-50/95 p-3 shadow-2xl shadow-ink-900/15 backdrop-blur-xl">
          <div className="flex items-center justify-between px-3 pb-3 pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">Gallery index</p>
            <button onClick={() => setIndexOpen(false)} aria-label="Close gallery index" className="grid h-7 w-7 place-items-center rounded-full text-ink-500 hover:bg-canvas-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="relative space-y-1 before:absolute before:bottom-5 before:left-[1.45rem] before:top-5 before:w-px before:bg-canvas-300">
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIndexOpen(false)}
                className="group relative flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-canvas-100"
              >
                <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-canvas-300 bg-canvas-50 font-display text-sm italic text-ink-700 group-hover:border-saffron-400 group-hover:text-saffron-600">0{index + 1}</span>
                <span>
                  <span className="block text-sm font-medium text-ink-800">{link.label}</span>
                  <span className="block text-xs text-ink-400">{link.note}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-ink-300 transition-all group-hover:translate-x-1 group-hover:text-ink-700" />
              </a>
            ))}
          </div>
          <button onClick={onEnter} className="mt-3 flex w-full items-center justify-between rounded-2xl bg-ink-900 px-4 py-3.5 text-left text-canvas-50 shadow-lg shadow-ink-900/15">
            <span><span className="block text-sm font-medium">Enter the gallery</span><span className="block text-xs text-canvas-300">Start your exchange</span></span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
