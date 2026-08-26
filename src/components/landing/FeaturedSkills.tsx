import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SkillCard } from '@/components/SkillCard';
import { Spinner } from '@/components/ui/Spinner';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { SkillWithProfile } from '@/types';

type Props = {
  onEnter: () => void;
};

export function FeaturedSkills({ onEnter }: Props) {
  const [skills, setSkills] = useState<SkillWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    (async () => {
      const { data } = await supabase
        .from('skills')
        .select('*, profiles!skills_user_id_fkey(id, full_name, avatar_color, location)')
        .eq('type', 'teach')
        .order('created_at', { ascending: false })
        .limit(6);
      setSkills((data as SkillWithProfile[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-widest uppercase text-saffron-600 mb-3">
              The gallery
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-900 leading-tight text-balance">
              Skills on display
              <span className="italic"> this season.</span>
            </h2>
          </div>
          <button
            onClick={onEnter}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-700 ink-underline self-start md:self-auto"
          >
            View the full collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

        {loading ? (
          <Spinner>Curating the collection…</Spinner>
        ) : skills.length === 0 ? (
          <Reveal>
            <div className="text-center py-16 rounded-2xl border border-dashed border-canvas-300 bg-canvas-50/50">
              <p className="text-ink-500 font-display text-xl italic mb-2">
                The gallery awaits its first exhibit.
              </p>
              <p className="text-sm text-ink-400">
                Be the first to share your craft.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <Reveal key={skill.id} delay={i * 80}>
                <SkillCard skill={skill} showAction={false} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
