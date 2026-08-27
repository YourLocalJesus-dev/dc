import { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { LogOut, LayoutDashboard, Compass, ArrowLeftRight, User, Menu, X } from 'lucide-react';

export type AppView = 'dashboard' | 'discover' | 'exchanges' | 'profile';

type Props = {
  view: AppView;
  onNavigate: (v: AppView) => void;
};

const items: { key: AppView; label: string; icon: typeof Compass }[] = [
  { key: 'dashboard', label: 'Studio', icon: LayoutDashboard },
  { key: 'discover', label: 'Discover', icon: Compass },
  { key: 'exchanges', label: 'Exchanges', icon: ArrowLeftRight },
  { key: 'profile', label: 'Profile', icon: User },
];

export function AppNav({ view, onNavigate }: Props) {
  const { profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-canvas-200/80 bg-canvas-50/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-5 sm:px-6">
          <button onClick={() => onNavigate('dashboard')} className="shrink-0">
            <Logo />
          </button>

          <div className="hidden items-center rounded-full border border-canvas-200 bg-canvas-100/60 p-1 md:flex">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                  view === item.key
                    ? 'bg-canvas-50 text-ink-900 shadow-sm'
                    : 'text-ink-500 hover:text-ink-800'
                }`}
              >
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {profile && (
              <button
                onClick={() => onNavigate('profile')}
                className="hidden items-center gap-2.5 rounded-full border border-transparent py-1 pl-1 pr-2.5 transition-colors hover:border-canvas-200 hover:bg-canvas-100 md:flex"
              >
                <div className="text-right">
                  <p className="text-xs font-medium leading-tight text-ink-800">
                    {profile.full_name}
                  </p>
                  <p className="text-[10px] text-ink-400">Your profile</p>
                </div>
                <Avatar name={profile.full_name} colorKey={profile.avatar_color} src={profile.avatar_url} size="sm" />
              </button>
            )}
            <button
              onClick={signOut}
              className="hidden h-9 w-9 items-center justify-center rounded-full text-ink-400 transition-all hover:bg-terracotta-50 hover:text-terracotta-600 md:inline-flex"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas-200 text-ink-700 hover:bg-canvas-100 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 top-[4.75rem] z-40 border-t border-canvas-200 bg-canvas-50/95 p-5 backdrop-blur-xl animate-fade-in md:hidden">
          <div className="mx-auto flex max-w-sm flex-col gap-2">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">Studio navigation</p>
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors ${
                  view === item.key
                    ? 'bg-canvas-100 text-ink-900'
                    : 'text-ink-500 hover:bg-canvas-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
            <div className="my-2 h-px bg-canvas-200" />
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-terracotta-600 hover:bg-terracotta-50"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
