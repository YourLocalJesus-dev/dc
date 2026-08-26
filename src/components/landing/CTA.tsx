import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

type Props = {
  onEnter: () => void;
};

export function CTA({ onEnter }: Props) {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-8 py-16 md:px-16 md:py-24 text-center grain">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-saffron-500/20 blur-3xl animate-pulse-soft" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-terracotta-500/20 blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-light text-canvas-50 leading-tight text-balance mb-6">
                Your knowledge is
                <span className="italic shimmer-text"> a gift.</span>
                <br />
                Share it.
              </h2>
              <p className="text-canvas-300 max-w-xl mx-auto mb-10 leading-relaxed">
                Join a community that treats learning as an art form. Create your profile,
                list your skills, and make your first exchange today.
              </p>
              <Button onClick={onEnter} size="lg" variant="secondary" magnetic>
                Begin your journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
