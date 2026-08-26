import { Logo } from '@/components/ui/Logo';

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

          <div className="text-right">
            <p className="text-sm text-ink-500 font-display italic">
              Your knowledge is a gift.
            </p>
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