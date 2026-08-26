import { Reveal } from '@/components/ui/Reveal';
import { Palette, Users, MessagesSquare, Star } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Curated by craft',
    desc: 'Every skill is treated as a work of art — organized, described, and presented with intention. No noise, no clutter, just craft.',
    accent: 'text-saffron-500',
    bg: 'bg-saffron-50',
  },
  {
    icon: Users,
    title: 'A community of makers',
    desc: 'Connect with people who share your passions. Browse profiles, read reviews, and find the right teacher or learner for you.',
    accent: 'text-terracotta-500',
    bg: 'bg-terracotta-50',
  },
  {
    icon: MessagesSquare,
    title: 'Seamless exchanges',
    desc: 'Propose a skill swap with a single message. Track every exchange from invitation to completion, all in one place.',
    accent: 'text-sage-500',
    bg: 'bg-sage-50',
  },
  {
    icon: Star,
    title: 'Built on trust',
    desc: 'After every completed exchange, leave a review. Reputation grows organically through the quality of your teaching.',
    accent: 'text-plum-500',
    bg: 'bg-plum-50',
  },
];

export function Features() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-saffron-600 mb-3">
            Why Atelier
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink-900 leading-tight text-balance">
            Not a marketplace.
            <br />
            <span className="italic">A studio.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} as="article">
              <div className="group h-full rounded-2xl border border-canvas-200 bg-canvas-50 p-8 transition-all duration-500 hover:border-ink-300 hover:shadow-lg hover:shadow-ink-900/5">
                <div className={`h-14 w-14 rounded-2xl ${f.bg} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <f.icon className={`h-7 w-7 ${f.accent}`} />
                </div>
                <h3 className="font-display text-2xl font-medium text-ink-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-ink-500 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
