import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Crown, Eye, Lock } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

type Props = {
  onEnter: () => void;
};

const MOCK_SKILLS = [
  {
    id: '1',
    title: 'Oil Painting — Renaissance Techniques',
    description: 'Master the glazing and layering methods of the Old Masters. From underpainting to final varnish, learn centuries-old techniques adapted for modern practice.',
    category: 'Design',
    type: 'teach' as const,
    profile: { name: 'Clara Voss', color: 'saffron', location: 'Florence, Italy' },
  },
  {
    id: '2',
    title: 'Jazz Piano Improvisation',
    description: 'Explore chord voicings, modal jazz, and free improvisation. Perfect for intermediate pianists looking to break free from sheet music.',
    category: 'Music',
    type: 'teach' as const,
    profile: { name: 'Marcus Chen', color: 'teal', location: 'New York, USA' },
  },
  {
    id: '3',
    title: 'Sourdough & Artisan Bread',
    description: 'From cultivating your own starter to mastering the perfect crust — a deep dive into the art and science of naturally leavened bread.',
    category: 'Cooking',
    type: 'teach' as const,
    profile: { name: 'Léa Moreau', color: 'terracotta', location: 'Lyon, France' },
  },
  {
    id: '4',
    title: 'Botanical Illustration',
    description: 'Scientific accuracy meets artistic beauty. Learn to observe, sketch, and render plant life with watercolor and ink using traditional methods.',
    category: 'Design',
    type: 'teach' as const,
    profile: { name: 'Yuki Tanaka', color: 'sage', location: 'Kyoto, Japan' },
  },
  {
    id: '5',
    title: 'Creative Writing — Short Fiction',
    description: 'Craft compelling short stories from concept to polished draft. Explore narrative structure, voice, and the art of the unexpected ending.',
    category: 'Writing',
    type: 'teach' as const,
    profile: { name: 'Amara Obi', color: 'plum', location: 'Lagos, Nigeria' },
  },
  {
    id: '6',
    title: 'Film Photography & Darkroom',
    description: 'Rediscover analog photography — loading film, understanding exposure, and the magic of watching prints emerge in the darkroom.',
    category: 'Photography',
    type: 'teach' as const,
    profile: { name: 'Henrik Rask', color: 'ink', location: 'Stockholm, Sweden' },
  },
];

function MockSkillCard({ skill, blurred, index }: { skill: typeof MOCK_SKILLS[0]; blurred: 'none' | 'light' | 'heavy'; index: number }) {
  const subduedClass = blurred === 'none' ? '' : 'opacity-75';

  return (
    <article className="group relative h-full transition-all duration-700">
      <div className={`relative h-full overflow-hidden rounded-[1.9rem] border border-canvas-200 bg-canvas-50/80 p-6 transition-all duration-500 ${blurred === 'none' ? 'hover:border-ink-300 hover:shadow-2xl hover:shadow-ink-900/10 hover:-translate-y-2 hover:rotate-[0.5deg]' : ''} ${subduedClass}`}>
        {/* Hover glow */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-saffron-200/0 to-terracotta-200/0 group-hover:from-saffron-200/40 group-hover:to-terracotta-200/30 transition-all duration-700 blur-2xl" />

        <span className="absolute right-5 top-16 font-display text-6xl font-light text-ink-900/[0.04]">0{index + 1}</span>
        <div className="relative flex items-start justify-between gap-3 mb-9">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-sage-100 text-sage-700">
            <Sparkles className="h-3 w-3" />
            Teaching
          </span>
          <span className="text-xs font-medium text-ink-400 px-2.5 py-1 rounded-full bg-canvas-100">
            {skill.category}
          </span>
        </div>

        <h3 className="relative font-display text-xl font-semibold text-ink-900 mb-2 leading-snug">
          {skill.title}
        </h3>

        <p className="relative text-sm text-ink-500 leading-relaxed mb-6 line-clamp-3">
          {skill.description}
        </p>

        <div className="relative flex items-center gap-2.5">
          <Avatar name={skill.profile.name} colorKey={skill.profile.color} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-800 truncate">{skill.profile.name}</p>
            <p className="text-xs text-ink-400 truncate">{skill.profile.location}</p>
          </div>
        </div>
      </div>

      {/* Lock icon overlay for blurred cards */}
      {blurred !== 'none' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-10 w-10 rounded-full bg-canvas-50/80 backdrop-blur-sm border border-canvas-200 flex items-center justify-center shadow-lg">
            <Lock className="h-4 w-4 text-ink-400" />
          </div>
        </div>
      )}
    </article>
  );
}

export function FeaturedSkills({ onEnter }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // Animated counter
  useEffect(() => {
    const target = 2847;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), target);
            setCount(current);
            if (step >= steps) clearInterval(interval);
          }, duration / steps);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-5 py-24 sm:px-6 md:py-36">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[5%] h-96 w-96 rounded-full bg-saffron-200/20 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-plum-200/15 blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="mb-16 flex flex-col justify-between gap-6 border-y border-ink-900/10 py-7 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron-200 bg-saffron-50/80 px-4 py-1.5 mb-4">
              <Crown className="h-3.5 w-3.5 text-saffron-500" />
              <span className="text-xs font-medium tracking-wide text-saffron-700">
                Exclusive collection
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-900 leading-tight text-balance">
              Skills on display
              <span className="italic"> this season.</span>
            </h2>
            <p className="mt-4 text-ink-500 leading-relaxed max-w-lg">
              A curated selection from our community of {count.toLocaleString()}+ craftspeople worldwide.
            </p>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-canvas-100 border border-canvas-200 px-4 py-2">
              <Eye className="h-3.5 w-3.5 text-ink-400" />
              <span className="text-xs font-medium text-ink-600">Preview</span>
            </div>
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_SKILLS.map((skill, i) => {
              const blur = i < 2 ? 'none' : i < 4 ? 'light' : 'heavy';
              return (
                <Reveal key={skill.id} delay={i * 100}>
                  <MockSkillCard skill={skill} index={i} blurred={blur as 'none' | 'light' | 'heavy'} />
                </Reveal>
              );
            })}
          </div>

          {/* Gradient fade overlay on bottom half */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-canvas-50 via-canvas-50/80 to-transparent pointer-events-none" />

          {/* Premium access CTA — overlaid on the blurred section */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4 z-10">
            <div className="relative glass rounded-2xl border border-canvas-200/80 shadow-2xl shadow-ink-900/10 px-8 py-8 md:px-12 md:py-10 max-w-lg w-full text-center">
              {/* Subtle shimmer border effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-saffron-300/0 via-saffron-300/10 to-saffron-300/0 animate-shimmer" 
                     style={{ backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite' }} />
              </div>

              <div className="relative">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-ink-900 mb-5">
                  <Crown className="h-5 w-5 text-saffron-400" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-light text-ink-900 mb-3 leading-snug">
                  The collection
                  <span className="italic shimmer-text"> continues.</span>
                </h3>

                <p className="text-sm text-ink-500 leading-relaxed mb-6 max-w-sm mx-auto">
                  Hundreds of skills across design, music, languages, and more — 
                  waiting to be discovered inside the gallery.
                </p>

                <Button onClick={onEnter} size="lg" magnetic>
                  Enter the gallery
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
