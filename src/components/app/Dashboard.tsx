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
        .select('*, profiles!skills_user_id_fkey(id, full_name, avatar_color, location)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('exchanges')
        .select(`
          *,
          skills!exchanges_skill_id_fkey(title, category),
          requester:profiles!exchanges_requester_id_fkey(id, full_name, avatar_color),
          recipient:profiles!exchanges_recipient_id_fkey(id, full_name, avatar_color)
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Reveal className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {profile && (
              <Avatar
                name={profile.full_name}
                colorKey={profile.avatar_color}
                size="xl"
              />
            )}
            <div>
              <p className="text-sm text-ink-400 mb-1">Welcome back,</p>
              <h1 className="font-display text-3xl md:text-4xl font-light text-ink-900">
                {profile?.full_name}
              </h1>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} magnetic>
            <Plus className="h-4 w-4" />
            Add a skill
          </Button>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Sparkles, label: 'Teaching', value: teaching.length, color: 'text-sage-600', bg: 'bg-sage-50' },
          { icon: Search, label: 'Seeking', value: learning.length, color: 'text-plum-600', bg: 'bg-plum-50' },
          { icon: ArrowLeftRight, label: 'Exchanges', value: exchanges.length, color: 'text-saffron-600', bg: 'bg-saffron-50' },
          { icon: Clock, label: 'Pending', value: pendingCount, color: 'text-terracotta-600', bg: 'bg-terracotta-50' },
        ].map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="rounded-2xl border border-canvas-200 bg-canvas-50 p-5">
              <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="font-display text-3xl font-light text-ink-900">{stat.value}</p>
              <p className="text-xs text-ink-400 mt-1">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium text-ink-900">Your skills</h2>
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
          <div className="rounded-2xl border border-dashed border-canvas-300 bg-canvas-50/50 p-12 text-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mySkills.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 60}>
              <SkillCard skill={skill} showAction={false} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium text-ink-900">Recent exchanges</h2>
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
          <div className="rounded-2xl border border-dashed border-canvas-300 bg-canvas-50/50 p-10 text-center">
            <Inbox className="h-8 w-8 text-ink-400 mx-auto mb-3" />
            <p className="text-sm text-ink-400">
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
        <div className="space-y-3">
          {exchanges.map((ex, i) => {
            const isIncoming = ex.recipient?.id === user?.id;
            const other = isIncoming ? ex.requester : ex.recipient;
            return (
              <Reveal key={ex.id} delay={i * 50}>
                <button
                  onClick={() => onNavigate('exchanges')}
                  className="w-full flex items-center gap-4 rounded-2xl border border-canvas-200 bg-canvas-50 p-4 text-left transition-all hover:border-ink-300 hover:shadow-md"
                >
                  {other && (
                    <Avatar name={other.full_name} colorKey={other.avatar_color} size="md" />
                  )}
                  <div className="flex-1 min-w-0">
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


