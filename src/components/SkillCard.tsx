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
      <div className="relative h-full overflow-hidden rounded-[1.65rem] border border-canvas-200 bg-canvas-50 p-6 shadow-[0_12px_32px_rgba(34,28,19,0.045)] transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-300 hover:shadow-xl hover:shadow-ink-900/10">
        <div className={`absolute left-0 top-0 h-full w-1 ${isTeach ? 'bg-sage-400' : 'bg-plum-400'}`} />
        <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full border border-ink-900/[0.07] transition-transform duration-700 group-hover:scale-125" />

        <div className="relative mb-8 flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
              isTeach
                ? 'bg-sage-100 text-sage-700'
                : 'bg-plum-100 text-plum-700'
            }`}
          >
            {isTeach ? <Sparkles className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            {isTeach ? 'Teaching' : 'Seeking'}
          </span>
          <span className="rounded-full border border-canvas-200 px-2.5 py-1 text-[10px] font-medium text-ink-400">
            {skill.category}
          </span>
        </div>

        <h3 className="relative mb-2 font-display text-2xl font-medium leading-snug text-ink-900">
          {skill.title}
        </h3>

        <p className="relative mb-7 text-sm leading-relaxed text-ink-500 line-clamp-3">
          {skill.description || 'No description provided.'}
        </p>

        <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-ink-900/10 pt-4">
          {profile && (
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={profile.full_name} colorKey={profile.avatar_color} src={profile.avatar_url} size="sm" />
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
