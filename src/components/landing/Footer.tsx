import { Logo } from '@/components/ui/Logo';
import { ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Gallery', href: '#gallery' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-canvas-200 bg-canvas-100/50">
      <div className="pointer-events-none absolute -bottom-40 right-[8%] h-80 w-80 rounded-full border border-saffron-300/30" />
      <div className="relative max-w-6xl mx-auto px-5 py-16 sm:px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              A curated space where skills are shared as gifts and every exchange is a collaboration.
            </p>
          </div>

          <div className="flex flex-col gap-12 sm:flex-row">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-4">Navigate</p>
              <ul className="space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-600 hover:text-ink-900 ink-underline transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-4">Studio</p>
              <ul className="space-y-3">
                <li>
                  <span className="text-sm text-ink-600 inline-flex items-center gap-1">
                    Made with intention
                    <ArrowUpRight className="h-3 w-3 text-ink-400" />
                  </span>
                </li>
                <li>
                  <span className="text-sm text-ink-600">Open source</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-canvas-200 pt-8 sm:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
          <p className="text-xs text-ink-400 font-display italic">
            Every skill is a craft. Every exchange, a collaboration.
          </p>
        </div>
      </div>
    </footer>
  );
}
