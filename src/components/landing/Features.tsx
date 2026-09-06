import { Reveal } from '@/components/ui/Reveal';
import { Palette, Users, MessagesSquare, Star, ArrowRight } from 'lucide-react';

type Props = {
  onEnter: () => void;
};

const features = [
  {
    icon: Palette,
    title: 'Curated by craft',
    desc: 'Every skill is treated as a work of art — organized, described, and presented with intention. No noise, no clutter, just craft.',
    accent: 'text-saffron-500',
    bg: 'bg-saffron-50',
    border: 'group-hover:border-saffron-300',
    glow: 'group-hover:shadow-saffron-200/20',
    number: '01',
  },
  {
    icon: Users,
    title: 'A community of makers',
    desc: 'Connect with people who share your passions. Browse profiles, read reviews, and find the right teacher or learner for you.',
    accent: 'text-terracotta-500',
    bg: 'bg-terracotta-50',
    border: 'group-hover:border-terracotta-300',
    glow: 'group-hover:shadow-terracotta-200/20',
    number: '02',
  },
  {
    icon: MessagesSquare,
    title: 'Seamless exchanges',
    desc: 'Propose a skill swap with a single message. Track every exchange from invitation to completion, all in one place.',
    accent: 'text-sage-500',
    bg: 'bg-sage-50',
    border: 'group-hover:border-sage-300',
    glow: 'group-hover:shadow-sage-200/20',
    number: '03',
  },
  {
    icon: Star,
    title: 'Built on trust',
    desc: 'After every completed exchange, leave a review. Reputation grows organically through the quality of your teaching.',
    accent: 'text-plum-500',
    bg: 'bg-plum-50',
    border: 'group-hover:border-plum-300',
    glow: 'group-hover:shadow-plum-200/20',
    number: '04',
  },
];

export function Features({ onEnter }: Props) {
  return (
    <section className="relative overflow-hidden bg-canvas-50 px-5 py-24 sm:px-6 md:py-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-saffron-100/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <Reveal className="mb-14 grid items-end gap-6 border-y border-ink-900/10 py-7 md:mb-16 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron-600">The atelier philosophy / 01—04</p>
            <h2 className="font-display text-4xl font-light leading-[0.98] text-ink-900 text-balance md:text-6xl">
              Not a marketplace.<br /><span className="italic shimmer-text">A living collection.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-500 md:pb-1">We built Atelier for people who believe skills should be shared, not sold.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} as="article" className={i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5'}>
              <div className={`group editorial-card relative h-full overflow-hidden rounded-[1.75rem] border border-canvas-200 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}>
                <span className="exhibit-number pointer-events-none absolute -right-2 -top-8 font-display text-[9rem] font-light leading-none md:text-[11rem]">{f.number}</span>
                <div className="relative flex items-start justify-between mb-12 md:mb-16">
                  <div className={`h-12 w-12 rounded-full ${f.bg} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <f.icon className={`h-7 w-7 ${f.accent}`} />
                  </div>
                  <span className="rounded-full border border-canvas-300 bg-canvas-50/70 px-3 py-1 font-display text-xs italic text-ink-500">Exhibit {f.number}</span>
                </div>

                <h3 className="relative font-display text-3xl font-medium text-ink-900 mb-3 md:text-4xl">
                  {f.title}
                </h3>
                <p className="relative max-w-md text-sm leading-relaxed text-ink-500 md:text-base">{f.desc}</p>

                <button type="button" onClick={onEnter} className="relative mt-9 flex items-center gap-1.5 text-left text-xs font-semibold uppercase tracking-[0.17em] text-ink-400 transition-color">
                  <span>Explore principle</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
