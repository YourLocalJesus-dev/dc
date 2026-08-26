import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Spinner } from '@/components/ui/Spinner';

type Mode = 'signin' | 'signup';

type Props = {
  mode: Mode;
  onToggle: () => void;
  onBack: () => void;
};

export function AuthScreen({ mode, onToggle, onBack }: Props) {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your name.');
        setBusy(false);
        return;
      }
      const { error } = await signUp(email, password, fullName.trim());
      if (error) setError(error);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    }
    setBusy(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden grain">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] h-64 w-64 rounded-full bg-saffron-200/40 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[20%] right-[12%] h-72 w-72 rounded-full bg-terracotta-200/30 blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to gallery
        </button>

        <div className="glass rounded-3xl border border-canvas-200 shadow-2xl shadow-ink-900/10 p-8 animate-scale-in">
          <div className="mb-8">
            <Logo />
          </div>

          <h1 className="font-display text-3xl font-light text-ink-900 mb-2">
            {mode === 'signin' ? 'Welcome back.' : 'Join the studio.'}
          </h1>
          <p className="text-sm text-ink-500 mb-8">
            {mode === 'signin'
              ? 'Sign in to continue your craft.'
              : 'Create an account to start exchanging skills.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Field
                icon={User}
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={setFullName}
                autoComplete="name"
              />
            )}
            <Field
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              required
            />
            <Field
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              minLength={6}
            />

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-terracotta-50 border border-terracotta-200 px-4 py-3 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-terracotta-500 mt-0.5 shrink-0" />
                <p className="text-sm text-terracotta-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-canvas-50 transition-all duration-300 hover:bg-saffron-400 hover:text-ink-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? (
                <Spinner className="py-0" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-canvas-200 text-center">
            <p className="text-sm text-ink-500">
              {mode === 'signin' ? "Don't have an account? " : 'Already a member? '}
              <button
                onClick={onToggle}
                className="font-medium text-ink-900 ink-underline"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
};

function Field({ icon: Icon, type, placeholder, value, onChange, autoComplete, required, minLength }: FieldProps) {
  return (
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 transition-colors group-focus-within:text-ink-700" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 pl-11 pr-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition-all duration-300 focus:outline-none focus:border-ink-400 focus:bg-canvas-50 focus:ring-4 focus:ring-ink-900/5"
      />
    </div>
  );
}
