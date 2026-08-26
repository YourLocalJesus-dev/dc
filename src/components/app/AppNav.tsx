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
      <nav className="sticky top-0 z-50 glass border-b border-canvas-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('dashboard')}>
            <Logo />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  view === item.key
                    ? 'text-ink-900'
                    : 'text-ink-500 hover:text-ink-800'
                }`}
              >
                {view === item.key && (
                  <span className="absolute inset-0 rounded-full bg-canvas-100" />
                )}
                <item.icon className="relative h-4 w-4" />
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {profile && (
              <button
                onClick={() => onNavigate('profile')}
                className="hidden md:flex items-center gap-2.5 group"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-ink-800 leading-tight">
                    {profile.full_name}
                  </p>
                  <p className="text-xs text-ink-400">View profile</p>
                </div>
                <Avatar name={profile.full_name} colorKey={profile.avatar_color} size="md" />
              </button>
            )}
            <button
              onClick={signOut}
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-terracotta-50 hover:text-terracotta-600 transition-all"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-full text-ink-700 hover:bg-canvas-100"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 glass border-t border-canvas-200 animate-fade-in p-6">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  view === item.key
                    ? 'bg-canvas-100 text-ink-900'
                    : 'text-ink-500 hover:bg-canvas-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
            <div className="h-px bg-canvas-200 my-2" />
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
