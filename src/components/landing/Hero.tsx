import { ArrowRight, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Props = { onEnter: () => void };

const orbitingSkills = [
  { label: 'Oil painting', note: 'Florence', color: 'saffron', position: 'left-0 top-8 sm:left-4 sm:top-12', delay: '0s' },
  { label: 'Jazz piano', note: 'New York', color: 'plum', position: 'right-0 top-28 sm:right-2 sm:top-20', delay: '1.6s' },
  { label: 'Botanical ink', note: 'Kyoto', color: 'sage', position: 'bottom-6 left-5 sm:bottom-4 sm:left-10', delay: '3.2s' },
];

export function Hero({ onEnter }: Props) {
  function exploreCollection() {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-canvas-50 px-5 pb-12 pt-28 sm:px-6 sm:pt-32 lg:flex lg:items-center lg:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(249,196,87,0.25)_0%,_rgba(250,248,245,0)_62%)]" />
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-sage-100/60 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-plum-100/45 blur-3xl" />
        <div className="absolute inset-x-0 top-[13%] h-px bg-gradient-to-r from-transparent via-ink-900/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="relative z-10 lg:pb-4">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-canvas-300 bg-canvas-50/80 px-3 py-2 pr-4 shadow-sm backdrop-blur-sm animate-fade-in">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-900 text-saffron-300"><Sparkles className="h-3.5 w-3.5" /></span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-600">The human skills archive</span>
          </div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron-600 animate-fade-up">Issue no. 01 / now exhibiting</p>
          <h1 className="max-w-2xl font-display text-[3.45rem] font-light leading-[0.9] tracking-[-0.045em] text-ink-900 sm:text-7xl lg:text-[5.35rem] animate-fade-up">
            Enter a world<br />where <span className="italic shimmer-text">curiosity</span><br />has a pulse.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-500 animate-fade-up [animation-delay:180ms] opacity-0 sm:text-lg">
            Atelier is a living gallery for people who teach what they love and learn what changes them. Every exchange opens a new door.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 animate-fade-up [animation-delay:360ms] opacity-0 sm:flex-row sm:items-center">
            <Button onClick={onEnter} size="lg" magnetic>Step inside <ArrowRight className="h-4 w-4" /></Button>
            <button onClick={exploreCollection} className="group inline-flex items-center gap-2 px-2 py-3 text-sm text-ink-500 transition-colors hover:text-ink-900">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-canvas-300 transition-transform group-hover:rotate-45"><ArrowRight className="h-3.5 w-3.5" /></span>
              Explore the collection
            </button>
          </div>
          <div className="mt-12 flex items-center gap-4 border-t border-ink-900/10 pt-5 animate-fade-up [animation-delay:520ms] opacity-0">
            <div className="flex -space-x-2">{['CV', 'MC', 'LM', 'YT'].map((initial, index) => <span key={initial} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-canvas-50 text-[9px] font-semibold text-white ${['bg-saffron-400', 'bg-plum-400', 'bg-terracotta-400', 'bg-sage-500'][index]}`}>{initial}</span>)}</div>
            <p className="text-xs leading-relaxed text-ink-500"><span className="font-medium text-ink-800">2,800+ makers</span><br />already in the gallery</p>
          </div>
        </div>

        <div className="relative mx-auto h-[25rem] w-full max-w-[33rem] sm:h-[31rem] lg:h-[35rem]">
          <div className="portal-ring portal-ring-one absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-saffron-400/60 sm:h-[23rem] sm:w-[23rem]" />
          <div className="portal-ring portal-ring-two absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-plum-300/60 sm:h-[18rem] sm:w-[18rem]" />
          <div className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron-200/45 blur-3xl" />
          <div className="portal-window absolute left-1/2 top-1/2 h-[15.5rem] w-[12.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.4rem] border border-ink-900/15 bg-ink-900 p-3 shadow-2xl shadow-ink-900/25 sm:h-[20rem] sm:w-[16rem]">
            <div className="relative h-full overflow-hidden rounded-[1.65rem] border border-canvas-50/10 bg-[radial-gradient(circle_at_30%_20%,rgba(245,168,39,0.42),transparent_31%),radial-gradient(circle_at_75%_70%,rgba(158,82,122,0.46),transparent_33%),#171612]">
              <div className="portal-star absolute left-[18%] top-[20%] h-2 w-2 rounded-full bg-saffron-300" />
              <div className="portal-star absolute right-[22%] top-[32%] h-1.5 w-1.5 rounded-full bg-canvas-50" style={{ animationDelay: '1.4s' }} />
              <div className="portal-star absolute bottom-[28%] left-[34%] h-1.5 w-1.5 rounded-full bg-sage-300" style={{ animationDelay: '2.7s' }} />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 210" fill="none" aria-hidden="true"><path className="portal-line" d="M15 165C45 136 39 89 76 79C107 71 112 41 143 21" stroke="#F9C457" strokeWidth="1.4" /><path className="portal-line" d="M23 185C51 154 81 166 105 133C124 108 124 86 151 67" stroke="#E6CDD9" strokeWidth="1" style={{ animationDelay: '1.2s' }} /></svg>
              <div className="absolute bottom-5 left-5 right-5"><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-saffron-300">Open studio</p><p className="mt-1 font-display text-xl italic text-canvas-50">Make the invisible visible.</p></div>
            </div>
          </div>
          {orbitingSkills.map((skill) => <div key={skill.label} className={`skill-satellite absolute ${skill.position}`} style={{ animationDelay: skill.delay }}><div className="rounded-2xl border border-canvas-300/80 bg-canvas-50/90 px-3 py-2.5 shadow-xl shadow-ink-900/10 backdrop-blur-sm"><div className="flex items-center gap-2.5"><span className={`h-7 w-7 rounded-full ${skill.color === 'saffron' ? 'bg-saffron-200' : skill.color === 'plum' ? 'bg-plum-200' : 'bg-sage-200'}`} /><span><span className="block text-xs font-medium text-ink-800">{skill.label}</span><span className="block text-[10px] text-ink-400">{skill.note}</span></span></div></div></div>)}
          <div className="absolute bottom-0 right-[10%] hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400 sm:flex"><Crown className="h-3.5 w-3.5 text-saffron-500" />A collection in motion</div>
        </div>
      </div>
    </section>
  );
}
