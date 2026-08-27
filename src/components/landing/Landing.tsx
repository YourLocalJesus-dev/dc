import { LandingNav } from '@/components/landing/LandingNav';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedSkills } from '@/components/landing/FeaturedSkills';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

type Props = {
  onEnter: () => void;
};

export function Landing({ onEnter }: Props) {
  return (
    <div id="top" className="min-h-screen bg-canvas-50">
      <LandingNav onEnter={onEnter} />
      <Hero onEnter={onEnter} />
      <section id="features">
        <Features onEnter={onEnter} />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="gallery">
        <FeaturedSkills onEnter={onEnter} />
      </section>
      <CTA onEnter={onEnter} />
      <Footer />
    </div>
  );
}
