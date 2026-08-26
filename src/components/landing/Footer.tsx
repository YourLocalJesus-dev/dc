import { Logo } from '@/components/ui/Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-canvas-200 bg-canvas-100/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Logo />
            <p className="text-sm text-ink-500 mt-3 max-w-xs">
              A curated space for exchanging skills and knowledge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Github, label: 'GitHub' },
              { icon: Linkedin, label: 'LinkedIn' },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="h-10 w-10 rounded-full border border-canvas-300 flex items-center justify-center text-ink-500 hover:bg-ink-900 hover:text-canvas-50 hover:border-ink-900 transition-all duration-300"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-canvas-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Atelier. Crafted with intention.
          </p>
          <p className="text-xs text-ink-400 font-display italic">
            Every skill is a craft. Every exchange, a collaboration.
          </p>
        </div>
      </div>
    </footer>
  );
}
