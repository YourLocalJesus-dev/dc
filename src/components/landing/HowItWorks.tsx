import { Reveal } from '@/components/ui/Reveal';
import { PenTool, Search, Send, Check } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    num: '01',
    title: 'Craft your profile',
    desc: 'Tell the community who you are. Add your name, a short bio, and where you create from.',
  },
  {
    icon: Search,
    num: '02',
    title: 'List your skills',
    desc: 'Share what you can teach and what you want to learn. Each skill gets its own page in the gallery.',
  },
  {
    icon: Send,
    num: '03',
    title: 'Propose an exchange',
    desc: 'Found a skill that speaks to you? Send a message and propose a swap. The other person accepts or declines.',
  },
  {
    icon: Check,
    num: '04',
    title: 'Learn, teach, review',
    desc: 'Complete your exchange, share what you learned, and leave a review to build your reputation.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-canvas-100/50 grain">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-saffron-600 mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink-900 leading-tight text-balance">
            Four steps to your
            <span className="italic"> first exchange.</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-canvas-300 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 150} className="relative text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-canvas-50 border border-canvas-200 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-saffron-300">
                    <step.icon className="h-9 w-9 text-ink-700" />
                  </div>
                  <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-ink-900 text-canvas-50 text-xs font-display font-semibold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-ink-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed max-w-[14rem] mx-auto">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
