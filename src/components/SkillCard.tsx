import { ArrowUpRight, Sparkles, Search } from 'lucide-react';
import type { SkillWithProfile } from '@/types';
import { Avatar } from '@/components/ui/Avatar';

type Props = {
  skill: SkillWithProfile;
  onAction?: () => void;
  actionLabel?: string;
  showAction?: boolean;
};

export function SkillCard({ skill, onAction, actionLabel = 'Propose exchange', showAction = true }: Props) {
  const profile = skill.profiles;
  const isTeach = skill.type === 'teach';

  return (
    <article className="group relative h-full">
      <div className="relative h-full rounded-2xl border border-canvas-200 bg-canvas-50/80 p-6 transition-all duration-500 hover:border-ink-300 hover:shadow-xl hover:shadow-ink-900/5 hover:-translate-y-1 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-saffron-200/0 to-terracotta-200/0 group-hover:from-saffron-200/40 group-hover:to-terracotta-200/30 transition-all duration-700 blur-2xl" />

        <div className="relative flex items-start justify-between gap-3 mb-5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              isTeach
                ? 'bg-sage-100 text-sage-700'
                : 'bg-plum-100 text-plum-700'
            }`}
          >
            {isTeach ? <Sparkles className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            {isTeach ? 'Teaching' : 'Seeking'}
          </span>
          <span className="text-xs font-medium text-ink-400 px-2.5 py-1 rounded-full bg-canvas-100">
            {skill.category}
          </span>
        </div>

        <h3 className="relative font-display text-xl font-semibold text-ink-900 mb-2 leading-snug">
          {skill.title}
        </h3>

        <p className="relative text-sm text-ink-500 leading-relaxed mb-6 line-clamp-3">
          {skill.description || 'No description provided.'}
        </p>

        <div className="relative flex items-center justify-between gap-3 mt-auto">
          {profile && (
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={profile.full_name} colorKey={profile.avatar_color} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink-800 truncate">
                  {profile.full_name}
                </p>
                {profile.location && (
                  <p className="text-xs text-ink-400 truncate">{profile.location}</p>
                )}
              </div>
            </div>
          )}

          {showAction && onAction && (
            <button
              onClick={onAction}
              className="shrink-0 inline-flex items-center gap-1 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-canvas-50 transition-all duration-300 hover:bg-saffron-400 hover:text-ink-900 group/btn"
            >
              {actionLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
