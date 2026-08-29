import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/ui/Reveal';
import { Spinner } from '@/components/ui/Spinner';
import { SkillCard } from '@/components/SkillCard';
import { SkillForm } from '@/components/app/SkillForm';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Plus, Sparkles, Search, ArrowLeftRight, Clock, CheckCircle2, Inbox, X } from 'lucide-react';
import type { SkillWithProfile, ExchangeWithDetails } from '@/types';
import type { AppView } from '@/components/app/AppNav';

type Props = {
  onNavigate: (v: AppView) => void;
};

export function Dashboard({ onNavigate }: Props) {
  const { profile, user } = useAuth();
  const [mySkills, setMySkills] = useState<SkillWithProfile[]>([]);
  const [exchanges, setExchanges] = useState<ExchangeWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    if (!user) return;
    const [skillsRes, exchangesRes] = await Promise.all([
      supabase
        .from('skills')
        .select('*, profiles!skills_user_id_fkey(id, full_name, avatar_color, avatar_url, location)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('exchanges')
        .select(`
          *,
          skills!exchanges_skill_id_fkey(title, category),
          requester:profiles!exchanges_requester_id_fkey(id, full_name, avatar_color, avatar_url),
          recipient:profiles!exchanges_recipient_id_fkey(id, full_name, avatar_color, avatar_url)
        `)
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(5),
    ]);
    setMySkills((skillsRes.data as SkillWithProfile[]) ?? []);
    setExchanges((exchangesRes.data as ExchangeWithDetails[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  if (loading) return <Spinner>Loading your studio…</Spinner>;

  const teaching = mySkills.filter((s) => s.type === 'teach');
  const learning = mySkills.filter((s) => s.type === 'learn');
  const pendingCount = exchanges.filter((e) => e.status === 'pending').length;
  const studioStats = [
    { icon: Sparkles, label: 'Teaching', value: teaching.length, color: 'text-sage-600', bg: 'bg-sage-50', rule: 'bg-sage-400' },
    { icon: Search, label: 'Seeking', value: learning.length, color: 'text-plum-600', bg: 'bg-plum-50', rule: 'bg-plum-400' },
    { icon: ArrowLeftRight, label: 'Exchanges', value: exchanges.length, color: 'text-saffron-600', bg: 'bg-saffron-50', rule: 'bg-saffron-400' },
    { icon: Clock, label: 'Pending', value: pendingCount, color: 'text-terracotta-600', bg: 'bg-terracotta-50', rule: 'bg-terracotta-400' },
  ];

  return (
    <div className="studio-page">
      <div className="pointer-events-none absolute left-1/2 top-36 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-saffron-100/20 blur-3xl" />
      <Reveal className="mb-12">
        <div className="grid overflow-hidden rounded-[2rem] border border-canvas-200 shadow-[0_22px_60px_rgba(34,28,19,0.10)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[19rem] overflow-hidden bg-ink-900 p-7 text-canvas-50 sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-saffron-300/40" />
            <div className="pointer-events-none absolute bottom-[-7rem] right-12 h-56 w-56 rounded-full border border-canvas-50/15" />
            <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
            {profile && (
              <Avatar
                name={profile.full_name}
                colorKey={profile.avatar_color}
                src={profile.avatar_url}
                size="lg"
              />
            )}
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-saffron-300">Your studio / open today</p>
              <h1 className="font-display text-3xl font-light text-canvas-50 sm:text-4xl">
                {profile?.full_name}
              </h1>
            </div>
            </div>
            <span className="font-display text-xl italic text-canvas-300">Atelier</span>
            </div>
            <div>
              <p className="max-w-sm font-display text-3xl font-light leading-tight text-canvas-50 sm:text-4xl">Your next exchange is already <span className="italic text-saffron-300">taking shape.</span></p>
              <div className="mt-6 flex items-center gap-4"><Button onClick={() => setShowForm(true)} variant="secondary" magnetic><Plus className="h-4 w-4" />Add a skill</Button><span className="text-xs text-canvas-300">Share something only you know.</span></div>
            </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-canvas-50 p-3 sm:p-4">
            {studioStats.map((stat, i) => (
              <div key={stat.label} className={`group relative flex min-h-[9rem] flex-col justify-between overflow-hidden rounded-[1.4rem] p-4 transition-colors hover:bg-canvas-100 ${i === 0 ? 'bg-sage-50/50' : i === 1 ? 'bg-plum-50/40' : i === 2 ? 'bg-saffron-50/40' : 'bg-terracotta-50/40'}`}>
                <span className={`absolute left-0 top-0 h-1 w-full ${stat.rule}`} />
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg}`}><stat.icon className={`h-4 w-4 ${stat.color}`} /></div>
                <div><p className="font-display text-4xl font-light text-ink-900">{stat.value}</p><p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-400">{stat.label}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mb-6">
        <div className="studio-section-head">
          <div><p className="studio-section-label">Your practice</p><h2 className="font-display text-2xl font-medium text-ink-900">Your skills</h2></div>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-ink-500 hover:text-ink-900 ink-underline"
          >
            Add another
          </button>
        </div>
      </Reveal>

      {mySkills.length === 0 ? (
        <Reveal>
          <div className="rounded-[1.8rem] border border-dashed border-canvas-300 bg-canvas-50/50 p-12 text-center">
            <div className="h-14 w-14 rounded-full bg-canvas-100 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-6 w-6 text-ink-400" />
            </div>
            <p className="font-display text-xl text-ink-700 italic mb-2">
              Your studio is empty.
            </p>
            <p className="text-sm text-ink-400 mb-6">
              Add your first skill to start exchanging.
            </p>
            <Button onClick={() => setShowForm(true)} variant="outline">
              <Plus className="h-4 w-4" />
              Add a skill
            </Button>
          </div>
        </Reveal>
      ) : (
        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mySkills.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 60}>
              <SkillCard skill={skill} showAction={false} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mb-6">
        <div className="studio-section-head">
          <div><p className="studio-section-label">Your correspondence</p><h2 className="font-display text-2xl font-medium text-ink-900">Recent exchanges</h2></div>
          {exchanges.length > 0 && (
            <button
              onClick={() => onNavigate('exchanges')}
              className="text-sm text-ink-500 hover:text-ink-900 ink-underline"
            >
              View all
            </button>
          )}
        </div>
      </Reveal>

      {exchanges.length === 0 ? (
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.8rem] border border-dashed border-canvas-300 bg-canvas-50/60 p-10 text-center">
            <span className="absolute left-1/2 top-5 -translate-x-1/2 font-display text-7xl text-ink-900/[0.035]">✦</span>
            <Inbox className="relative mx-auto mb-3 h-8 w-8 text-ink-400" />
            <p className="relative text-sm text-ink-400">
              No exchanges yet.{' '}
              <button
                onClick={() => onNavigate('discover')}
                className="font-medium text-ink-700 ink-underline"
              >
                Discover skills
              </button>{' '}
              to propose your first one.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="overflow-hidden rounded-[1.6rem] border border-canvas-200 bg-canvas-50 shadow-[0_12px_32px_rgba(34,28,19,0.035)]">
          {exchanges.map((ex, i) => {
            const isIncoming = ex.recipient?.id === user?.id;
            const other = isIncoming ? ex.requester : ex.recipient;
            return (
              <Reveal key={ex.id} delay={i * 50}>
                <button
                  onClick={() => onNavigate('exchanges')}
                  className="group flex w-full items-center gap-4 border-b border-canvas-200 p-5 text-left transition-colors last:border-b-0 hover:bg-canvas-100/55"
                >
                  {other && (
                    <Avatar name={other.full_name} colorKey={other.avatar_color} src={other.avatar_url} size="md" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-800 truncate">
                      {other?.full_name}
                    </p>
                    <p className="text-xs text-ink-400 truncate">
                      {ex.skills?.title}
                    </p>
                  </div>
                  <StatusBadge status={ex.status} />
                  {isIncoming && (
                    <span className="text-xs font-medium text-saffron-600 bg-saffron-50 px-2 py-1 rounded-full">
                      Incoming
                    </span>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      )}

      <SkillForm open={showForm} onClose={() => setShowForm(false)} onSaved={load} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-saffron-50 text-saffron-700',
    accepted: 'bg-sage-50 text-sage-700',
    declined: 'bg-terracotta-50 text-terracotta-600',
    completed: 'bg-ink-100 text-ink-600',
  };
  const icons: Record<string, typeof Clock> = {
    pending: Clock,
    accepted: CheckCircle2,
    declined: X,
    completed: CheckCircle2,
  };
  const Icon = icons[status] ?? Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status] ?? ''}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
