import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/Spinner';
import { Avatar } from '@/components/ui/Avatar';
import { StudioHeader } from '@/components/app/StudioHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Clock, CheckCircle2, XCircle, Check, ArrowRight, Inbox, Star } from 'lucide-react';
import type { ExchangeWithDetails, Review } from '@/types';

type Tab = 'all' | 'incoming' | 'outgoing';

export function Exchanges() {
  const { user } = useAuth();
  const [exchanges, setExchanges] = useState<ExchangeWithDetails[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('all');

  async function load() {
    if (!user) return;
    const { data } = await supabase
      .from('exchanges')
      .select(`
        *,
        skills!exchanges_skill_id_fkey(title, category),
        requester:profiles!exchanges_requester_id_fkey(id, full_name, avatar_color, avatar_url),
        recipient:profiles!exchanges_recipient_id_fkey(id, full_name, avatar_color, avatar_url)
      `)
      .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order('created_at', { ascending: false });
    const list = (data as ExchangeWithDetails[]) ?? [];
    setExchanges(list);

    const completed = list.filter((e) => e.status === 'completed');
    if (completed.length > 0) {
      const ids = completed.map((e) => e.id);
      const { data: revData } = await supabase
        .from('reviews')
        .select('*')
        .in('exchange_id', ids);
      const map: Record<string, Review[]> = {};
      (revData as Review[])?.forEach((r) => {
        (map[r.exchange_id] ??= []).push(r);
      });
      setReviews(map);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  async function updateStatus(id: string, status: 'accepted' | 'declined' | 'completed') {
    await supabase
      .from('exchanges')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    load();
  }

  const filtered = exchanges.filter((e) => {
    if (tab === 'incoming') return e.recipient_id === user?.id;
    if (tab === 'outgoing') return e.requester_id === user?.id;
    return true;
  });

  if (loading) return <Spinner>Loading exchanges…</Spinner>;

  return (
    <div className="studio-page max-w-5xl">
      <StudioHeader index="03" eyebrow="The correspondence room" title={<>Every exchange begins with <span className="italic">an invitation.</span></>} description="Keep a clear view of every proposal, conversation, and shared learning moment." />

      <div className="mb-8 flex w-fit rounded-full border border-canvas-200 bg-canvas-100 p-1.5">
        {(['all', 'incoming', 'outgoing'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
              tab === t
                ? 'bg-ink-900 text-canvas-50'
                : 'bg-canvas-100 text-ink-500 hover:bg-canvas-200'
            }`}
          >
            {t === 'all' ? 'All' : t === 'incoming' ? 'Incoming' : 'Outgoing'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="studio-surface text-center py-16 border-dashed">
          <Inbox className="h-8 w-8 text-ink-400 mx-auto mb-3" />
          <p className="text-sm text-ink-400">
            {tab === 'incoming'
              ? 'No incoming exchange requests.'
              : tab === 'outgoing'
              ? "You haven't proposed any exchanges yet."
              : 'No exchanges yet.'}
          </p>
        </div>
      ) : (
        <div className="relative space-y-4 before:absolute before:bottom-6 before:left-[2.45rem] before:top-6 before:w-px before:bg-canvas-200">
          {filtered.map((ex, i) => {
            const isIncoming = ex.recipient_id === user?.id;
            const other = isIncoming ? ex.requester : ex.recipient;
            const exReviews = reviews[ex.id] ?? [];
            const myReview = exReviews.find((r) => r.reviewer_id === user?.id);

            return (
              <Reveal key={ex.id} delay={i * 40}>
                <div className="relative rounded-[1.65rem] border border-canvas-200 bg-canvas-50 p-5 shadow-[0_12px_32px_rgba(34,28,19,0.035)] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    {other && (
                      <Avatar name={other.full_name} colorKey={other.avatar_color} src={other.avatar_url} size="lg" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <p className="font-medium text-ink-900">
                          {other?.full_name}
                        </p>
                        <span className="text-ink-300">·</span>
                        <span className="text-xs text-ink-400">
                          {isIncoming ? 'wants to learn from you' : 'you requested'}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-ink-600">
                        {ex.skills?.title} · <span className="text-ink-400">{ex.skills?.category}</span>
                      </p>
                      {ex.message && (
                        <p className="text-sm text-ink-500 bg-canvas-100/60 rounded-xl px-4 py-2.5 italic">
                          "{ex.message}"
                        </p>
                      )}

                      <div className="mt-4">
                        <StatusBadge status={ex.status} />
                      </div>

                      {ex.status === 'completed' && exReviews.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {exReviews.map((r) => (
                            <div
                              key={r.id}
                              className="flex items-center gap-1.5 rounded-full bg-saffron-50 px-3 py-1"
                            >
                              {Array.from({ length: r.rating }).map((_, idx) => (
                                <Star key={idx} className="h-3 w-3 fill-saffron-400 text-saffron-400" />
                              ))}
                              <span className="text-xs text-ink-500 ml-1">
                                {r.reviewer_id === user?.id ? 'Your review' : 'Reviewed'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {isIncoming && ex.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => updateStatus(ex.id, 'accepted')}
                            className="inline-flex items-center gap-1.5 rounded-full bg-sage-500 px-4 py-2 text-xs font-medium text-sage-50 hover:bg-sage-600 transition-colors"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(ex.id, 'declined')}
                            className="inline-flex items-center gap-1.5 rounded-full border border-canvas-300 px-4 py-2 text-xs font-medium text-ink-500 hover:bg-terracotta-50 hover:text-terracotta-600 hover:border-terracotta-200 transition-all"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Decline
                          </button>
                        </div>
                      )}

                      {ex.status === 'accepted' && (
                        <button
                          onClick={() => updateStatus(ex.id, 'completed')}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-canvas-50 hover:bg-sage-500 transition-colors"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Mark as completed
                        </button>
                      )}

                      {ex.status === 'completed' && !myReview && (
                        <ReviewForm exchangeId={ex.id} onSubmitted={load} />
                      )}

                      {!isIncoming && ex.status === 'pending' && (
                        <p className="mt-3 text-xs text-ink-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Awaiting response
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string; icon: typeof Clock }> = {
    pending: { label: 'Pending', cls: 'bg-saffron-50 text-saffron-700', icon: Clock },
    accepted: { label: 'Accepted', cls: 'bg-sage-50 text-sage-700', icon: CheckCircle2 },
    declined: { label: 'Declined', cls: 'bg-terracotta-50 text-terracotta-600', icon: XCircle },
    completed: { label: 'Completed', cls: 'bg-ink-100 text-ink-600', icon: CheckCircle2 },
  };
  const c = config[status] ?? config.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${c.cls}`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}

type ReviewFormProps = {
  exchangeId: string;
  onSubmitted: () => void;
};

function ReviewForm({ exchangeId, onSubmitted }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    setBusy(true);
    await supabase.from('reviews').insert({
      exchange_id: exchangeId,
      reviewer_id: user!.id,
      rating,
      comment: comment.trim(),
    });
    setBusy(false);
    setDone(true);
    setTimeout(onSubmitted, 800);
  }

  if (done) {
    return (
      <p className="mt-3 text-xs text-sage-600 flex items-center gap-1">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Review submitted. Thank you!
      </p>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-canvas-200 bg-canvas-50 p-4">
      <p className="text-xs font-medium text-ink-600 mb-2">Leave a review</p>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={`h-5 w-5 transition-colors ${
                n <= rating ? 'fill-saffron-400 text-saffron-400' : 'text-canvas-300'
              }`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        placeholder="Share your experience…"
        className="w-full rounded-lg border border-canvas-200 bg-canvas-50/50 px-3 py-2 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-ink-400 resize-none mb-3"
      />
      <button
        onClick={submit}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-canvas-50 hover:bg-saffron-400 hover:text-ink-900 transition-all disabled:opacity-50"
      >
        {busy ? 'Submitting…' : (
          <>
            <ArrowRight className="h-3.5 w-3.5" />
            Submit review
          </>
        )}
      </button>
    </div>
  );
}
