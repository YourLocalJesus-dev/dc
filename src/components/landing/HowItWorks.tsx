import { Reveal } from '@/components/ui/Reveal';
import { PenTool, Search, Send, Check } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    num: '01',
    title: 'Craft your profile',
    desc: 'Tell the community who you are. Add your name, a short bio, and where you create from.',
    accent: 'bg-saffron-50 border-saffron-200 hover:border-saffron-300 hover:shadow-saffron-200/30',
    iconColor: 'text-saffron-600',
  },
  {
    icon: Search,
    num: '02',
    title: 'List your skills',
    desc: 'Share what you can teach and what you want to learn. Each skill gets its own page in the gallery.',
    accent: 'bg-terracotta-50 border-terracotta-200 hover:border-terracotta-300 hover:shadow-terracotta-200/30',
    iconColor: 'text-terracotta-600',
  },
  {
    icon: Send,
    num: '03',
    title: 'Propose an exchange',
    desc: 'Found a skill that speaks to you? Send a message and propose a swap.',
    accent: 'bg-sage-50 border-sage-200 hover:border-sage-300 hover:shadow-sage-200/30',
    iconColor: 'text-sage-600',
  },
  {
    icon: Check,
    num: '04',
    title: 'Learn, teach, review',
    desc: 'Complete your exchange, share what you learned, and leave a review.',
    accent: 'bg-plum-50 border-plum-200 hover:border-plum-300 hover:shadow-plum-200/30',
    iconColor: 'text-plum-600',
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-canvas-50 px-5 py-24 text-ink-900 sm:px-6 md:py-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[18%] top-20 h-[34rem] w-[34rem] rounded-full border border-saffron-200/60" />
        <div className="absolute right-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-plum-100/35 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <Reveal className="mb-14 flex flex-col justify-between gap-7 border-y border-ink-900/10 py-7 md:mb-20 md:flex-row md:items-end">
          <div className="max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.26em] uppercase text-saffron-600 mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-ink-900 leading-[1.02] text-balance">
            A score for your
            <span className="italic"> first exchange.</span>
          </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-500 md:pb-1">
            Four gestures, composed as one generous act of learning.
          </p>
        </Reveal>

        <div className="relative">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 120} className={`relative group ${i % 2 ? 'lg:translate-y-12' : ''}`}>
                <article className="relative h-full overflow-hidden rounded-[1.8rem] border border-canvas-200 bg-canvas-50/80 p-6 shadow-[0_16px_42px_rgba(34,28,19,0.06)] transition-all duration-500">
                <span className="absolute -right-2 -top-8 font-display text-[8rem] font-light leading-none text-ink-900/[0.045]">{step.num}</span>
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className={`h-16 w-16 rounded-[1.25rem] ${step.accent} border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                  </div>
                  <span className="absolute -bottom-3 -right-3 h-7 w-7 rounded-full bg-ink-900 text-canvas-50 text-[10px] font-display font-semibold flex items-center justify-center shadow-lg">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-ink-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {step.desc}
                </p>
                <div className="mt-7 h-px w-10 bg-ink-900/15 transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
