import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Users, Star, TrendingUp } from 'lucide-react';

type Props = {
  onEnter: () => void;
};

const STATS = [
  { icon: Users, value: '2,847', label: 'Artisans', suffix: '+' },
  { icon: Sparkles, value: '12,400', label: 'Skills shared', suffix: '+' },
  { icon: Star, value: '4.9', label: 'Avg. rating', suffix: '' },
  { icon: TrendingUp, value: '98', label: 'Satisfaction', suffix: '%' },
];

export function CTA({ onEnter }: Props) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const MARQUEE_SKILLS = [
    'Oil Painting', 'Jazz Guitar', 'Sourdough Baking', 'UX Design', 'Pottery',
    'Creative Writing', 'Piano', 'Photography', 'Calligraphy', 'Yoga',
    'Botanical Illustration', 'Film Editing', 'Ceramics', 'French Cooking',
    'Watercolor', 'Typography', 'Woodworking', 'Vocal Training',
  ];

  return (
    <section className="relative px-5 py-24 sm:px-6 md:py-36">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-ink-900 grain shadow-[0_28px_80px_rgba(34,28,19,0.20)]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-20%] left-[10%] h-80 w-80 rounded-full bg-saffron-500/15 blur-3xl animate-pulse-soft" />
              <div className="absolute bottom-[-10%] right-[15%] h-72 w-72 rounded-full bg-terracotta-500/12 blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
              <div className="absolute top-[30%] right-[5%] h-64 w-64 rounded-full bg-plum-500/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '3.5s' }} />
              <div className="portal-ring-one absolute -right-20 -top-20 h-80 w-80 rounded-full border border-dashed border-saffron-300/30" />
              <div className="portal-ring-two absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-plum-300/30" />
            </div>

            <div className="relative overflow-hidden border-b border-canvas-50/10 py-4">
              <div className="flex animate-marquee whitespace-nowrap" ref={marqueeRef}>
                {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((skill, i) => (
                  <span key={i} className="inline-flex items-center mx-4 text-sm text-canvas-400/60 font-display italic tracking-wide">
                    <span className="h-1 w-1 rounded-full bg-saffron-500/40 mr-4" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative px-6 py-16 sm:px-10 md:px-16 md:py-24">
              <div className="mb-16 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas-50/10 bg-canvas-50/5">
                      <stat.icon className="h-4 w-4 text-saffron-400" />
                    </div>
                    <p className="font-display text-3xl md:text-4xl font-light text-canvas-50 tracking-tight">
                      {stat.value}<span className="text-saffron-400">{stat.suffix}</span>
                    </p>
                    <p className="text-xs text-canvas-400 mt-1 tracking-wide uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-16 h-px bg-gradient-to-r from-transparent via-canvas-50/20 to-transparent" />

              <div className="text-center max-w-2xl mx-auto">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron-300">Your next chapter is waiting</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-canvas-50 leading-tight text-balance mb-6">
                  The gallery is open.
                  <br />
                  <span className="italic shimmer-text">Your seat awaits.</span>
                </h2>
                <p className="text-canvas-400 max-w-lg mx-auto mb-10 leading-relaxed">
                  Join a growing community of people who believe that knowledge is best shared freely — 
                  one skill at a time.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button onClick={onEnter} size="lg" variant="secondary" magnetic>
                    Enter the gallery
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <button
                    onClick={onEnter}
                    className="inline-flex items-center gap-2 text-sm text-canvas-400 hover:text-canvas-50 transition-colors ink-underline"
                  >
                    Already a member? Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
