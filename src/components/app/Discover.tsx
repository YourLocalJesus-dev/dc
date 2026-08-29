import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { SkillCard } from '@/components/SkillCard';
import { Spinner } from '@/components/ui/Spinner';
import { Modal } from '@/components/ui/Modal';
import { StudioHeader } from '@/components/app/StudioHeader';
import { CATEGORIES } from '@/lib/constants';
import { Search, SlidersHorizontal, Sparkles, Send } from 'lucide-react';
import type { SkillWithProfile } from '@/types';

export function Discover() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<SkillWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<'all' | 'teach' | 'learn'>('all');
  const [selected, setSelected] = useState<SkillWithProfile | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('skills')
        .select('*, profiles!skills_user_id_fkey(id, full_name, avatar_color, avatar_url, location)')
        .neq('user_id', user?.id ?? '')
        .order('created_at', { ascending: false });
      setSkills((data as SkillWithProfile[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (category !== 'All' && s.category !== category) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [skills, query, category, typeFilter]);

  return (
    <div className="studio-page">
      <StudioHeader index="02" eyebrow="The living collection" title={<>Discover <span className="italic">a new craft.</span></>} description="Browse what people are teaching and seeking. A thoughtful exchange is only one invitation away." />

      <div className="studio-surface mb-5 p-3 sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 group-focus-within:text-ink-700 transition-colors" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, descriptions, categories…"
            className="w-full rounded-2xl border border-canvas-200 bg-canvas-50 pl-11 pr-4 py-3.5 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:outline-none focus:border-ink-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-ink-400 shrink-0" />
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {(['all', 'teach', 'learn'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  typeFilter === t
                    ? 'bg-ink-900 text-canvas-50 shadow-md shadow-ink-900/10'
                    : 'bg-canvas-100 text-ink-500 hover:bg-canvas-200'
                }`}
              >
                {t === 'all' ? 'All' : t === 'teach' ? 'Teaching' : 'Seeking'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              category === cat
                ? 'bg-saffron-400 text-ink-900 shadow-sm'
                : 'border border-canvas-200 bg-canvas-50 text-ink-500 hover:border-ink-300 hover:text-ink-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      </div>

      {!loading && <div className="mb-7 flex items-center justify-between"><p className="text-xs text-ink-400"><span className="font-medium text-ink-700">{filtered.length}</span> pieces in this view</p><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">Curated daily</span></div>}

      {loading ? (
        <Spinner>Curating the collection…</Spinner>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-canvas-300 bg-canvas-50/50">
          <Sparkles className="h-8 w-8 text-ink-400 mx-auto mb-3" />
          <p className="font-display text-lg text-ink-600 italic mb-1">
            No skills match your search.
          </p>
          <p className="text-sm text-ink-400">Try a different category or keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill, i) => (
            <div
              key={skill.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
            >
              <SkillCard
                skill={skill}
                onAction={() => setSelected(skill)}
              />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <ExchangeModal
          skill={selected}
          onClose={() => setSelected(null)}
          onSent={() => setSelected(null)}
        />
      )}
    </div>
  );
}

type ModalProps = {
  skill: SkillWithProfile;
  onClose: () => void;
  onSent: () => void;
};

function ExchangeModal({ skill, onClose, onSent }: ModalProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function send() {
    setBusy(true);
    setError(null);
    const { error: insertError } = await supabase.from('exchanges').insert({
      requester_id: user!.id,
      recipient_id: skill.user_id,
      skill_id: skill.id,
      message: message.trim(),
      status: 'pending',
    });
    setBusy(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSent(true);
    setTimeout(onSent, 1500);
  }

  return (
    <Modal open onClose={onClose} title="Propose an exchange">
      {sent ? (
        <div className="text-center py-8 animate-scale-in">
          <div className="h-16 w-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
            <Send className="h-7 w-7 text-sage-600" />
          </div>
          <p className="font-display text-2xl font-light text-ink-900 mb-2">Exchange proposed!</p>
          <p className="text-sm text-ink-500">
            {skill.profiles?.full_name} will be notified of your request.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-2xl bg-canvas-100/60 p-4">
            <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">
              You're requesting
            </p>
            <p className="font-display text-lg font-medium text-ink-900">{skill.title}</p>
            <p className="text-sm text-ink-500 mt-1">
              from {skill.profiles?.full_name}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5 tracking-wide uppercase">
              Your message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Introduce yourself, what you'd like to learn, and what you could offer in return…"
              className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:outline-none focus:border-ink-400 focus:bg-canvas-50 resize-none"
            />
          </div>

          {error && <p className="text-sm text-terracotta-600">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-canvas-300 px-6 py-3 text-sm font-medium text-ink-600 hover:bg-canvas-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={send}
              disabled={busy}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-canvas-50 hover:bg-saffron-400 hover:text-ink-900 transition-all disabled:opacity-50"
            >
              {busy ? 'Sending…' : (
                <>
                  <Send className="h-4 w-4" />
                  Send proposal
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
