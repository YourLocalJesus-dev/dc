import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Compass, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Props = {
  onEnter: () => void;
};

export function Hero({ onEnter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMouse({ x, y });
    }
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const parallax = (depth: number) => ({
    transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)`,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain pt-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[8%] h-72 w-72 rounded-full bg-saffron-200/50 blur-3xl animate-pulse-soft"
          style={parallax(30)}
        />
        <div
          className="absolute bottom-[15%] right-[10%] h-80 w-80 rounded-full bg-terracotta-200/40 blur-3xl animate-pulse-soft"
          style={{ ...parallax(-20), animationDelay: '1s' }}
        />
        <div
          className="absolute top-[40%] right-[30%] h-64 w-64 rounded-full bg-sage-200/40 blur-3xl animate-pulse-soft"
          style={{ ...parallax(15), animationDelay: '2s' }}
        />
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-canvas-300 bg-canvas-50/60 px-4 py-2 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
          </span>
          <span className="text-sm text-ink-600 font-medium tracking-wide">
            A living gallery of human knowledge
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight text-ink-900 text-balance mb-6 animate-fade-up">
          Exchange skills
          <br />
          <span className="italic font-normal shimmer-text">like works of art.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-ink-500 leading-relaxed font-light mb-10 animate-fade-up [animation-delay:200ms] opacity-0">
          Atelier is a curated space where people share what they know and discover what
          they want to learn. Every skill is a craft. Every exchange, a collaboration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
          <Button onClick={onEnter} size="lg" magnetic>
            Enter the gallery
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button onClick={onEnter} size="lg" variant="outline">
            Explore skills
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0">
          {[
            { icon: Sparkles, label: 'Share your craft', desc: 'List skills you can teach' },
            { icon: Compass, label: 'Discover passions', desc: 'Find skills you want to learn' },
            { icon: Handshake, label: 'Exchange freely', desc: 'Connect and grow together' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="h-11 w-11 rounded-full bg-canvas-100 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-ink-600" />
              </div>
              <p className="text-sm font-medium text-ink-800">{item.label}</p>
              <p className="text-xs text-ink-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float-slow">
        <div className="h-9 w-5 rounded-full border-2 border-ink-300 flex justify-center pt-1.5">
          <div className="h-1.5 w-1 rounded-full bg-ink-400 animate-float" />
        </div>
      </div>
    </section>
  );
}
